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

import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://18c4ae39884c459bb8e1ce9aba19be30@o4504276798144512.ingest.sentry.io/4504276833730560",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


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
