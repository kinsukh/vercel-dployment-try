import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Home from './components/Home';
import { setClientToken } from './spotify';

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    const _token = hash.split("&")[0].split("=")[1];
    setToken(_token);
    setClientToken(_token);
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/dashboard/*" element={<Home token={token} setToken={setToken}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
