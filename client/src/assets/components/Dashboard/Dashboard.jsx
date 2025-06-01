import Activity from "./Activity";
import Events from "./Events";
import UserInfo from "./UserInfo";
import Blogs from "./Blogs";
import Posts from "../posts/Posts";
import WelcomeBanner from "./WelcomeBanner";
import MutualPeople from './MutualPeople';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-auto">
      {/* main container */}
      <div className="md:grid w-[95%] h-auto md:grid-cols-4 gap-3 mx-auto">
        {/* first column */}
        <div className="col-span-1 ">
          <div className="md:flex md:flex-col md:gap-3 rounded-md hidden">
            {/* profile container */}
            <UserInfo />

            <MutualPeople />
          </div>
        </div>

        {/* second column */}
        <div className="md:col-span-2 flex flex-col gap-6 sm:w-full">

          {/* welcome banner */}
          <WelcomeBanner />

          {/* blog-post-container  */}
          <Posts />
        </div>

        {/* third column */}
        <div className="hidden md:flex flex-col rounded-md gap-3">
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