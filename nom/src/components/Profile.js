import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Input = styled('input')({
    display: 'none',
});

const Profile = () => {
    const [profileData, setProfileData] = useState({
        bio: '',
        favorite_food: '',
        profilePic: null
    });
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');  // Retrieve the user ID from session storage

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        setProfileData(prev => ({
            ...prev,
            profilePic: event.target.files[0]
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('bio', profileData.bio);
        formData.append('favorite_food', profileData.favorite_food);
        if (profileData.profilePic) {
            formData.append('profilePic', profileData.profilePic, profileData.profilePic.name);
        }

        // Submit the profile data to the server
        fetch(`http://127.0.0.1:5000/users/${userId}/profile`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',  // Include cookies in the request for session handling
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate('/dashboard');  // Redirect to the dashboard after successful profile update
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Update Your Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Avatar src={profileData.profilePic ? URL.createObjectURL(profileData.profilePic) : null} sx={{ width: 90, height: 90 }}/>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" type="file" onChange={handleFileChange}/>
                            <Button variant="contained" component="span">
                                Upload Picture
                            </Button>
                        </label>
                    </Stack>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="bio"
                        label="Bio"
                        type="text"
                        value={profileData.bio}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="favorite_food"
                        label="Favorite Food"
                        type="text"
                        value={profileData.favorite_food}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save Profile
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;
