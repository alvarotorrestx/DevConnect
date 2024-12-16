import { useContext } from 'react'
import './App.css'

// Component Imports
import NavBar from './assets/components/layout/NavBar'

// Context Imports
import ThemeContext from './assets/context/ThemeContext';
import Register from './assets/components/subcomponents/Register';

function App() {

  const { darkMode } = useContext(ThemeContext);

  return (
    <main className='w-full min-h-screen' data-theme={darkMode ? "dim" : "nord"}>
      <div className='max-w-[2000px] mx-auto min-h-screen px-2 py-4 bg-base-200'>
        {/* <NavBar /> */}
        <Register />
      </div>
    </main>
  )
}

export default App
