import React, { useState } from 'react'
import { axiosPrivate } from '../../../api/axios';

const POST_URL = '/api/posts'

const CreatePost = ({ loading, auth }) => {

    const [postData, setPostData] = useState({
        body: '',
        media: [],
        featured: false,
        tags: [],
    });

    const [buttonStatus, setButtonStatus] = useState("Post");

    const handleChange = (e) => {
        setPostData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handlePost = async (e) => {
        e.preventDefault();
        setButtonStatus("Loading...");

        try {
            const response = await axiosPrivate.post(POST_URL, postData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                withCredentials: true,
            })

            console.log(response.status);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setButtonStatus("Post");
        }
    }

    return (
        <div className="mx-auto bg-base-100 p-4 rounded-lg shadow my-6">
            {/* Top Row: Avatar and Input */}
            <div className="flex items-start gap-4">
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
                    className="w-full max-h-[300px] rounded-lg bg-base-200 p-3 text-base focus:outline-none focus:ring focus:ring-primary"
                    rows="3"
                    placeholder="What's on your mind?"
                />
            </div>

            {/* Media Input */}
            <div className="my-3">
                <input
                    type="url"
                    placeholder="Paste media URL (image/video)"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    id="media"
                    value={postData.media[0] || ''}
                />
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-2 mb-4">
                <button
                    type="button"
                    className={`btn btn-sm ${postData.featured ? 'btn-warning' : 'btn-outline'}`}
                    onClick={() => setPostData(prev => ({ ...prev, featured: !prev.featured }))}
                >
                    {postData.featured ? '⭐️ Featured' : '☆ Not Featured'}
                </button>
                <span className="text-sm text-base-content/70">
                    Mark this post as featured?
                </span>
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
        </div>

    )
}

export default CreatePost