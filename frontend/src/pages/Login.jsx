import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  Grid
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { login } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await login(email, password);
      setAuth(userData);
      // Navigate to home page after successful login
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Network error');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <FlightTakeoffIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h4" component="h1" color="primary.main" fontWeight="bold">
            AirWings Airlines
          </Typography>
        </Box>
        <Typography variant="h3" align="center" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Enter your credentials to access your account and book your next adventure
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
            {error}
          </Alert>
        )}

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                startIcon={<FlightTakeoffIcon />}
              >
                Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
