import { 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  Divider,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              AirWings Airlines
            </Typography>
            <Typography variant="body1">
              Your trusted partner for comfortable and affordable air travel.
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <MuiLink component={Link} to="/flights" color="inherit" display="block">Book a Flight</MuiLink>
            <MuiLink component={Link} to="/about" color="inherit" display="block">About Us</MuiLink>
            <MuiLink component={Link} to="/contact" color="inherit" display="block">Contact Us</MuiLink>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>Contact</Typography>
            <Typography>123 Aviation Way</Typography>
            <Typography>New York, NY 10001</Typography>
            <Typography>Phone: (555) 123-4567</Typography>
            <Typography>Email: info@airwings.com</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
        <Typography align="center">
          © {new Date().getFullYear()} AirWings Airlines. All rights reserved
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;	 	  	      	 		 	   	       	 	
