import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../../../api/axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Toast imports
import ErrorToast from "../toast/ErrorToast";
import { useErrorToast } from "../toast/useErrorToast";
import SuccessToast from "../toast/SuccessToast";
import { useSuccessToast } from "../toast/useSuccessToast";

const CreatePost = ({ POST_URL, auth, setAuth, setPosts }) => {

    const [postData, setPostData] = useState({
        body: '',
        media: {
            images: [],
            videos: []
        },
        featured: false,
        tags: [],
    });

    const [buttonStatus, setButtonStatus] = useState("Post");

    const {
        message: errorMessage,
        show: showErrorToast,
        showError,
    } = useErrorToast();

    const {
        message: successMessage,
        show: showSuccessToast,
        showSuccess,
    } = useSuccessToast();

    const handleChange = (e) => {
        setPostData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    useEffect(() => {
        const words = postData.body.split(/\s+/).map(word => word.replace(/[^\w#].*$/g, ''));
        const foundTags = [...new Set(
            words.filter(word => word.startsWith('#') && word.length > 1)
                .map(tag => tag.slice(1).trim().toLowerCase())
        )];


        setPostData(prev => ({ ...prev, tags: foundTags }));
    }, [postData.body]);


    const handlePost = async (e) => {
        e.preventDefault();
        setButtonStatus("Loading...");

        const formattedBody = postData.body
            .replace(/(?<!\s)\n/g, " \n") // Add spaces before newlines
            .replace(/(?<!\s)#/g, " #") // Add spaces before hashtags
            .replace(/\n#/g, "\n #"); // Add spaces before hashtags after newlines

        const words = formattedBody.split(/\s+/).map(word => word.replace(/[^\w#].*$/g, ''));
        const tagsAfterFormatting = [
            ...new Set(
                words
                    .filter((word) => word.startsWith("#") && word.length > 1)
                    .map((tag) => tag.slice(1).trim().toLowerCase())
            ),
        ];

        const postToSend = {
            ...postData,
            body: formattedBody,
            tags: tagsAfterFormatting,
        };

        try {
            const response = await axiosPrivate.post(POST_URL, postToSend, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });

            const fullPost = await axiosPrivate.get(`${POST_URL}/${response.data.post._id}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            });

            setPosts(prev => [fullPost.data, ...prev]);
            setPostData((prev) => ({
                ...prev,
                body: '',
                media: {
                    images: [],
                    videos: []
                },
                featured: false,
                tags: [],
            }));
            showSuccess('Post successfully created.');

            // Helper to update Dashboard total posts counter
            setAuth(prev => ({
                ...prev,
                totalPosts: [...prev.totalPosts, fullPost.data._id]
            }));

        }
        catch (err) {
            // If no error response
            if (!err?.response) {
                showError('No Server Response');
            } else {
                showError(`${JSON.stringify(err.response.data.message).slice(1, -1)}` || 'Error creating post.');
            }
        }
        finally {
            setButtonStatus("Post");
        }
    }

    return (
        <div className="mx-auto bg-base-100 p-4 rounded-lg shadow-md mb-6">
            {/* Top Row: Avatar and Input */}
            <div className="flex items-center gap-4">
                <img
                    src={auth.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                />
                <textarea
                    id="body"
                    onChange={handleChange}
                    value={postData.body}
                    autoComplete="off"
                    className="w-full min-h-[100px] max-h-[300px] rounded-lg bg-base-200 p-3 text-base focus:outline-none focus:ring focus:ring-primary"
                    rows="3"
                    placeholder="What's on your mind?"
                />
            </div>

            {/* Media Inputs */}
            {/* Image URL Input */}
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

            {/* Video URL Input */}
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

            {/* Divider */}
            <hr className="my-4 border-base-300" />

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm text-base-content/80">
                    <button className="flex items-center gap-1 hover:text-primary">
                        📸 <span>Photo</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary">
                        🎥 <span>Video</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary">
                        📄 <span>Article</span>
                    </button>
                </div>
                <button onClick={handlePost} className="btn btn-primary btn-sm" disabled={postData.body == "" || buttonStatus === "Loading..."}>Post</button>
            </div>

            {/* Add Toast Components */}
            <SuccessToast
                message={successMessage}
                show={showSuccessToast}
                status="success"
                icon={
                    <FaCheckCircle className="text-[--tertiary] text-2xl" />
                }
            />
            <ErrorToast
                message={errorMessage}
                show={showErrorToast}
                status="error"
                icon={<FaTimesCircle className="text-red-600 text-2xl" />}
                iconBgColor="bg-red-700"
            />
        </div>
    )
}

export default CreatePost