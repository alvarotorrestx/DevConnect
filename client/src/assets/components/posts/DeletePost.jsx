import React from 'react'
import { FaTimes, FaCheck } from 'react-icons/fa';
import { axiosPrivate } from '../../../api/axios';

const DeletePost = ({ auth, post, setAuth, POST_URL, showError, showSuccess, setPosts }) => {

    const deletePost = async (postId) => {
        try {
            const response = await axiosPrivate.delete(`${POST_URL}/${postId}`, {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`
                }
            });

            setPosts(prev => prev.filter(post => post._id !== postId));
            showSuccess('Post successfully deleted.');

            // Helper to update Dashboard total posts counter
            setAuth(prev => ({
                ...prev,
                totalPosts: prev.totalPosts.filter(id => id !== postId)
            }));
        }
        catch (err) {
            // If no error response
            if (!err?.response) {
                showError('No Server Response');
            } else {
                showError(`${JSON.stringify(err.response.data.message).slice(1, -1)}` || 'Error deleting post.');
            }
        }
    }

    return (
        <>

            {/* Delete Post Button */}
            <button
                className="btn btn-error btn-sm"
                onClick={() => document.getElementById(`delete_post_modal_${post._id}`).showModal()}
            >
                <FaTimes />
            </button>

            <dialog id={`delete_post_modal_${post._id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Are you sure?</h3>
                    <p className="py-4 text-base-content">
                        This action cannot be undone. Do you really want to delete this post?
                    </p>

                    <div className="modal-action flex justify-end gap-3">
                        {/* Cancel Button */}
                        <form method="dialog">
                            <button className="btn btn-sm btn-secondary">
                                <FaTimes />
                                Cancel
                            </button>
                        </form>

                        {/* Confirm Delete Button */}
                        <button
                            onClick={() => deletePost(post._id)}
                            className="btn btn-error btn-sm"
                        >
                            <FaCheck />
                            Yes, Delete
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

export default DeletePost