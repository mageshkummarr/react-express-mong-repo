import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { BookingProvider } from './context/BookingContext';
import routes from './routes';

function App() {
  const routing = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: routes,
    },
  ]);

  return (
    <ErrorBoundary>
      <BookingProvider>
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          {routing}
        </Suspense>
      </BookingProvider>
    </ErrorBoundary>
  );
}

export default App;
