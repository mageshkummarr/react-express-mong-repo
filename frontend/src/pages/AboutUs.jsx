import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Input } from '../components/common';
import InfoIcon from '@mui/icons-material/Info';

const AboutUs = () => {
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
      </Paper>
    </Container>
  );
};

export default AboutUs;
