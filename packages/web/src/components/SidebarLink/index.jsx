import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function SidebarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `min-w-full block text-center  text-white py-6 ${isActive ? 'bg-[#5D387F]' : 'text-slate-700'}`
      }
    >
      {children}
    </NavLink>
  );
}

SidebarLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default SidebarLink;
