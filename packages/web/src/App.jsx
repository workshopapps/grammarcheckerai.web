import './App.css';
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useLocalStorage } from './hooks/useLocalStorage';
import Signup from './modules/auth/signup/step1/step1';
import Signuptwo from './modules/auth/signup/step2/step2';
import Signin from './modules/auth/login/login';
import Forgotpassword from './modules/auth/forgot-password/forgot';
import ResetLink from './modules/auth/reset-password/reset';
import TermsOfUse from './modules/static/terms_of_use';
import DashboardLayout from './components/DashboardLayout';
import { HomePage, History, Correction, ConversationPage, LandingPage } from './pages';


import {LandingPage} from './pages';
// All routes/pages must be import from ./pages folder
const router = createBrowserRouter( 
  createRoutesFromElements(
    <>
      <Route path="/" element={<ConversationPage />} />
      <Route path="/history" element={<h2>History</h2>} />
      <Route path="/gritty-grammar" element={<LandingPage/>} /> 
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
            <Outlet />
          </div>
        }
      >
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} exact />
        <Route path="signup/step-two" element={<Signuptwo />} />
        <Route path="forgot-password" element={<Forgotpassword />} />
        <Route path="reset-password" element={<ResetLink />} />
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
        <Route path="history/correction" element={<Correction />} />

        <Route
          path="import"
          element={
            <ProtectedRoute>
              <h1>Quick Transcribe/import Page</h1>
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
  const [demoData, setDemoData] = useLocalStorage('demoData', '');
  useEffect(() => {
    setDemoData('demo');
  }, []);
  console.log(demoData);
  return <RouterProvider router={router} />;
}

export default App;
