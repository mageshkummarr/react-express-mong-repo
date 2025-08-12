import { Container, Box } from '@mui/material';
import Header from '../components/ui/Header';  // Updated path
import Footer from '../components/ui/Footer';  // Updated path
import { Outlet, useLocation } from 'react-router-dom';     // Import Outlet and useLocation

const MainLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isLoginPage && <Header />}
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">
          <Outlet />  {/* This will render the matched route component */}
        </Container>
      </Box>
      {!isLoginPage && <Footer />}
    </Box>
  );
};

export default MainLayout;
