import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

interface AppProps {}

function App({}: AppProps) {
  const [username, setUsername] = useState<string | null>(null); // Shared state for username

  const handleLogout = (): void => {
    setUsername(null); // Clear username
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home username={username} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App; 