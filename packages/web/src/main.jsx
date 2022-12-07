import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './lib/context/AuthContext';
import '../src/assets/styles/styles.scss';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import DarkThemeContext from './lib/context/DarkThemeContext';
const queryClient = new QueryClient();

Sentry.init({
  dsn: "https://eb5a4621222c42e8aedef7a84bce3274@o4504282991689728.ingest.sentry.io/4504283027734528",
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

