// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Button, Badge,
  Avatar, Menu, MenuItem, ListItemIcon, Divider, Snackbar, Alert
} from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import '../styles/Navbar.css';

import { signout } from '../features/auth/authSlice';
import { getCustomerIdFromToken, getJwtPayload } from "../utils/jwt";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [snackOpen, setSnackOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);

  // auth state
  const { user, token } = useSelector(s => s.auth);

  useEffect(() => {
    const isHome = pathname === '/';
    const onScroll = () => setScrolled(!isHome || window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const payload = token ? getJwtPayload(token) : null;

  const initial = (
    (user?.firstName?.[0]) ||
    (user?.name?.[0]) ||
    (user?.email?.[0]) ||
    (payload?.firstName?.[0]) ||
    (payload?.name?.[0]) ||
    (payload?.email?.[0]) ||
    ''
  ).toUpperCase();

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    handleCloseMenu();
    dispatch(signout());
    setSnackOpen(true);   
    setTimeout(() => {
      navigate('/auth/login');   
    }, 1200);
  };

  const goProfile = () => {
    handleCloseMenu();
    const id = getCustomerIdFromToken();
    if (id) {
      navigate(`/user-profile/${id}`);
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Toolbar className="navbar-toolbar">
          <Typography variant="h6" className="navbar-logo" component={NavLink} to="/" end>
            Spice Junction
          </Typography>

          <Box className="navbar-links">
            <Button component={NavLink} to="/" end className="nav-link">
              HOME
            </Button>
            <Button component={NavLink} to="/pages" className="nav-link">
              PAGES
            </Button>
            <Button component={NavLink} to="/blog" className="nav-link">
              BLOG
            </Button>
          </Box>

          <Box className="navbar-icons">
            <IconButton component={NavLink} to="/cart" aria-label="Cart">
              <Badge badgeContent={cartCount} color="error" overlap="circular" showZero={false}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {token ? (
              <>
                <IconButton onClick={handleAvatarClick} aria-label="Account menu">
                  <Avatar sx={{ width: 28, height: 28, fontSize: 14 }}>
                    {initial || <AccountCircleIcon fontSize="small" />}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={goProfile}>
                    <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton component={NavLink} to="/auth/login" aria-label="Account">
                <AccountCircleIcon />
              </IconButton>
            )}

            <IconButton aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          variant="filled"
          elevation={6}
        >
          Logged out successfully 
        </Alert>
      </Snackbar>
    </>
  );
}
