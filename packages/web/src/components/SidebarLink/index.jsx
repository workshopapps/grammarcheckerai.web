import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function SidebarLink({ to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `min-w-full block text-center bg-[#5D387F] text-white py-6 ${isActive ? '' : 'undefined'}`
      }
    >
      Tasks
    </NavLink>
  );
}

SidebarLink.propTypes = {
  to: PropTypes.string,
};

export default SidebarLink;
