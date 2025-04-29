import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../auth/useAuth';
import Loading from '../subcomponents/Loading';
import CreatePost from './CreatePost';
import PostBody from './PostBody';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Toast imports
import ErrorToast from "../toast/ErrorToast";
import { useErrorToast } from "../toast/useErrorToast";
import SuccessToast from "../toast/SuccessToast";
import { useSuccessToast } from "../toast/useSuccessToast";
import DeletePost from './DeletePost';
import EditPost from './EditPost';

const POST_URL = '/api/posts'

const Posts = () => {
    const { auth } = useAuth();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    const isImage = url => !isVideo(url); // fallback logic
    const isVideo = url => /\.(mp4|webm|ogg)$/i.test(url);

    useEffect(() => {
        const fetchPosts = async (page = 1) => {
            setLoading(true);
            try {
                const response = await axiosPrivate.get(`${POST_URL}?page=${page}&limit=10`, {
                    headers: {
                        Authorization: `Bearer ${auth?.accessToken}`
                    }
                });

                setPosts(response.data.posts);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        // scrollY = window.scrollY;
        window.scrollTo(0, 0);
        fetchPosts(currentPage);
    }, [auth?.accessToken, currentPage]);

    const canUserModifyPost = (post, auth) => {
        if (!auth || !post?.author) return false;

        const currentRole = auth.role;
        const postAuthorRole = post.author.role;

        if (post.author.username === auth.username) return true;

        const roleHierarchy = {
            user: 1,
            moderator: 2,
            admin: 3,
            owner: 4
        };

        return roleHierarchy[currentRole] > roleHierarchy[postAuthorRole];
    };


    return (
        <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-300 rounded-lg shadow-md mt-10">

            <CreatePost POST_URL={POST_URL} auth={auth} setPosts={setPosts} />

            {
                loading
                    ?
                    <Loading />
                    :
                    posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="relative [&:not(:last-child)]:mb-6 p-5 rounded-md shadow border border-base-300 bg-base-200">

                                {canUserModifyPost(post, auth) &&
                                    (
                                        <>
                                            <div className='absolute top-0 right-0 flex flex-row justify-center items-center gap-2 mt-3 mr-3'>
                                                <EditPost
                                                    auth={auth}
                                                    post={post}
                                                    POST_URL={POST_URL}
                                                    showSuccess={showSuccess}
                                                    showError={showError}
                                                    setPosts={setPosts}
                                                />

                                                <DeletePost
                                                    auth={auth}
                                                    post={post}
                                                    POST_URL={POST_URL}
                                                    showSuccess={showSuccess}
                                                    showError={showError}
                                                    setPosts={setPosts}
                                                />
                                            </div>
                                        </>
                                    )
                                }

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
                                            className="text-sm link link-primary link-hover"
                                        >
                                            @{post.author.username}
                                        </Link>
                                    </div>
                                </div>

                                {/* Post Body */}
                                <PostBody body={post.body} />


                                {/* Media */}
                                {post.media && (
                                    <div className="mt-4 space-y-4">

                                        {/* Render Images */}
                                        {Array.isArray(post.media.images) && post.media.images.length > 0 && (
                                            <div className="space-y-2">
                                                {post.media.images.map((url, index) => (
                                                    <img
                                                        key={`image-${index}`}
                                                        src={url}
                                                        alt={`Post image ${index + 1}`}
                                                        className="rounded-md max-w-full"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Render Videos */}
                                        {Array.isArray(post.media.videos) && post.media.videos.length > 0 && (
                                            <div className="space-y-2">
                                                {post.media.videos.map((url, index) => (
                                                    <video
                                                        key={`video-${index}`}
                                                        controls
                                                        className="rounded-md max-w-full"
                                                    >
                                                        <source src={url} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                )}


                                {/* Tags */}
                                {post.tags.length > 0 && (
                                    <p className="text-sm text-base-content/70 my-2">
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
                        :
                        <p>No posts found.</p>
            }

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-4">Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Add Toast Components */}
            <SuccessToast
                message={successMessage}
                show={showSuccessToast}
                status="success"
                icon={
                    <FaCheckCircle className="text-green-600 text-4xl bg-transparent p-0 m-0" />
                }
                iconBgColor="bg-blue-200"
            />
            <ErrorToast
                message={errorMessage}
                show={showErrorToast}
                status="error"
                icon={<FaTimesCircle className="text-red-600 text-4xl" />}
                iconBgColor="bg-red-700"
            />
        </div >
    );
};

export default Posts;
