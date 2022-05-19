import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

import BlogItem from '../blog/blog-item';
import BlogModal from '../modals/blog-modal';

export default class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false,
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll, false);
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleDeleteClick(blog) {
        axios
            .delete(`https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
            {withCredentials: true
            }).then(response => {
                this.setState({
                    blogItems: this.state.blogItems.filter(blogItem => {
                        return blog.id !== blogItem.id;
                    })
                });
                return response.data

            }).catch(error => {
                console.log('handleDeleteClick', error);
            });
    }

    handleSuccessfulNewBlogSubmission(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        });
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        });
    }

    handleNewBlogClick() {
        this.setState({
            blogModalIsOpen: true
        });
    }

    onScroll() {
        if (
            this.state.isLoading ||
            this.state.blogItems.length === this.state.totalCount
        ) {
            return;
        }
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight || window.innerHeight + document.documentElement.scrollTop + 0.5 === document.documentElement.offsetHeight) {
            this.getBlogItems();
            console.log('getting blogs');
        }
    };

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });

        axios.get(
            `https://paigecrandall.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
            { withCredentials: true }
        ).then(response => {
            this.setState({
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false
            });
        }).catch(error => {
            console.log("getBlogItems error", error);
        });
    }

    componentWillMount() {
        this.getBlogItems();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            if (blogRecords !== null && this.props.loggedInStatus === "LOGGED_IN") {
                return (
                    <div key={blogItem.id} className="admin-blog-wrapper">
                        <BlogItem blogItem={blogItem} />
                        <a className="blog-delete-icon" onClick={() => this.handleDeleteClick(blogItem)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                )
            } else if (blogRecords !== null && blogItem.blog_status === "published") {
                return (
                    <BlogItem key={blogItem.id} blogItem={blogItem} />
                );
            } else {
                return <div className="no-blog-records"><h1>No Blog Records</h1></div>
            }
        });

        return (
            <div className="blog-container">
                <BlogModal
                    modalIsOpen={this.state.blogModalIsOpen}
                    handleModalClose={this.handleModalClose}
                    handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
                />

                {this.props.loggedInStatus === "LOGGED_IN" ?
                <div className="new-blog-link">
                    <a onClick={this.handleNewBlogClick}>
                        <FontAwesomeIcon icon="circle-plus" />
                    </a>
                </div> : null }

                <div className="content-container">
                    {blogRecords}
                </div>

                {this.state.isLoading ? (
                    <div className="content-loader">
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>
                ) : null}
            </div>
        )
    }
}