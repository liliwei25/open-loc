import './index.css';

import { MantineProvider } from '@mantine/core';
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

import { AuthLayout } from './components/layouts/AuthLayout.tsx';
import { ProtectedLayout } from './components/layouts/ProtectedLayout.tsx';
import { RoutePath } from './constants/routePath.ts';
import { Dashboard } from './pages/Dashboard.tsx';
import { Login } from './pages/Login.tsx';
import { authLoader } from './utils/loaders/authLoader.ts';

const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} loader={authLoader}>
      <Route path={RoutePath.Login} element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path={RoutePath.Dashboard} element={<Dashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="top-center" />
        <RouterProvider router={router} />
      </MantineProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
