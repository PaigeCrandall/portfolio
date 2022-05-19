import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogFeaturedImg from '../blog/blog_featured_img';
import BlogForm from '../blog/blog-form';

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentBlogId: this.props.match.params.slug,
            blogItem: {},
            editMode: false
        }

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleFeaturedImageDelete = this. handleFeaturedImageDelete.bind(this);
        this.handleUpdateFormSubmission = this. handleUpdateFormSubmission.bind(this)
    }

    handleUpdateFormSubmission(blog) {
        this.setState({
            blogItem: blog,
            editMode: false
        });
    }

    handleFeaturedImageDelete() {
        this.setState({
            blogItem: {
                featured_image_url: ""
            }
        })
    }

    handleEditClick() {
        console.log('Edit-Clicked');
        if (this.props.loggedInStatus === "LOGGED_IN") {
            this.setState({ editMode: true });
        }
    }

    getBlogItem() {
        axios.get(
            `https://paigecrandall.devcamp.space/portfolio/portfolio_blogs/${this.state.currentBlogId}`
        ).then(response => {
            this.setState({
                blogItem: response.data.portfolio_blog
            })
        }).catch(error => {
            console.log('error in getBlogItem', error);
        })
    }

    componentDidMount() {
        this.getBlogItem();
    }

    render() {
        const {
            title,
            content,
            featured_image_url,
        } = this.state.blogItem;

        const contentManager = () => {
            if (this.state.editMode) {
                return (
                    <BlogForm
                        editMode={this.state.editMode}
                        blog={this.state.blogItem}
                        handleFeaturedImageDelete={this.handleFeaturedImageDelete}
                        handleUpdateFormSubmission={this.handleUpdateFormSubmission}
                    />
                );
            } else {
                return (
                    <div className="content-container">
                        <div className="blog-title">
                            <Link exact="true" to="/blog" className="back-arrow">
                                <FontAwesomeIcon icon="arrow-left"/>
                            </Link>
                            <h1 onClick={this.handleEditClick}>{title}</h1>
                        </div>

                        <BlogFeaturedImg img={featured_image_url} />

                        <div className="blog-content">{ReactHtmlParser(content)}</div>
                    </div>
                );
            }
        }

        return (
            <div className="blog-container">
                {contentManager()}
            </div>
        );
    }
}