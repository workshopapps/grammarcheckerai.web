// import * as atatus from 'atatus-spa';
// atatus.config('5544d2e513804154b2abb55f9655d323').install();
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './lib/context/AuthContext';
import '../src/assets/styles/styles.scss';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import DarkThemeContext from './lib/context/DarkThemeContext';
const queryClient = new QueryClient();

// Set tracesSampleRate to 1.0 to capture 100%
// of transactions for performance monitoring.
// We recommend adjusting this value in production

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkThemeContext>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop>
              <App />
            </ScrollToTop>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </DarkThemeContext>
  </React.StrictMode>,
);
