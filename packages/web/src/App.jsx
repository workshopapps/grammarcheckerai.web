import React, { lazy, Suspense, useState, useEffect } from 'react';
import './App.css';
import Fallback from './components/Fallback/Fallback';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
// import StartGame from './modules/static/quizgame/startgame/StartGame';
import Layout from './modules/static/quizgame/layout/Layout';
// import ProtectedRoute from './components/ProtectedRoute';
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
const NewsletterEmailTemplate = lazy(() => import('./modules/static/emailtemplate/newsletterTemplate'));
const SignInEmailTemplate = lazy(() => import('./modules/static/emailtemplate/signInTemplate'));
const HomePages = lazy(() => import('./modules/account/home/homePage'));
const HistoryPage = lazy(() => import('./modules/account/history/history'));
const CorrectionPage = lazy(() => import('./modules/account/history/correction'));
const Conversation = lazy(() => import('./modules/account/conversation'));
const ConversationTry = lazy(() => import('./modules/account/conversation/chat'));
const Landing = lazy(() => import('./modules/static/landing-page/LandingPage'));
const Legal = lazy(() => import('./pages/Legal/index'));
const TermsOfService = lazy(() => import('./pages/Legal/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const CookiesStatement = lazy(() => import('./pages/Legal/CookiesStatement'));
const Trademark = lazy(() => import('./pages/Legal/Trademark'));
const SettingsPage = lazy(() => import('./modules/setting/home-settings/Settings'));
const Transcribe = lazy(() => import('./modules/transcribe/index'));
const CareerPage = lazy(() => import('./pages/career/Career'));
const AboutPage = lazy(() => import('./pages/about/About'));
const RolesPage = lazy(() => import('./pages/career/Roles'));
const ApplicationPage = lazy(() => import('./pages/career/Application'));
const ApiPage = lazy(() => import('./pages/api-status/api-status'));
const LandingLayoutPage = lazy(() => import('./components/LandingLayout.jsx'));
const Jobs = lazy(() => import('./pages/Blog/Jobs'));
const Ai = lazy(() => import('./pages/Blog/Ai'));
const Grammar = lazy(() => import('./pages/Blog/Grammar'));
const Tips = lazy(() => import('./pages/Blog/Tips'));
const Contact = lazy(() => import('./pages/contact/index'));

// All routes/pages must be import from ./pages folder

const DashboardLayout = () => (
  <Suspense fallback={<Fallback />}>
    <Dashboard />
  </Suspense>
);

const Signuptwo = () => (
  <Suspense fallback={<Fallback />}>
    <SignupTwoPage />
  </Suspense>
);

const Signin = () => (
  <Suspense fallback={<Fallback />}>
    <SigninPage />
  </Suspense>
);

const ProfileScreen = () => (
  <Suspense fallback={<Fallback />}>
    <ProfilePage />
  </Suspense>
);
const ChangePassword = () => (
  <Suspense fallback={<Fallback />}>
    <PasswordPage />
  </Suspense>
);
const DeleteAccount = () => (
  <Suspense fallback={<Fallback />}>
    <DeletePage />
  </Suspense>
);
const ConfirmDeleteAccount = () => (
  <Suspense fallback={<Fallback />}>
    <ConfirmDeletePage />
  </Suspense>
);
const Forgotpassword = () => (
  <Suspense fallback={<Fallback />}>
    <ForgotPage />
  </Suspense>
);
const ResetLink = () => (
  <Suspense fallback={<Fallback />}>
    <ResetPage />
  </Suspense>
);
const FaqMain = () => (
  <Suspense fallback={<Fallback />}>
    <FaqPagenupTwo />
  </Suspense>
);
const Blog = () => (
  <Suspense fallback={<Fallback />}>
    <BlogView />
  </Suspense>
);
const TermsOfUse = () => (
  <Suspense fallback={<Fallback />}>
    <TandC />
  </Suspense>
);
const Testimonial = () => (
  <Suspense fallback={<Fallback />}>
    <Review />
  </Suspense>
);
const Ratings = () => (
  <Suspense fallback={<Fallback />}>
    <Rates />
  </Suspense>
);

const NewsletterPage = () => (
  <Suspense fallback={<Fallback />}>
    <Newsletter />
  </Suspense>
);

const EmailTemplate = () => (
  <Suspense fallback={<Fallback />}>
    <EmailTemp />
  </Suspense>
);
const NewsletterTemplate = () => (
  <Suspense fallback={<Fallback />}>
    <NewsletterEmailTemplate />
  </Suspense>
);
const SignInTemplate = () => (
  <Suspense fallback={<Fallback />}>
    <SignInEmailTemplate />
  </Suspense>
);

const HomePage = () => (
  <Suspense fallback={<Fallback />}>
    <HomePages />
  </Suspense>
);

const History = () => (
  <Suspense fallback={<Fallback />}>
    <HistoryPage />
  </Suspense>
);

const Correction = () => (
  <Suspense fallback={<Fallback />}>
    <CorrectionPage />
  </Suspense>
);

const ConversationPage = () => (
  <Suspense fallback={<Fallback />}>
    <Conversation />
  </Suspense>
);

const ConversationTryPage = () => (
  <Suspense fallback={<Fallback />}>
    <ConversationTry />
  </Suspense>
);

const LandingPage = () => (
  <Suspense fallback={<Fallback />}>
    <Landing />
  </Suspense>
);

const LegalPage = () => (
  <Suspense fallback={<Fallback />}>
    <Legal />
  </Suspense>
);

const TOSPage = () => (
  <Suspense fallback={<Fallback />}>
    <TermsOfService />
  </Suspense>
);

const PrivacyPage = () => (
  <Suspense fallback={<Fallback />}>
    <PrivacyPolicy />
  </Suspense>
);
const CookiesPage = () => (
  <Suspense fallback={<Fallback />}>
    <CookiesStatement />
  </Suspense>
);

const TrademarkPage = () => (
  <Suspense fallback={<Fallback />}>
    <Trademark />
  </Suspense>
);

const JobsPage = () => (
  <Suspense fallback={<Fallback />}>
    <Jobs />
  </Suspense>
);

const AiPage = () => (
  <Suspense fallback={<Fallback />}>
    <Ai />
  </Suspense>
);

const GrammarPage = () => (
  <Suspense fallback={<Fallback />}>
    <Grammar />
  </Suspense>
);

const TipsPage = () => (
  <Suspense fallback={<Fallback />}>
    <Tips />
  </Suspense>
);

const Settings = () => (
  <Suspense fallback={<Fallback />}>
    <SettingsPage />
  </Suspense>
);

const TranscribePage = () => (
  <Suspense fallback={<Fallback />}>
    <Transcribe />
  </Suspense>
);

const Careers = () => (
  <Suspense fallback={<Fallback />}>
    <CareerPage />
  </Suspense>
);

const Roles = () => (
  <Suspense fallback={<Fallback />}>
    <RolesPage />
  </Suspense>
);

const Application = () => (
  <Suspense fallback={<Fallback />}>
    <ApplicationPage />
  </Suspense>
);

const ApiStatus = () => (
  <Suspense fallback={<Fallback />}>
    <ApiPage />
  </Suspense>
);

const LandingLayout = () => (
  <Suspense fallback={<Fallback />}>
    <LandingLayoutPage />
  </Suspense>
);

function App() {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('grittyuserid') !== null && localStorage.getItem('grittyuserid') !== '') {
      setisLoggedin(true);
    }
    if (localStorage.getItem('isdashboard') !== false) {
      setIsDashboard(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/converse/try" element={<ConversationTryPage />} />
      <Route path="/history" element={<h2>History</h2>} />
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/converse" element={<ConversationPage />} />
        <Route path="/faq" element={<FaqMain />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/legal/terms-of-service" element={<TOSPage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/legal/cookies" element={<CookiesPage />} />
        <Route path="/legal/trademark" element={<TrademarkPage />} />
      </Route>
      <Route path="/startgame" element={<Layout />}></Route>
      <Route path="/newsletter" element={<NewsletterPage />} />
      <Route path="/career" element={<Careers />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/apply" element={<Application />} />
      <Route path="/api-status" element={<ApiStatus />} />
      <Route path="/emailtemplate" element={<EmailTemplate />} />
      <Route path="/newsletter-template" element={<NewsletterTemplate />} />
      <Route path="/signin-template" element={<SignInTemplate />} />
      <Route
        element={
          <div>
            <Outlet />
          </div>
        }
      >
        <Route path="/signin" element={isLoggedin === true ? <Navigate to="/me/home" /> : <Signin />} />
        <Route path="signup" element={isLoggedin === true ? <Navigate to="/me/home" /> : <Signuptwo />} />
        <Route path="forgot-password" element={<Forgotpassword />} />
        <Route path="reset-password" element={<ResetLink />} />
      </Route>
      <Route path="/me" element={isDashboard === false ? <Navigate to="/signin" /> : <DashboardLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="history" element={<History />} />
        <Route path="history/correction" element={<Correction />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="profile/changepassword" element={<ChangePassword />} />
        <Route path="profile/deleteaccount" element={<DeleteAccount />} />
        <Route path="profile/deleteaccount-step2" element={<ConfirmDeleteAccount />} />
        <Route path="import" element={<TranscribePage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
