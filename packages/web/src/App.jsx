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
// All routes/pages must be import from ./pages folder
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<h1>Will redirect to Landing Pages / Conversation Page</h1>} />
      <Route path="/home" element={<h1>Landing Page</h1>} />
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="/faq" element={<h1>FAQ Page</h1>} />
      <Route path="/blog" element={<h1>Blog Page</h1>} />
      <Route path="contact" element={<h1>Contact Page</h1>} />
      <Route path="/newsletter" element={<h1>NewsLetter Page</h1>} />
      <Route path="/culture-career" element={<h1>Culture Page</h1>} />
      <Route path="/terms-of-use" element={<h1>Terms of use Page</h1>} />
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
      <Route
        path="/me"
        element={
          <div>
            <h2>Dashboard Layout</h2>
            <Outlet />
          </div>
        }
      >
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <h1>Home Page</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute>
              <h1>History Page</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="transcribe"
          element={
            <ProtectedRoute>
              <h1>Transcribe/import Page</h1>
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
