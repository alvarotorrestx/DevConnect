import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import RequireAuth from './auth/RequireAuth';
import PersistLogin from './auth/PersistLogin';
import RedirectIfAuth from './auth/RedirectIfAuth';

// Component Imports
import NavBar from './assets/components/layout/NavBar';
import Unauthorized from './assets/components/subcomponents/Unauthorized';
import Register from './assets/components/subcomponents/Register';
import Login from './assets/components/subcomponents/Login';
import Dashboard from './assets/components/Dashboard';

// Context Imports
import ThemeContext from './assets/context/ThemeContext';
import TesterComponent from './assets/components/TesterComponent';

function App() {

  const { darkMode } = useContext(ThemeContext);

  return (
    <main className='w-full min-h-screen' data-theme={darkMode ? "dim" : "nord"}>
      <div className='max-w-[2000px] mx-auto min-h-screen px-2 py-6 bg-base-200'>
        {/* <NavBar /> */}
        <Routes>
          {/* <Route path='*' element={<NotFound />} /> */}
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
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/tester' element={<TesterComponent />} />
            </Route>
          </Route>
          {/* End Protected Routes */}

        </Routes>
      </div>
    </main>
  )
}

export default App
