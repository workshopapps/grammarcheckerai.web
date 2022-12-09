import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import useTheme from '../../hooks/useTheme';

function LandingLayout() {
  // const context = useTheme();
  // const dark = context.theme === 'dark';
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
 
export default LandingLayout;
