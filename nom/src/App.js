import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/auth/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                
                {/* other routes */}
            </Routes>
        </Router>
    );
}

export default App;
