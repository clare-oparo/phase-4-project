import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Avatar, Stack, Chip } from '@mui/material';
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
        // Handle the submission logic here
        console.log('Profile Data:', profileData);
        // navigate to another route if needed
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Complete Your Profile
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={profileData.profilePic ? URL.createObjectURL(profileData.profilePic) : null} sx={{ width: 56, height: 56 }}/>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange}/>
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                    </Stack>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="bio"
                        label="Bio"
                        type="text"
                        id="bio"
                        autoComplete="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="interests"
                        label="What is your favorite food?"
                        type="text"
                        id="favorite_food"
                        autoComplete="favorite food"
                        value={profileData.interests}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save Profile
                    </Button>
                    <Chip label="Follow Chefs" onClick={() => navigate('/explore-chefs')} variant="outlined" sx={{ mt: 2 }} />
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;
