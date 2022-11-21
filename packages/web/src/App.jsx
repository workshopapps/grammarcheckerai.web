import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import Blog from './pages/Blog/Homepage';
import TermsOfUse from './modules/static/terms_of_use';
import Testimonial from './modules/static/testimonials/Testimonial';
import Ratings from './modules/static/testimonials/Ratings';
import DashboardLayout from './components/DashboardLayout';
import NewsletterPage from './modules/static/newsletter/NewsletterPage';
import EmailTemplate from './modules/static/emailtemplate/EmailTemplate';
import NewsletterErrorPopUp from './modules/modal/newsletter/newsletterErrorPopUp/NewsletterErrorPopUp';
import {
  HomePage,
  History,
  Correction,
  ConversationPage,
  LandingPage,
  LegalPage,
  Settings,
  TranscribePage,
} from './pages';
import Careers from './pages/career/Career';
import Roles from './pages/career/Roles';
import Application from './pages/career/Application';
import ApiStatus from './pages/api-status/api-status';
import LandingLayout from './components/LandingLayout.jsx';

// All routes/pages must be import from ./pages folder
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/converse" element={<ConversationPage />} />
      <Route path="/history" element={<h2>History</h2>} />
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/faq" element={<FaqMain />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="contact" element={<h1>Contact Page</h1>} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/legal" element={<LegalPage />} />
      </Route>
      <Route path="/newsletter" element={<NewsletterPage />} />
      <Route path="/career" element={<Careers />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/apply" element={<Application />} />
      <Route path="/app-status" element={<ApiStatus />} />
      <Route path="/emailtemplate" element={<EmailTemplate />} />
      <Route path="/errormodal" element={<NewsletterErrorPopUp />} />
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
              <TranscribePage />
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
  return <RouterProvider router={router} />;
}

export default App;
