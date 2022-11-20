import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function SidebarLink({ to, children, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `min-w-full block text-center  text-white py-6 ${
          isActive ? 'bg-[#5D387F]' : 'text-slate-700'
        } transition ease-in `
      }
    >
      <div className="max-w-10 px-10 flex items-center justify-center space-x-4">
        <Icon size={24} />
        <span>{children}</span>
      </div>
    </NavLink>
  );
}

SidebarLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  Icon: PropTypes.func,
};

export default SidebarLink;
