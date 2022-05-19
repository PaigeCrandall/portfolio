import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            blog_status: "draft",
            content: "",
            featured_image: "",
            apiUrl: "https://paigecrandall.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaterdImgDrop = this.handleFeaterdImgDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.featuredImgRef = React.createRef();
    }

    deleteImage(imageType) {
        axios.delete(
            `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
            { withCredentials: true }
        ).then(response => {
            this.props.handleFeaturedImageDelete();
        }).catch(error => {
            console.log('deleteImage error', error);
        });
    }

    componentWillMount() {
        if (this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,
                content: this.props.blog.content,
                apiUrl: `https://paigecrandall.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
                apiAction: "patch"
            });
        }
    }

    handleFeaterdImgDrop() {
        return {
            addedfile: file => this.setState({featured_image: file })
        };
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        };
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        };
    }

    handleRichTextEditorChange(content) {
        this.setState({ content });
    }

    buildForm() {
       let formData = new FormData();
       formData.append("portfolio_blog[title]", this.state.title);
       formData.append("portfolio_blog[blog_status]", this.state.blog_status);
       formData.append("portfolio_blog[content]", this.state.content);

       if (this.state.featured_image) {
        formData.append("portfolio_blog[featured_image]", this.state.featured_image);
       }

       return formData;
    }
    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        axios({
                method: this.state.apiAction,
                url: this.state.apiUrl,
                data: this.buildForm(),
                withCredentials: true
            }).then(response => {
                if (this.state.featured_image) {
                    this.featuredImgRef.current.dropzone.removeAllFiles();
                }
                
                this.setState({
                    title: "",
                    blog_status: "draft",
                    content: "",
                    featured_image: ""
                });

                if (this.props.editMode) {
                    this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
                } else {
                    this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog);
                }

            }).catch(error => {
                console.log('blog_form handleSubmit error', error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <form className="blog-form-wrapper" onSubmit={this.handleSubmit}>
                <div className="two-columns">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="title"
                        placeholder="Title"
                        value={this.state.title}
                    />
                    <select
                            name="blog_status"
                            value={this.state.blog_status}
                            onChange={this.handleChange}
                            className="select-element"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                    </select>
                </div>

                <div className="one-columns">
                    <RichTextEditor
                        handleRichTextEditorChange={this.handleRichTextEditorChange}
                        editMode={this.props.editMode}
                        contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : ""}
                    />
                </div>

                <div className="img-uploaders">
                    {this.props.editMode && this.props.blog.featured_image_url
                    ? <div className="image-upload-wrapper">
                        <img src={this.props.blog.featured_image_url}/>
                        <div className="img-removal-link">
                            <a onClick={() => this.deleteImage("featured_image")}>
                                Remove File
                            </a>
                        </div>
                    </div>
                    : <DropzoneComponent
                        ref={this.featuredImgRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleFeaterdImgDrop()}
                    >
                        <div className="dz-message">Featured Image</div>
                    </DropzoneComponent>
                    }
                </div>

                <button className="btn" type="submit">Save</button>
            </form>
        );
    }
}