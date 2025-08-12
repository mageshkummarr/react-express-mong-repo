import React from 'react';
import { Box, Typography } from '@mui/material';

const NestedDemo = () => {
  return (
    <Box sx={{ p: 4, background: '#f0f0f0', borderRadius: 2, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Flight Booking Tips
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Here are some tips to help you book the best flight:
      </Typography>
      <ul>
        <li>Compare prices across different dates and times for the best deals.</li>
        <li>Book early to secure your preferred seat and fare.</li>
        <li>Check baggage policies and in-flight amenities before booking.</li>
        <li>Sign up for airline newsletters to receive special offers.</li>
        <li>Double-check your travel documents and visa requirements.</li>
      </ul>
    </Box>
  );
};

export default NestedDemo;
