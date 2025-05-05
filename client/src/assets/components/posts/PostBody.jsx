import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import he from 'he';

const PostBody = ({ body }) => {
    const [expandedPost, setExpandedPost] = useState(false);

    const renderBodyWithTags = (text) => {
        return text.split(' ').map((word, i) => {
            if (word.startsWith('#')) {
                const cleanTag = word.replace(/[^\w#]/g, '').slice(1).toLowerCase();
                return (
                    <Link
                        key={i}
                        // to={`/tags/${cleanTag}`}
                        to={`#`}
                        className="text-primary hover:underline"
                    >
                        {word + ' '}
                    </Link>
                );
            }
            return <span key={i}>{word + ' '}</span>;
        });
    };

    const shouldTruncate = body.split('\n').length > 3 || body.length > 300;

    return (
        <div>

            <p className={`${expandedPost ? '' : 'line-clamp-3'} whitespace-pre-line`}>
                {renderBodyWithTags(he.decode(body))}
            </p>

            {shouldTruncate && (
                <button
                    onClick={() => setExpandedPost(prev => !prev)}
                    className="mt-2 text-sm link link-secondary link-hover"
                >
                    {expandedPost ? 'Show Less' : 'Read More'}
                </button>
            )}
        </div>
    );
};

export default PostBody