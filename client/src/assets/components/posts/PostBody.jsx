import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const PostBody = ({ body }) => {
    const [expandedPost, setExpandedPost] = useState(false);

    const renderBodyWithTags = (text) => {
      return text.replace(/(^|\s)(#\w+)/g, (_, space, tag) => {
        const tagText = tag.replace(/[^\w#]/g, '').slice(1).toLowerCase();
        // return `${space}[${tag}](/tags/${tagText})`;
        return `${space}[${tag}](#)`;
      });
    };

    const shouldTruncate = body.split('\n').length > 3 || body.length > 300;

    return (
        <div>

            <p className={`${expandedPost ? '' : 'line-clamp-3'} whitespace-pre-line`}>
              <ReactMarkdown
                components={{
                  a: ({ href, children }) => (
                    <Link to={href} className='text-primary hover:underline'>
                      {children}
                    </Link>
                  ),
                }}
              >
                {renderBodyWithTags(body)}
              </ReactMarkdown>
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