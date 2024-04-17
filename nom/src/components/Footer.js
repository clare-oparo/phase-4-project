import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #FFA726 30%, #FFCA28 90%)' }}>
            <Toolbar>
                <Typography variant="body1" color="inherit" align="center" sx={{ flexGrow: 1 }}>
                    © {new Date().getFullYear()} Nom. All rights reserved.
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
