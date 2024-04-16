import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';  

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        
        console.log('Submitted Data:', formData);

        // POST request to backend
        fetch('http://127.0.0.1:5000/register', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setSuccess('Registration Successful! Redirecting to login...');
                setError('');
                setTimeout(() => {
                    navigate('/login'); 
                }, 2000);  
            } else {
                setError(data.message || 'Registration failed');
                setSuccess('');
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            setError('Failed to connect to the server.');
            setSuccess('');
        });

    
        setFormData({
            username: '',
            email: '',
            password: ''
        });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                   
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Preferred Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
