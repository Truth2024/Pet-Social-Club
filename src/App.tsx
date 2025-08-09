import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
//PAGES
import { HomePage } from './pages/HomePage';
//COMPONENTS
import { Layout } from './components/Layout';
import { Spinner } from './ui/Spiner';
import { AuthProvider, useAuth } from './components/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

const LazyProfile = React.lazy(() => import('./pages/ProfilePage'));
const LazyMessage = React.lazy(() => import('./pages/MessagePage'));
const LazyPeople = React.lazy(() => import('./pages/PeoplePage'));
const LazyUser = React.lazy(() => import('./pages/UserPage'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // общий layout (шапка, меню)
    // errorElement: <NotFound />, // обработка ошибок роутинга
    children: [
      { index: true, element: <HomePage /> }, // домашняя страница (index)
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<Spinner />}>
              <LazyProfile />
            </React.Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'messages',
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<Spinner />}>
              <LazyMessage />
            </React.Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'people',
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyPeople />
          </React.Suspense>
        ),
      },
      {
        path: 'people/:uid',
        element: (
          <React.Suspense fallback={<Spinner />}>
            <LazyUser />
          </React.Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
