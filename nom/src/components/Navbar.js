import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} component={RouterLink} to="/">Home</MenuItem>
                    <MenuItem onClick={handleClose} component={RouterLink} to="/login">Login</MenuItem>
                    <MenuItem onClick={handleClose} component={RouterLink} to="/register">Register</MenuItem>
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Nom
                </Typography>
                <Button color="inherit" component={RouterLink} to="/">Home</Button>
                <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                <Button color="inherit" component={RouterLink} to="/register">Register</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
