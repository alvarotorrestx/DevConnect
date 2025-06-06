import { useState } from "react";
import Activity from "./Activity";
import Events from "./Events";
import UserInfo from "./UserInfo";
import Blogs from "./Blogs";
import Posts from "../posts/Posts";
import WelcomeBanner from "./WelcomeBanner";
import MutualPeople from './MutualPeople';
import useAuth from "../../../auth/useAuth";
import { axiosPrivate } from "../../../api/axios";

const POST_URL = '/api/posts'

const Dashboard = () => {
  const { auth, setAuth } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page = 1) => {
    if (!auth?.id || !auth?.following) return;
    setLoading(true);
    try {
      const userIds = [auth.id, ...auth.following].join(',');

      const response = await axiosPrivate.get(`${POST_URL}?page=${page}&limit=10&userIds=${userIds}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      });

      setPosts(response.data.posts);
      (posts.length <= 0) && setCurrentPage(1);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  return (
    <div className="flex flex-col h-auto">
      {/* main container */}
      <div className="md:grid w-[95%] h-auto md:grid-cols-4 gap-3 mx-auto">
        {/* first column */}
        <div className="col-span-1 ">
          <div className="md:flex md:flex-col md:gap-3 rounded-lg hidden">
            {/* profile container */}
            <UserInfo />

            <MutualPeople
              auth={auth}
              setAuth={setAuth}
              refreshPosts={fetchPosts}
            />
          </div>
        </div>

        {/* second column */}
        <div className="md:col-span-2 flex flex-col gap-6 sm:w-full">

          {/* welcome banner */}
          <WelcomeBanner />

          {/* blog-post-container  */}
          <Posts
            auth={auth}
            POST_URL={POST_URL}
            setAuth={setAuth}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            fetchPosts={fetchPosts}
            posts={posts}
            setPosts={setPosts}
          />
        </div>

        {/* third column */}
        <div className="hidden md:flex flex-col rounded-lg gap-3">
          {/* activity container */}
          <Activity />

          {/* Blogs container*/}
          <Blogs />

          {/* Events */}
          <Events />

        </div>



      </div>
    </div>
  );
};

export default Dashboard;