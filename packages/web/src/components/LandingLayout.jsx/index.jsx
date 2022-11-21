import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

function LandingLayout() {
  return (
    <div className="space-y-0">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default LandingLayout;
