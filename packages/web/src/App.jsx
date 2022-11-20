import './App.css';
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useLocalStorage } from './hooks/useLocalStorage';
import Signup from './modules/auth/signup/step1/step1';
import Signuptwo from './modules/auth/signup/step2/step2';
import Signin from './modules/auth/login/login';
import ProfileScreen from './pages/profile/profileScreen';
import ChangePassword from './pages/profile/ChangePassword';
import DeleteAccount from './pages/profile/DeleteAccount';
import ConfirmDeleteAccount from './pages/profile/ConfirmDeleteAccount';
import Forgotpassword from './modules/auth/forgot-password/forgot';
import ResetLink from './modules/auth/reset-password/reset';
import FaqMain from './components/Faq/faq_main';
import TermsOfUse from './modules/static/terms_of_use';
import Testimonial from './modules/static/testimonials/Testimonial';
import Ratings from './modules/static/testimonials/Ratings';
import DashboardLayout from './components/DashboardLayout';
import NewsletterPage from './modules/static/newsletter/NewsletterPage';
import { HomePage, History, Correction, ConversationPage, LandingPage, LegalPage, Settings } from './pages';
import Careers from './pages/career/Career';
import Roles from './pages/career/Roles';
import Application from './pages/career/Application';
import ApiStatus from './pages/api-status/api-status';

// All routes/pages must be import from ./pages folder
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ConversationPage />} />
      <Route path="/history" element={<h2>History</h2>} />
      <Route path="/gritty-grammar" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/correction" element={<Correction />} />
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="/faq" element={<FaqMain />} />
      <Route path="/blog" element={<h1>Blog Page</h1>} />
      <Route path="contact" element={<h1>Contact Page</h1>} />
      <Route path="/newsletter" element={<NewsletterPage />} />
      <Route path="/career" element={<Careers />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/apply" element={<Application />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/testimonials" element={<Testimonial />} />
      <Route path="/ratings" element={<Ratings />} />
      <Route path="/api-status" element={<h1>Api status Page</h1>} />
      <Route path="/legal" element={<LegalPage />} />
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
          path="profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route path="profile/changepassword" element={<ChangePassword />} />
        <Route path="profile/deleteaccount" element={<DeleteAccount />} />
        <Route path="profile/deleteaccount-step2" element={<ConfirmDeleteAccount />} />
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
              <Settings />
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
