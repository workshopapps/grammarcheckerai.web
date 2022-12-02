import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import useTheme from '../../hooks/useTheme';

function LandingLayout() {
  const context = useTheme();
  const dark = context.theme === 'dark';
  return (
    <div className={` ${dark && 'bg-[black]'}`}>
      <Navbar />
      <Outlet />
    </div>
  );
}
 
export default LandingLayout;
