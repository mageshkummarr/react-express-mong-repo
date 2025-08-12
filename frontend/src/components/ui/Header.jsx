import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = Cookies.get('role'); // direct access ensures latest value

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Cookies.remove('role');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          Airwings Airlines
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>

          {role === 'user' && (
            <>
              <Button color="inherit" component={Link} to="/search-flight">Search Flights</Button>
            </>
          )}

          {role === 'admin' && (
            <>
              <Button color="inherit" component={Link} to="/flights">Manage Flights</Button>
              <Button color="inherit" component={Link} to="/view-all-bookings">Manage Bookings</Button>
              <Button color="inherit" component={Link} to="/search-flight">Search Flights</Button>
            </>
          )}

          {/* Common for all */}
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>

          {auth ? (
            <>
              <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                {auth.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
