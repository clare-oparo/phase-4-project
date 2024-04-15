import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required')
});

const Login = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    return (
        <Box sx={{ mt: 8, mx: "auto", width: 300, padding: 2, border: '1px solid #ccc', borderRadius: '5px' }}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    fetch('http://localhost:5000/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            navigate('/dashboard');  
                        } else {
                            setLoginError('Invalid username or password');  
                        }
                        setSubmitting(false);
                    })
                    .catch(error => {
                        console.error('Login error:', error);
                        setSubmitting(false);
                        setLoginError('Network error. Please try again later.');  
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
                            {isSubmitting ? <CircularProgress size={24} /> : 'Log In'}
                        </Button>
                        {loginError && <Alert severity="error" sx={{ mt: 2 }}>
                            {loginError}
                        </Alert>}
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default Login;
