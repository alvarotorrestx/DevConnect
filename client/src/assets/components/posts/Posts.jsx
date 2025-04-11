import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../auth/useAuth';
import Loading from '../subcomponents/Loading';

const Posts = () => {
    const { auth } = useAuth();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axiosPrivate.get('/api/posts', {
                    headers: {
                        Authorization: `Bearer ${auth?.accessToken}`
                    }
                });
                setPosts(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [auth?.accessToken]);

    return (
        <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10">
            {loading
                ?
                <Loading />
                :
                (
                    posts.map((post) => (
                        <div key={post._id} className="[&:not(:last-child)]:mb-6 p-5 rounded-md shadow border border-base-300 bg-base-200">

                            {/* Author Info */}
                            <div className="flex items-center gap-4 mb-2">
                                <img
                                    src={post.author.avatar}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{post.author.firstName} {post.author.lastName}</p>
                                    <Link
                                        to={`/profile/${post.author.username}`}
                                        className="text-sm text-blue-400 hover:underline"
                                    >
                                        @{post.author.username}
                                    </Link>
                                </div>
                            </div>

                            {/* Post Body */}
                            <p className="mb-2 text-base-content">{post.body}</p>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <p className="text-sm text-base-content/70 mb-1">
                                    <strong>Tags:</strong> {post.tags.map(tag => `#${tag}`).join(' ')}
                                </p>
                            )}

                            {/* Post Meta Info */}
                            <div className="text-xs text-base-content/60 flex flex-wrap gap-4 mt-2">
                                <p>📅 {new Date(post.createdAt).toLocaleString()}</p>
                                <p>🔥 Featured: {post.featured ? 'Yes' : 'No'}</p>
                                <p>❤️ Likes: {post.likes.length}</p>
                                <p>💬 Comments: {post.comments.length}</p>
                                {post.repostedBy.length > 0 && <p>🔁 Reposts: {post.repostedBy.length}</p>}
                            </div>

                        </div>
                    ))
                )
            }
        </div>
    );
};

export default Posts;
