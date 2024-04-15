import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to Nom!
            </Typography>
            <Typography variant="subtitle1">
                Share and discover amazing recipes!
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/register" sx={{ mt: 2, mx: 2 }}>
                Register
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/login" sx={{ mt: 2, mx: 2 }}>
                Login
            </Button>
        </Box>
    );
}

export default Home;
