import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        navigate(`/search?query=${search}`);
        setSearch('');  // Clear search input
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #FFA726 30%, #FFCA28 90%)' }}>
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
                <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    Nom
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Find a recipe or ingredient"

                    sx={{ mr: 2, width: '40%', bgcolor: 'white', borderRadius: '20px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none' // Remove border
                        },
                        '&:hover fieldset': {
                            border: 'none' // Remove border on hover
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none' // Remove border on focus
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none' // Remove outline
                        }
                        }  }}
                    
                />

                <IconButton onClick={handleSearch} sx={{ color: 'white' }}>
                    <SearchIcon /> {/* SearchIcon is here */}
                </IconButton>
                 {/* Avatar component for user's profile icon */}
               
                <Button color="inherit" component={RouterLink} to="/" sx={{ color: 'white' }}>Home</Button>
                <Button color="inherit" component={RouterLink} to="/login" sx={{ color: 'white' }}>Login</Button>
                <Button color="inherit" component={RouterLink} to="/register" sx={{ color: 'white' }}>Register</Button>
                <Avatar alt="User Avatar" src="example.jpg" sx={{ bgcolor: 'secondary.main', ml: 2 }} />
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
