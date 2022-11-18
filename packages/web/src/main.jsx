import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from 'react-toast-notifications';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: 'about',
//     element: <div>About</div>,
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <div>
          <h3>Root</h3>
          <Outlet />
        </div>
      }
    >
      <Route path="contact" element={<App />} />
      <Route
        path="dashboard"
        element={<App />}
        loader={({ request }) =>
          fetch('/api/dashboard.json', {
            signal: request.signal,
          })
        }
      />
      <Route
        element={
          <div>
            <h2>Omom</h2>
            <Outlet />
          </div>
        }
      >
        <Route path="login" element={<h2>Omo</h2>} />
        <Route path="logout" />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider autoDismiss autoDismissTimeout={6000} placement="top-right">
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
