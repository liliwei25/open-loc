import './index.css';
import './i18n';

import { Notifications } from '@mantine/notifications';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { AuthRoute } from './components/routes/AuthRoute.tsx';
import { ProtectedRoute } from './components/routes/ProtectedRoute.tsx';
import { UnprotectedRoute } from './components/routes/UnprotectedRoute.tsx';
import { RoutePath } from './constants/routePath.ts';
import { Dashboard } from './pages/Dashboard.tsx';
import { Login } from './pages/Login.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { authLoader } from './utils/loaders/authLoader.ts';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthRoute />} loader={authLoader}>
      <Route element={<UnprotectedRoute />}>
        <Route path={RoutePath.Login} element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={RoutePath.Dashboard} element={<Dashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Notifications position="top-center" />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
