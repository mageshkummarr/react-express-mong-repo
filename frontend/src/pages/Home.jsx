
import { Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to AirWings
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Book your next adventure with ease! Discover the world with AirWings, your trusted airline for comfort, safety, and reliability.
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Why Choose AirWings?
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><FlightTakeoffIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Modern, comfortable aircraft" />
          </ListItem>
          <ListItem>
            <ListItemIcon><FlightTakeoffIcon color="primary" /></ListItemIcon>
            <ListItemText primary="24/7 customer support" />
          </ListItem>
          <ListItem>
            <ListItemIcon><FlightTakeoffIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Easy online booking and management" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Home;
