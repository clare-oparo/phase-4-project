import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();  // Initialize navigate function

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
        // Here, you would typically handle the API call for registration
        console.log('Submitted Data:', formData);

        // Simulate successful registration:
        // Set the registration success state
        setSuccess('Registration Successful! Redirecting to login...');
        setError('');

        // Simulate API response delay and redirect
        setTimeout(() => {
            navigate('/login');  // Redirect to the login page after registration
        }, 2000);  // Redirect after 2 seconds

        // Clear form data (optional)
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
