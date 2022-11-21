import React, { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
const SignupPage = lazy(() => import('./modules/auth/signup/step1/step1'));
const SignupTwoPage = lazy(() => import('./modules/auth/signup/step2/step2'));
const SigninPage = lazy(() => import('./modules/auth/login/login'));
const ProfilePage = lazy(() => import('./pages/profile/profileScreen'));
const PasswordPage = lazy(() => import('./pages/profile/ChangePassword'));
const DeletePage = lazy(() => import('./pages/profile/DeleteAccount'));
const ConfirmDeletePage = lazy(() => import('./pages/profile/ConfirmDeleteAccount'));
const ForgotPage = lazy(() => import('./modules/auth/forgot-password/forgot'));
const ResetPage = lazy(() => import('./modules/auth/reset-password/reset'));
const FaqPagenupTwo = lazy(() => import('./components/Faq/faq_main'));
const BlogView = lazy(() => import('./pages/Blog/Homepage'));
const TandC = lazy(() => import('./modules/static/terms_of_use'));
const Review = lazy(() => import('./modules/static/testimonials/Testimonial'));
const Rates = lazy(() => import('./modules/static/testimonials/Ratings'));
const Dashboard = lazy(() => import('./components/DashboardLayout'));
const Newsletter = lazy(() => import('./modules/static/newsletter/NewsletterPage'));
const EmailTemp = lazy(() => import('./modules/static/emailtemplate/EmailTemplate'));
const ErrorNews = lazy(() => import('./modules/modal/newsletter/newsletterErrorPopUp/NewsletterErrorPopUp'));
const HomePages = lazy(() => import('./modules/account/home/homePage'));
const HistoryPage = lazy(() => import('./modules/account/history/history'));
const CorrectionPage = lazy(() => import('./modules/account/history/correction'));
const Conversation = lazy(() => import('./modules/account/conversation'));
const Landing = lazy(() => import('./modules/static/landing-page/LandingPage'));
const Legal = lazy(() => import('./pages/Legal/index'));
const SettingsPage = lazy(() => import('./modules/setting/home-settings/Settings'));
const Transcribe = lazy(() => import('./modules/transcribe/index'));
const CareerPage = lazy(() => import('./pages/career/Career'));
const RolesPage = lazy(() => import('./pages/career/Roles'));
const ApplicationPage = lazy(() => import('./pages/career/Application'));
const ApiPage = lazy(() => import('./pages/api-status/api-status'));
const LandingLayoutPage = lazy(() => import('./components/LandingLayout.jsx'));

// All routes/pages must be import from ./pages folder

const DashboardLayout = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <Dashboard />
  </Suspense>
);

const Signup = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <SignupPage />
  </Suspense>
);

const Signuptwo = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <SignupTwoPage />
  </Suspense>
);

const Signin = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <SigninPage />
  </Suspense>
);

const ProfileScreen = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <ProfilePage />
  </Suspense>
);
const ChangePassword = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <PasswordPage />
  </Suspense>
);
const DeleteAccount = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <DeletePage />
  </Suspense>
);
const ConfirmDeleteAccount = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <ConfirmDeletePage />
  </Suspense>
);
const Forgotpassword = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <ForgotPage />
  </Suspense>
);
const ResetLink = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <ResetPage />
  </Suspense>
);
const FaqMain = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <FaqPagenupTwo />
  </Suspense>
);
const Blog = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <BlogView />
  </Suspense>
);
const TermsOfUse = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <TandC />
  </Suspense>
);
const Testimonial = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <Review />
  </Suspense>
);
const Ratings = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <Rates />
  </Suspense>
);

const NewsletterPage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <Newsletter />
  </Suspense>
);

const EmailTemplate = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <EmailTemp />
  </Suspense>
);

const NewsletterErrorPopUp = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <ErrorNews />
  </Suspense>
);

const HomePage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <HomePages />
  </Suspense>
);

const History = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <HistoryPage />
  </Suspense>
);

const Correction = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <CorrectionPage />
  </Suspense>
);

const ConversationPage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <Conversation />
  </Suspense>
);

const LandingPage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <Landing />
  </Suspense>
);

const LegalPage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <Legal />
  </Suspense>
);

const Settings = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <SettingsPage />
  </Suspense>
);

const TranscribePage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <Transcribe />
  </Suspense>
);

const Careers = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <CareerPage />
  </Suspense>
);

const Roles = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <RolesPage />
  </Suspense>
);

const Application = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <ApplicationPage />
  </Suspense>
);

const ApiStatus = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <ApiPage />
  </Suspense>
);

const LandingLayout = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  >
    <LandingLayoutPage />
  </Suspense>
);

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;
