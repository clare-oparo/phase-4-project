import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/auth/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/Profile';
import ProfileView from './components/ProfileView'; 

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/profile-view" element={<ProfileView />} />
                
                
                {/* other routes */}
            </Routes>
        </Router>
    );
}

export default App;
