import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from 'react-toast-notifications';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider autoDismiss autoDismissTimeout={6000} placement="top-right">
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
