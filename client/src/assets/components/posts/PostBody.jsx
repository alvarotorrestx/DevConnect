import React, { useState } from 'react'

const PostBody = ({ body }) => {
    const [expandedPost, setExpandedPost] = useState(false);

    return (
        <div className="relative">
            <p className={`${expandedPost ? '' : 'line-clamp-3'} whitespace-pre-line`}>
                {body}
            </p>

            {/* Toggle button */}
            {body.split('\n').length > 3 || body.length > 300 ? (
                <button
                    onClick={() => setExpandedPost(prev => !prev)}
                    className="mt-2 text-sm link link-secondary link-hover"
                >
                    {expandedPost ? 'Show Less' : 'Read More'}
                </button>
            ) : null}
        </div>
    );
}

export default PostBody