import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import ViewFlights from "../pages/ViewAllFlights"
import EditFlight from "../pages/EditFlight"
import DeleteFlight from "../pages/DeleteFlightPage"
import AddFlight from '../pages/AddFlightPage';
import UnauthorizedPage from "../pages/UnauthorizedPage";
import ViewAllBookings from '../pages/ViewAllBookings';
// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const FlightSearch = lazy(() => import('../pages/FlightSearch'));
// const ViewFlights = lazy(() => import('../pages/ViewAllFlights'));
// const UpdateFlights = lazy(() => import('../pages/EditFlight'));

const AboutUs = lazy(() => import('../pages/AboutUs'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NestedDemo = lazy(() => import('../pages/FlightTips'));
const Login = lazy(() => import('../pages/Login'));
const Booking = lazy(() => import('../pages/Booking'));

const routes = [
  {
    path: '/',
    element: <ProtectedRoute><Home /></ProtectedRoute>,
    index: true,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
  path: 'unauthorized',
  element: <UnauthorizedPage />,
  },
  {
    path: 'search-flight',
    element: <ProtectedRoute><FlightSearch /></ProtectedRoute>,
    children: [
      {
        path: 'demo',
        element: <NestedDemo />,
      },
    ],
  },
    {
    path: 'view-all-bookings',
    element: <ProtectedRoute requiredRole="admin"><ViewAllBookings /></ProtectedRoute>,
  },
  {
    path: 'flights',
    element: <ProtectedRoute requiredRole="admin"><ViewFlights /></ProtectedRoute>,
  },
   {
    path: 'updateFlight/:id',
    element: <ProtectedRoute requiredRole="admin">< EditFlight/></ProtectedRoute>,
  },
   {
    path: 'deleteFlight/:id',
    element: <ProtectedRoute requiredRole="admin">< DeleteFlight/></ProtectedRoute>,
  },
   {
    path: 'addFlight',
    element: <ProtectedRoute requiredRole="admin">< AddFlight/></ProtectedRoute>,
  },
  {
    path: 'about',
    element: <ProtectedRoute><AboutUs /></ProtectedRoute>,
  },
  {
    path: 'contact',
    element: <ProtectedRoute><ContactPage /></ProtectedRoute>,
  },
  {
    path: 'booking',
    element: <ProtectedRoute><Booking /></ProtectedRoute>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />, 
  },
];

export default routes;
