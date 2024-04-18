import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/auth/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SearchResults from "./components/SearchResults";
import Footer from './components/Footer';
import RecipePage from './components/RecipePage';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/recipes/:recipeId" element={<RecipePage />} />
                
                {/* other routes */}
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
