import React, { useState, useEffect } from 'react'
import { FaEdit, FaTimes, FaCheck } from 'react-icons/fa';
import { axiosPrivate } from '../../../api/axios';

const EditPost = ({ auth, post, POST_URL, showError, showSuccess, setPosts }) => {

    const [postData, setPostData] = useState({
        body: '',
        media: {
            images: [],
            videos: []
        },
        featured: false,
        tags: [],
    });

    useEffect(() => {
        if (post) {
            setPostData({
                body: post.body || '',
                media: {
                    images: post.media.images || [],
                    videos: post.media.videos || []
                },
                featured: post.featured || false,
                tags: post.tags || [],
            });
        }
    }, [post]);

    const [buttonStatus, setButtonStatus] = useState("Update");

    const handleChange = (e) => {
        setPostData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    useEffect(() => {
        const words = postData.body.split(/\s+/);
        const foundTags = [...new Set(
            words.filter(word => word.startsWith('#') && word.length > 1)
                .map(tag => tag.slice(1).trim().toLowerCase())
        )];


        setPostData(prev => ({ ...prev, tags: foundTags }));
    }, [postData.body]);

    const editPost = async (postId) => {

        setButtonStatus("Loading...");

        try {
            const response = await axiosPrivate.put(`${POST_URL}/${postId}`, postData, {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`
                },
                withCredentials: true,
            });

            const fullPost = await axiosPrivate.get(`${POST_URL}/${response.data.post._id}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });

            
            setPosts(prev => prev.map(newPost => newPost._id === fullPost.data._id ? fullPost.data : newPost));
            showSuccess('Post updated successfully.');
            document.getElementById(`edit_post_modal_${postId}`)?.close();
        }
        catch (err) {
            // If no error response
            if (!err?.response) {
                showError('No Server Response');
            } else {
                showError(`${JSON.stringify(err.response.data.message).slice(1, -1)}` || 'Update Failed');
            }
        }
        finally {
            setButtonStatus("Update")
        }
    }

    return (
        <>
            {/* Edit Post Button */}
            <button
                className="btn btn-secondary btn-sm"
                onClick={() => document.getElementById(`edit_post_modal_${post._id}`).showModal()}
            >
                <FaEdit />
            </button>

            <dialog id={`edit_post_modal_${post._id}`} className="modal">
                <div className="modal-box max-w-2xl bg-base-100 rounded-lg shadow p-6">
                    <h3 className="font-bold text-xl mb-4">Edit Your Post</h3>

                    {/* Body Input */}
                    <div className="flex items-start mb-4">
                        <textarea
                            id="body"
                            onChange={handleChange}
                            value={postData.body}
                            autoComplete="off"
                            className="w-full min-h-[100px] max-h-[300px] rounded-lg bg-base-200 p-3 text-base focus:outline-none focus:ring focus:ring-primary"
                            rows="3"
                        />
                    </div>

                    {/* Media Inputs */}
                    <input
                        type="url"
                        placeholder="Paste image URL"
                        className="input input-bordered w-full my-2"
                        onChange={(e) =>
                            setPostData(prev => ({
                                ...prev,
                                media: {
                                    ...prev.media,
                                    images: [e.target.value]
                                }
                            }))
                        }
                        value={postData.media.images[0] || ''}
                    />

                    <input
                        type="url"
                        placeholder="Paste video URL"
                        className="input input-bordered w-full my-2"
                        onChange={(e) =>
                            setPostData(prev => ({
                                ...prev,
                                media: {
                                    ...prev.media,
                                    videos: [e.target.value]
                                }
                            }))
                        }
                        value={postData.media.videos[0] || ''}
                    />

                    {/* Featured Toggle */}
                    <div className="flex items-center gap-2 mb-4">
                        <button
                            type="button"
                            className={`btn btn-sm ${postData.featured ? 'btn-active' : 'btn-inactive'}`}
                            onClick={() => setPostData(prev => ({ ...prev, featured: !prev.featured }))}
                        >
                            {postData.featured ? '⭐️ Featured' : '☆ Not Featured'}
                        </button>
                    </div>

                    {/* Footer Buttons */}
                    <div className="modal-action flex justify-end gap-3">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-error"
                                disabled={buttonStatus === "Loading..."}
                            >
                                <FaTimes />
                                Cancel
                            </button>
                        </form>

                        <button
                            onClick={() => editPost(post._id)}
                            className="btn btn-secondary btn-sm"
                            disabled={post.body === ""}
                        >
                            {buttonStatus !== "Loading..." ? <FaCheck /> : <span className="loading loading-spinner text-ghost mx-auto flex"></span>}
                            {buttonStatus}
                        </button>
                    </div>
                </div>

                {/* Close modal by clicking backdrop */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default EditPost