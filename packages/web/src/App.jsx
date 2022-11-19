import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TermsOfUse from './modules/static/terms_of_use';
import DashboardLayout from './components/DashboardLayout';
import { HomePage, History, Correction } from './pages';
import TranscribePage from './pages/transcribe';

// All routes/pages must be import from ./pages folder
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<h1>Will redirect to Landing Pages / Conversation Page</h1>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/history" element={<History />} />
      <Route path="/correction" element={<Correction />} />
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="/faq" element={<h1>FAQ Page</h1>} />
      <Route path="/blog" element={<h1>Blog Page</h1>} />
      <Route path="contact" element={<h1>Contact Page</h1>} />
      <Route path="/newsletter" element={<h1>NewsLetter Page</h1>} />
      <Route path="/culture-career" element={<h1>Culture Page</h1>} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/api-status" element={<h1>Api status Page</h1>} />
      <Route
        element={
          <div>
            <h2>AuthLayout</h2>
            <Outlet />
          </div>
        }
      >
        <Route path="signin" element={<h2>Signin Page</h2>} />
        <Route path="signup" element={<h2>Logout Page</h2>} />
        <Route path="forgot-password" element={<h2>Forgot Password Page</h2>} />
      </Route>
      <Route path="/me" element={<DashboardLayout />}>
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="import"
          element={
            <ProtectedRoute>
              <TranscribePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <h1>Settings Page</h1>
            </ProtectedRoute>
          }
        />
      </Route>
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
