import { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import RequireAuth from './auth/RequireAuth';
import PersistLogin from './auth/PersistLogin';
import RedirectIfAuth from './auth/RedirectIfAuth';

// Component Imports
import Layout from './assets/components/layout/Layout';
import Unauthorized from './assets/components/subcomponents/Unauthorized';
import Register from './assets/components/subcomponents/Register';
import Login from './assets/components/subcomponents/Login';
import Dashboard from './assets/components/Dashboard/Dashboard';
import Posts from './assets/components/posts/Posts';
import Network from './assets/components/network/Network';
import Profile from './assets/components/profile/Profile';
import EditProfile from './assets/components/profile/EditProfile'
import NotFound from './assets/components/subcomponents/NotFound';

// Context Imports
import ThemeContext from './assets/context/ThemeContext';
import useAuth from './auth/useAuth';
import { ProfileProvider } from './assets/context/ProfileContext';

function App() {

  const { darkMode } = useContext(ThemeContext);
  const { auth } = useAuth();

  return (
    <main className='w-full min-h-screen' data-theme={darkMode ? "dim" : "nord"}>
      <div className='max-w-[2000px] mx-auto min-h-screen px-2 py-6 bg-base-200'>
        <Routes>
          <Route path="*" element={<NotFound />} />   
          <Route path='*' element={<Navigate to='/' replace />} />
          <Route path='/unauthorized' element={<Unauthorized />} />

          <Route element={<PersistLogin />}>
            <Route element={<RedirectIfAuth />}>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Route>
          </Route>

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={['owner', 'admin', 'moderator', 'user']} />}>
              <Route element={<Layout />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<Navigate to={`/profile/${auth?.username}`} />} />
                <Route path="/profile/:username" element={<ProfileProvider />}>
                  <Route index element={<Profile />} />
                  <Route path="edit" element={<EditProfile />} />
                </Route>
                {/* <Route path='/blogs' element={<Posts />} /> ~~ To be updated with a new feature ~~*/}
                <Route path='/network' element={<Network />} />
              </Route>
            </Route>
          </Route>
          {/* End Protected Routes */}

        </Routes>
      </div>
    </main>
  )
}

export default App
