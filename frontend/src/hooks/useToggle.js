import React from 'react';
import { Container, Typography, Box, Paper, Button, Collapse } from '@mui/material';
import { Input } from '../components/common';
import InfoIcon from '@mui/icons-material/Info';
import useToggle from '../hooks/useToggle';

const AboutUs = () => {
  const [showFAQ, toggleFAQ] = useToggle(false);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          About AirWings
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          AirWings is dedicated to providing the best travel experience with comfort, safety, and reliability. Our team is passionate about making your journey smooth and memorable.
        </Typography>
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
          <Input label="Ask us anything" name="about-question" startIcon={<InfoIcon />} placeholder="Type your question..." fullWidth />
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="outlined" onClick={toggleFAQ}>
            {showFAQ ? 'Hide FAQ' : 'Show FAQ'}
          </Button>
          <Collapse in={showFAQ}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Frequently Asked Questions
              </Typography>
              <Typography variant="body2">
                <strong>Q:</strong> How do I book a flight?<br />
                <strong>A:</strong> Use our search tool above to find and book flights easily!
              </Typography>
            </Box>
          </Collapse>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutUs;
	 	  	      	 		 	   	       	 	
