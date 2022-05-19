import React from 'react';
import { Link } from 'react-router-dom';
import striptags from 'striptags';
import Truncate from 'react-truncate';

const BlogItem = (props) => {
    const {
        id,
        title,
        content,
        blog_status,
        featured_image_url
    } = props.blogItem;

    return (
        <div>
    
            <Link to={`/blog-item/${id}`}>
                <h1>{title} <span className="draft-text">{blog_status !== "published" ? "(Draft)" : null}</span></h1>
            </Link>
    
            <div>
                <Truncate lines={3} ellipsis={
                <span>
                    . . .  <Link to={`/blog-item/${id}`} >Read More</Link>
                </span>
                }>
                    {striptags(content)}
                </Truncate>
            </div>
    
        </div>
    )
}

export default BlogItem;