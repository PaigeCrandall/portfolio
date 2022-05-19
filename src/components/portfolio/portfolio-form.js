import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            category: "Ecommerce",
            description: "",
            url: "",
            position: "",
            thumb_image: "",
            banner_image: "",
            logo: "",

            editMode: false,
            apiUrl: "https://paigecrandall.devcamp.space/portfolio/portfolio_items",
            apiAction: "post"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentComfig = this.componentComfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();
    }

    deleteImage(imageType) {
        axios.delete(
            `https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
            { withCredentials: true }
        ).then(response => {
            this.setState({
                [`${imageType}_url`]: ""
            });
        }).catch(error => {
            console.log('delete image error', error);
        });
    }

    componentDidUpdate() {
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id,
                name,
                category,
                position,
                description,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit;

            this.props.clearPortfolioToEdit();

            this.setState({
                id: id,
                name: name || "",
                category: category || "Ecommerce",
                description: description || "",
                url: url || "",
                position: position || "",
                editMode: true,
                apiUrl: `https://paigecrandall.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: "patch",
                thumb_image_url: thumb_image_url || "",
                banner_image_url: banner_image_url || "",
                logo_url: logo_url || ""
            });
        }
    }

    handleThumbDrop() {
        return {
            addedfile: file => this.setState({ thumb_image: file })
        }
    }

    handleBannerDrop() {
        return {
            addedfile: file => this.setState({ banner_image: file })
        }
    }

    handleLogoDrop() {
        return {
            addedfile: file => this.setState({ logo: file })
        }
    }

    componentComfig() {
        return {
            iconFiletypes: ['.jpg', '.png'],
            showFiletypeIcon: true,
            postUrl: 'https://httpbin.org/post'
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildForm() {
        let formData = new FormData();
        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);
        if (this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }
        if (this.state.banner_image) {
            formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }
        if (this.state.logo) {
            formData.append("portfolio_item[logo]", this.state.logo);
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
        })
        .then(response => {
            if (this.state.editMode) {
                this.props.handleEditFormSubmission();
            } else {
                this.props.handleNewFormSubmission(response.data.portfolio_item);
            }

            this.setState({
                name: "",
                category: "Ecommerce",
                description: "",
                url: "",
                position: "",
                thumb_image: "",
                banner_image: "",
                logo: "",

                editMode: false,
                apiUrl: "https://paigecrandall.devcamp.space/portfolio/portfolio_items",
                apiAction: "post"
            });

            [this.thumbRef, this.logoRef, this.bannerRef].forEach(ref => {
                ref.current.dropzone.removeAllFiles();
            });

        }).catch(error => {
            console.log('portfolio form handleSubmit error:', error);
        });

        event.preventDefault();
    }

    render() {
        return (
                <form className="portfolio-form-wrapper" onSubmit={this.handleSubmit}>
                    <div className="two-columns">
                        <input
                            type="text"
                            name="name"
                            placeholder="Portfolio Item Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="url"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="two-columns">
                        <input
                            type="text"
                            name="position"
                            placeholder="Position"
                            value={this.state.position}
                            onChange={this.handleChange}
                        />
                        <select
                            name="category"
                            value={this.state.category}
                            onChange={this.handleChange}
                            className="select-element"
                        >
                            <option value="Ecommerce">Ecommerce</option>
                            <option value="Enterprise">Enterprise</option>
                            <option value="Scheduling">Scheduling</option>
                        </select>
                    </div>
                    <div className="one-columns">
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="img-uploaders">

                        {this.state.thumb_image_url && this.state.editMode ?
                            <div className="image-upload-wrapper">
                                <img src={this.state.thumb_image_url}/>
                                <div className="img-removal-link">
                                    <a onClick={() => this.deleteImage("thumb_image")}>
                                        Remove File
                                    </a>
                                </div>
                            </div>
                            : (
                                <DropzoneComponent
                                    ref={this.thumbRef}
                                    config={this.componentComfig()}
                                    djsConfig={this.djsConfig()}
                                    eventHandlers={this.handleThumbDrop()}
                                >
                                    <div className="dz-message">Thumb Image</div>
                                </DropzoneComponent>
                            )}

                        {this.state.banner_image_url && this.state.editMode ?
                            <div className="image-upload-wrapper">
                                <img src={this.state.banner_image_url}/>
                                <div className="img-removal-link">
                                    <a onClick={() => this.deleteImage("banner_image")}>
                                        Remove File
                                    </a>
                                </div>
                            </div>
                            
                            : (
                                <DropzoneComponent
                                    ref={this.bannerRef}
                                    config={this.componentComfig()}
                                    djsConfig={this.djsConfig()}
                                    eventHandlers={this.handleBannerDrop()}
                                >
                                    <div className="dz-message">Banner Image</div>
                                </DropzoneComponent>
                        )}

                        {this.state.logo_url && this.state.editMode ?
                            <div className="image-upload-wrapper">
                                <img src={this.state.logo_url}/>
                                <div className="img-removal-link">
                                    <a onClick={() => this.deleteImage("logo")}>
                                        Remove File
                                    </a>
                                </div>
                            </div>
                            : (
                            <DropzoneComponent
                                ref={this.logoRef}
                                config={this.componentComfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleLogoDrop()}
                            >
                                <div className="dz-message">Logo</div>
                            </DropzoneComponent>
                        )}
                    </div>
                    <div>
                        <button className="btn" type="submit">Save</button>
                    </div>
                </form>
        );
    }
}