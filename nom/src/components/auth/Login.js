import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',  
        password: ''
    });
    const [error, setError] = useState('');  
    const navigate = useNavigate();  

    const handleChange = (event) => {
        const { name, value } = event.target;  
        setCredentials(prev => ({
            ...prev,
            [name]: value  
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();  
        
        fetch('http://127.0.0.1:5000/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials) 
        })
        .then(response => response.json())  
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('userId', data.userId);  
                navigate('/');  
            } else {
                setError(data.message || 'Invalid username or password');  
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            setError('Failed to connect to the server.');  
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username or Email"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    {error && <Alert severity="error">{error}</Alert>} 
                </Box>
            </Box>
        </Container>
    );
};

export default Login;