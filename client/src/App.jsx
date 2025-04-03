import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Component Imports
import NavBar from './assets/components/layout/NavBar'
import Unauthorized from './assets/components/subcomponents/Unauthorized'
import RequireAuth from './auth/RequireAuth'
import Register from './assets/components/subcomponents/Register';
import Login from './assets/components/subcomponents/Login';
import Dashboard from './assets/components/Dashboard';

// Context Imports
import ThemeContext from './assets/context/ThemeContext';

function App() {

  const { darkMode } = useContext(ThemeContext);

  return (
    <main className='w-full min-h-screen' data-theme={darkMode ? "dim" : "nord"}>
      <div className='max-w-[2000px] mx-auto min-h-screen px-2 py-6 bg-base-200'>
        {/* <NavBar /> */}
        <Routes>
          {/* <Route path='*' element={<NotFound />} /> */}
          <Route path='/' element={<Register />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth allowedRoles={['owner', 'admin', 'moderator', 'user']} />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          {/* End Protected Routes */}

        </Routes>
      </div>
    </main>
  )
}

export default App
