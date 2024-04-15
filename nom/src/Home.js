import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="div">
        Welcome to Nom!
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a community for cooking enthusiasts to share and explore recipes from around the world.
        Feel free to post your own recipes and comment on others' to exchange cooking tips and ideas!
      </Typography>
    </Box>
  );
}

export default Home;
