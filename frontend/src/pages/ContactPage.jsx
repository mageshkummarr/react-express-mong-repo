import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Box,
  Divider,
} from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import { Input } from '../components/common';

const ContactPage = () => {
  return (
    <Container maxWidth={false} sx={{ py: 6, px: { xs: 1, sm: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1100 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          We'd love to hear from you
        </Typography>
        <Grid container spacing={2} alignItems="stretch" direction="row" sx={{ height: { xs: 'auto', md: '500px' } }}>
          {/* Contact Info Section */}
          <Grid item xs={12} md={6} order={1} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Get in Touch
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <LocationOn />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">Headquarters</Typography>
                  <Typography variant="body2">123 Aviation Way</Typography>
                  <Typography variant="body2">New York, NY 10001</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Phone />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">Phone</Typography>
                  <Typography variant="body2">(555) 123-4567</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Email />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">Email</Typography>
                  <Typography variant="body2">info@airwings.com</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form Section */}	 	  	      	 		 	   	       	 	
          <Grid item xs={12} md={6} order={2} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                maxWidth: 500,
                ml: 'auto',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Send Us a Message
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2} direction="column">
                  <Grid item xs={12}>
                    <Input
                      label="Your Name"
                      name="name"
                      fullWidth
                      placeholder="Enter your name"
                      className="mb-3"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      label="Email Address"
                      name="email"
                      fullWidth
                      placeholder="Enter your email"
                      className="mb-3"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      label="Subject"
                      name="subject"
                      fullWidth
                      placeholder="Subject"
                      className="mb-3"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      label="Message"
                      name="message"
                      fullWidth
                      placeholder="Type your message..."
                      multiline
                      rows={4}	 	  	      	 		 	   	       	 	
                      className="mb-3"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      endIcon={<Send />}
                      size="large"
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {/* Info Section Instead of Map */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Why Choose AirWings?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom>Trusted Airline</Typography>
                <Typography variant="body1">Over 1 million happy customers fly with us every year, enjoying safe and comfortable journeys worldwide.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom>24/7 Customer Support</Typography>
                <Typography variant="body1">Our dedicated support team is available around the clock to assist you with bookings, changes, and questions.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom>Best Price Guarantee</Typography>
                <Typography variant="body1">We offer competitive fares and exclusive deals, ensuring you get the best value for your travel experience.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPage;
	 	  	      	 		 	   	       	 	
