import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';

const ProfileView = () => {
    const [profile, setProfile] = useState({
        bio: '',
        favorite_food: '',
        profilePic: null
    });
    const userId = sessionStorage.getItem('userId'); 

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/users/${userId}/profile`, {
            credentials: 'include', 
        })
        .then(response => response.json())
        .then(data => {
            setProfile({
                bio: data.bio,
                favorite_food: data.favorite_food,
                profilePic: data.profile_picture
            });
        })
        .catch(error => {
            console.error('Error loading profile:', error);
        });
    }, [userId]);

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Your Profile
                </Typography>
                <Avatar src={profile.profilePic} sx={{ width: 90, height: 90 }}/>
                <Typography variant="h6" gutterBottom>
                    Bio
                </Typography>
                <Typography>{profile.bio}</Typography>
                <Typography variant="h6" gutterBottom>
                    Favorite Food
                </Typography>
                <Typography>{profile.favorite_food}</Typography>
            </Box>
        </Container>
    );
};

export default ProfileView;
