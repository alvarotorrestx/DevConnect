import './styles.css'

const Dashboard = () => {
    return (
        // <div className="flex flex-col items-center justify-center min-h-screen text-center">
        //     <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
        //     <p className="mb-6 text-lg">You're logged in successfully 🎉</p>
        // </div>
        <div className='m-3'>

        <div className="container">
          <div className="navbar">
            <div className="left">
              <div className="icon">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
              </div>
              <div className="website-name">
                DevConnect
              </div>
            </div>
  
            <div className="right">
              <div className="search-bar">
                <input type="text" placeholder='Search' />
              </div>
              <div className="bell-icon">
                <span class="material-symbols-outlined">
                  notifications_unread
                </span>
              </div>
              <div className="bookmark-icon">
  
              </div>
              <div className="profile">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                <div className="name">Justin</div>
                {/* for login and logout */}
              </div>
            </div>
          </div>
        </div>
        <div className="main my-3 mx-2 flex gap-5">
  
          <div className="first-column w-65">
            <div className="column-container">
              <div className="data">
                <div className="image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                </div>
                <div className="username">
                  <h2>Justin beiber</h2>
                  <h2>@justin098</h2>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col text-center">
                  <div>2.3k</div>
                  <div>Followers</div>
                </div>
                <div className="flex flex-col text-center">
                  <div>890</div>
                  <div>Following</div>
                </div>
                <div className="flex flex-col text-center">
                  <div>80</div>
                  <div>Post</div>
                </div>
              </div>
  
            </div>
            <div className="nav">
              <ul>
  
  
                <li className='selected'>
                  <span class="material-symbols-outlined">
                    home
                  </span>
                  <div>Home</div></li>
  
  
                <li>
                  <span class="material-symbols-outlined">
                    description
                  </span><div>Blog</div></li>
                <li><span class="material-symbols-outlined">
                  note_alt
                </span><div>JobList</div></li>
                <li><span class="material-symbols-outlined">
                  forum
                </span><div>Chats</div></li>
                <li><span class="material-symbols-outlined">
                  contact_page
                </span><div>About</div></li>
                <li><span class="material-symbols-outlined">
                  event
                </span><div>Events</div></li>
              </ul>
              <div className="second-container">
                <h2>Links to visit</h2>
                <a href="https://www.instagram.com">Instagram</a>
                <a href="https://www.linkedin.com">linkedin</a>
                <a href="https://www.github.com">Github</a>
                <a href="https://www.facebook.com">Facebook</a>
              </div>
            </div>
            <div className="footer">
              <nav>
  
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
              </nav>
            </div>
          </div>
  
  
          <div className="second-column ">
            <div className="image-container">
              <img src="https://storyset.com/illustration/instant-information/pana" alt="" />
  
            </div>
            <div className="blog-post-container">
              <div className="input-field">
                <div className="image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                </div>
                <div className="input">
                  <input type="text" placeholder='Whats on your mind?' />
                </div>
                <div className="post-btn">
                  <button>Share Post</button>
                </div>
              </div>
              <div className="attachements">
                <div className="image"><span class="material-symbols-outlined">
                  attach_file
                </span><div>Attachments</div></div>
                <div className="image"><span class="material-symbols-outlined">
                  videocam
                </span><div>Live</div></div>
                <div className="image"><span class="material-symbols-outlined">
                  image
                </span><div>Image</div></div>
                <div className="image">Mention</div>
              </div>
  
            </div>
            <div className="blog-feed">
              <div className="blog-container">
                <div className="blog-top">
                  <div className="image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                  </div>
                  <div className="username">
                    <div className="name">
                      <h2>Bieber</h2>
                    </div>
                    <div className="time">
                      4:45pm ,Aug 2025
                    </div>
                  </div>
                </div>
                <div className="blog-image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                </div>
                <div className="blog-extra">
                  <div className="likes">
                    likes
                  </div>
                  <div className="comments">
                    comments
                  </div>
                  <div className="share">
                    share
                  </div>
                </div>
  
              </div>
            </div>
          </div>
  
          <div className="third-column">
            <div className="message-container">
              <div className="first-section">
                <div className="heading">
                  <h2>Messages</h2>
                  <div className="edit-icon"></div>
                </div>
              </div>
              <div className="second-section">
                <input type="text" placeholder='search' />
              </div>
  
              <div className="names">
                <div className="headings">
                  <div className="left">
                    <div>Primary</div>
                    <div>General</div>
                  </div>
                  <div className="right">
                    FriendReq(4)
                  </div>
                </div>
                <div className="names">
  
  
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="first-profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s" alt="" />
                    <div className="name">Bob</div>
                  </div>
                  <div className="view-button">
                    View All
                  </div>
                </div>
              </div>
              
  
            </div>
          </div>
  
        </div>
  
      </div>
    );
};

export default Dashboard;
