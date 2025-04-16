import './styles.css'

const Dashboard = () => {
    return (
      <div className='flex flex-col'>
        {/* <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p className="mb-6 text-lg">You're logged in successfully 🎉</p>
        </div> */}
      
        <div className="main mt-7 flex flex-col md:flex-row gap-5">
  
          <div className="first-column flex flex-col gap-19 w-65">
            <div className="p-5 flex flex-col gap-5 border-[15px] border-white rounded-md mb-4 ">
              <div className="flex items-center gap-2">
                <div className="image">
                  <img 
                  className='w-[60px] h-[60px] rounded-[50px]'
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s"
                   alt="profile-img"  />
                </div>
                <div className="username">
                  <h2 className='text-blue-900 font-bold text-xl'>John David</h2>
                  <h2>@justin098</h2>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col text-center">
                  <div className='font-extrabold'>2.3k</div>
                  <div>Followers</div>
                </div>
                <div className="flex flex-col text-center">
                  <div className='font-extrabold'>890</div>
                  <div>Following</div>
                </div>
                <div className="flex flex-col text-center">
                  <div className='font-extrabold'>80</div>
                  <div>Post</div>
                </div>
              </div>
  
            </div>
            {/* <div className="nav"> */}
              <div className="activity-container flex flex-col bg-white border-[12px] rounded-md border-white ">
                <div className='flex gap-2 justify-between w-full items-center mb-3'>
                   <div className='flex gap-3 items-center'>
                     <span className="material-symbols-outlined text-blue-800">
                             timeline
                      </span>
                      <div className='font-bold'>
                        Activity 
                      </div>
                   </div>
                   <div className='text-blue-800'>
                        see All
                   </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2 border border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Cipta</span>
                      <span className="time text-[12px]">33 seconds ago</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Cipta</span>
                      <span className="time text-[12px]">33 seconds ago</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Cipta</span>
                      <span className="time text-[12px]">33 seconds ago</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Cipta</span>
                      <span className="time text-[12px]">33 seconds ago</span>
                    </div>
                  </div>
                   
                </div>
              </div>
              <div className="forums-container flex flex-col bg-white border-[12px] mt-5 border-white rounded-md">
                <div className='flex gap-2 justify-between w-full items-center mb-3'>
                   <div className='flex gap-3 items-center'>
                   <span class="material-symbols-outlined   text-blue-800">
forum
</span>
                 
                      <div className='font-bold'>
                        Forums
                      </div>
                   </div>
                   <div className='text-blue-800'>
                        see All
                   </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2 border border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Forum 1 Discussion</span>
                      <span className="time text-[12px]">20 people</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Forum 2 Discussion</span>
                      <span className="time text-[12px]">70 people</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Forum 3 DIscussion</span>
                      <span className="time text-[12px]">50 people</span>
                    </div>
                  </div>
                  <div className='flex gap-2 border-gray-100 shadow-md p-2'>
                  <div className="left">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                      className='w-[40px] h-[40px] rounded-[40px]'/>
                    </div>
                    <div className="rights flex flex-col">
                      <span className="name font-semibold">Forum 4 Discussion</span>
                      <span className="time text-[12px]">33 people</span>
                    </div>
                  </div>
                   
                </div>
              </div>
              
            
          </div>
   
          <div 
           className="second-column flex flex-col gap-5">
            <div 
            className="image-container w-[700px] h-[150px] rounded-md">
              <img 
              src="https://i.pinimg.com/736x/bd/da/fc/bddafc029d86df72bef91bba70973c71.jpg" alt="" className='h-full w-full object-cover rounded-md' /> 
            </div>
            <div className="blog-post-container w-700 h-110 bg-white rounded-[15px] p-1.5">
              <div className="input-field m-2 flex items-center gap-5">
                <div className="image">
                  <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                  className='w-[50px] h-[50px] rounded-[50px]'/>
                </div>
                <div className="input">
                  <input 
                  type="text" placeholder='Whats on your mind?' 
                  className='rounded-md w-[450px] bg-[#e0e0e0]'/>
                </div>
                <div className=" btn btn-primary">
                  <button 
                  className=' font-semibold text-[13px]'>Share Post</button>
                </div>
              </div>
              <div className="attachements flex gap-5 mx-5 mt-5 mb-2">
                <div className="image flex gap-2 items-center">
                  <span className="material-symbols-outlined cursor-pointer">
                  attach_file
                  </span>
                  <div className='cursor-pointer'>Attachments</div>
                </div>
                <div 
                  className="image flex gap-2 items-center">
                  <span className="material-symbols-outlined cursor-pointer">
                  videocam
                </span>
                <div className='cursor-pointer'>Live</div>
                </div>
                <div className="image flex gap-2 items-center">
                  <span className="material-symbols-outlined cursor-pointer">
                  image
                </span>
                <div className='cursor-pointer'>Image</div>
                </div>
                <div className="image flex gap-2 items-center cursor-pointer">Mention</div>
              </div>
  
            </div>
            <div className="blog-feed bg-white rounded-[20px] ">
              <div className="blog-container p-4 w-[700px] h-[500px] border-[2px] flex flex-col gap-[16px]">
                <div className="blog-top flex gap-[10px]">
                  <div className="image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                    className='w-[50px] h-[50px] rounded-[50px]'/>
                  </div>
                  <div className="username">
                    <div className="name">
                      <h2 className='font-bold text-[20px]'>John David</h2>
                    </div>
                    <div className="time">
                      4:45pm ,Aug 2025
                    </div>
                  </div>
                </div>
                <div className="blog-image flex justify-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                  className='w-[600px] h-[350px]'/>
                </div>
                <div className="blog-extra flex gap-[50px]">
                  <div className="likes flex gap-[5px]">
                  <span class="material-symbols-outlined">
                       favorite
                  </span>
                   <div>30 likes</div>
                  </div>
                  <div className="comments flex gap-[5px]">
                  <span class="material-symbols-outlined">
chat_bubble
</span>
<div>12 comments</div>
                    
                  </div>
                  <div className="share flex gap-[5px]">
                  <span class="material-symbols-outlined">
share
</span>
<div>Share</div>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
  
          <div className="third-column w-[300px] h-[550px] bg-white rounded-[15px] border-[4px] flex flex-col p-2">
            <div className="message-container flex flex-col gap-4">
              <div className="first-section flex px-2 justify-between">
                <div className="heading flex justify-between items-center w-full">
                  <h2 className='font-bold text-[20px]'>Messages</h2>
                  <span class="material-symbols-outlined">
                     edit_square
                  </span>
                </div>
              </div>
              <div className="second-section mx-2 ">
                <input type="text" placeholder='search'
                className='h-[30px] w-[200px] rounded-sm font-semibold bg-white' />
              </div>
  
              <div className="names flex flex-col">
                <div className="headings flex justify-between w-full mb-3">
                  <div className="left flex text-[16px] gap-6">
                    <div className='text-[13px] font-bold border-b-2 border-black cursor-pointer '>Primary</div>
                    <div className='text-[13px] cursor-pointer '>General</div>
                  </div>
                  <div className="right text-[13px] text-blue-500 font-semibold cursor-pointer">
                    FriendReq(4)
                  </div>
                </div>
                <div className="names flex flex-col gap-5"> 
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                    className='w-[40px] h-[40px] rounded-[50px]'/>
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                    className='w-[40px] h-[40px] rounded-[50px]'/>
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                    className='w-[40px] h-[40px] rounded-[50px]'/>
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" 
                    className='w-[40px] h-[40px] rounded-[50px]'/>
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt=""
                    className='w-[40px] h-[40px] rounded-[50px]' 
                    />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile ml-2 flex gap-5 items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" 
                    alt="" 
                    className='w-[40px] h-[40px] rounded-[50px]'/>
                    <div className="name">Bob</div>
                  </div>
                  <div className="view-button ml-10 flex gap-10 align-middle">
                    View All
                  </div>
                </div>
              </div>
              
  
            </div>
           
            
          
  
        </div>
      
  
      </div>
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
  <aside className="grid-flow-col items-center">
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-current">
      <path
        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    </svg>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
      </svg>
    </a>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
      </svg>
    </a>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
      </svg>
    </a>
  </nav>
</footer>

      </div>
    );
};

export default Dashboard;
