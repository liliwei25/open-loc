import './index.css';
import './i18n';

import { Notifications } from '@mantine/notifications';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
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

const router = createHashRouter(
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
      <ThemeProvider>
        <Notifications position="top-center" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
