import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required')
});

const Register = () => {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState('');

    return (
        <Box sx={{ mt: 4, mx: "auto", width: 300, padding: 2, border: '1px solid #ccc', borderRadius: '5px' }}>
            <Typography variant="h5" gutterBottom>
                Register
            </Typography>
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                validationSchema={RegistrationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    fetch('http://localhost:5000/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            navigate('/login');  
                        } else {
                            setSubmitError(data.message || 'Registration failed. Please try again.'); // Show error message from server
                        }
                        setSubmitting(false);
                    })
                    .catch(error => {
                        console.error('Registration error:', error);
                        setSubmitting(false);
                        setSubmitError('Network error. Please try again later.');  // Network error fallback
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            component={TextField}
                            name="username"
                            label="Username"
                            fullWidth
                            margin="normal"
                        />
                        <Field
                            component={TextField}
                            name="email"
                            type="email"
                            label="Email"
                            fullWidth
                            margin="normal"
                        />
                        <Field
                            component={TextField}
                            name="password"
                            type="password"
                            label="Password"
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
                        </Button>
                        {submitError && <Alert severity="error">{submitError}</Alert>}
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default Register;
