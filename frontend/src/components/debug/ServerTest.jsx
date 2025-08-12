import { useState } from 'react';
import { Button, Paper, Typography, Box, Alert } from '@mui/material';

const ServerTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, status, details) => {
    setTestResults(prev => [...prev, { test, status, details, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testEndpoints = async () => {
    setLoading(true);
    setTestResults([]);

    // Test 1: Basic server connection
    try {
      const response = await fetch('/api/flights/all', {
        method: 'GET',
        credentials: 'include'
      });
      const text = await response.text();
      addResult('GET /api/flights/all', response.status, `Response: ${text.substring(0, 200)}...`);
    } catch (err) {
      addResult('GET /api/flights/all', 'ERROR', err.message);
    }

    // Test 2: Flight search endpoint
    try {
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ from: 'New York', to: 'London', date: '2024-12-25' })
      });
      const text = await response.text();
      addResult('POST /api/flights/search', response.status, `Response: ${text.substring(0, 200)}...`);
    } catch (err) {
      addResult('POST /api/flights/search', 'ERROR', err.message);
    }

    // Test 3: Auth check
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include'
      });
      const text = await response.text();
      addResult('GET /api/auth/me', response.status, `Response: ${text.substring(0, 200)}...`);
    } catch (err) {
      addResult('GET /api/auth/me', 'ERROR', err.message);
    }

    // Test 4: Basic server health
    try {
      const response = await fetch('/', {
        method: 'GET'
      });
      const text = await response.text();
      addResult('GET /', response.status, `Response: ${text.substring(0, 200)}...`);
    } catch (err) {
      addResult('GET /', 'ERROR', err.message);
    }

    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Server Connection Test
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testEndpoints} 
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? 'Testing...' : 'Test Server Endpoints'}
      </Button>

      {testResults.map((result, index) => (
        <Alert 
          key={index}
          severity={result.status === 'ERROR' ? 'error' : result.status === 200 ? 'success' : 'warning'}
          sx={{ mb: 1 }}
        >
          <Typography variant="body2">
            <strong>{result.timestamp}</strong> - {result.test}
          </Typography>
          <Typography variant="body2">
            Status: {result.status}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8em', mt: 1 }}>
            {result.details}
          </Typography>
        </Alert>
      ))}
    </Paper>
  );
};

export default ServerTest;
