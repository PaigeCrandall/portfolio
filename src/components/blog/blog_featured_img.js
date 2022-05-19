import React from 'react';

const BlogFeaturedImg = props => {
    if (!props.img) {
        return null;
    } else {
        return (
            <div className="featured-blog-image-wrapper" >
                <img src={props.img} />
            </div>
        )
    }
}

export default BlogFeaturedImg;