import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './lib/context/AuthContext';
import '../src/assets/styles/styles.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <BrowserRouter>
          <ScrollToTop>
            <App />
            </ScrollToTop>
          </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
