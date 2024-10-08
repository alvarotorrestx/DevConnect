import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';

// Component Imports
import NavBar from './assets/components/layout/NavBar';

// Context Imports
import ThemeContext from './assets/context/ThemeContext';
import LoginPage from './assets/pages/LoginPage';
import SignPage from './assets/pages/SignPage';

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Router>
      <main className='w-full min-h-screen' data-theme={darkMode ? "dim" : "nord"}>
        <div className='max-w-[2000px] mx-auto min-h-screen px-2 py-4 bg-base-200'>
          <NavBar />
          <Routes>
            <Route path="/" element={<SignPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign" element={<SignPage />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
