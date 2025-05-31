import Carousel from "./Carousel";
import Activity from "./Activity";
import Messages from "./Messages";
import Events from "./Events";
import UserInfo from "./UserInfo";
import Forums from "./Forums";
import Posts from "../posts/Posts";
import WelcomeBanner from "./WelcomeBanner";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-auto">
      {/* main container */}
      <div className="md:grid w-[95%] h-auto md:grid-cols-4 gap-3 mx-auto">
        {/* first column */}
        <div className="col-span-1 ">
          <div className="md:flex md:flex-col md:gap-3  rounded-md hidden">
            {/* profile container */}
            <UserInfo />

            {/* activity container */}
            <Activity />

            {/* forums container*/}
            <Forums />
          </div>
        </div>

        {/* second column */}
        <div className="md:col-span-2  flex flex-col gap-3 sm:w-full ">

          {/* moblie carousel */}
          <div className="md:hidden block">
            <Carousel />
          </div>

          {/* welcome banner */}
          <WelcomeBanner />

          {/* blog-post-container  */}
          <Posts />
        </div>

        {/* third column */}
        <div className="md:col-span-1 rounded-md gap-5">

          {/* message container */}
          <div className="md:block hidden">
            <Messages />
          </div>


          {/* Events */}
          <div className="md:block hidden">
            <Events />
          </div>


        </div>



      </div>
    </div>
  );
};

export default Dashboard;