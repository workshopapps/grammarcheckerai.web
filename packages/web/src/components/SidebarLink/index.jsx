import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function SidebarLink({ to, children, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `min-w-full flex sm:block text-left text-slate-800 text-sm border-r-4 py-5 hover:border-[#5D387F33] ${
          isActive ? 'bg-[#5D387F33] border-[#5D387F] hover:border-[#5D387F]' : 'text-slate-700 border-[#5D387F00]'
        } transition ease-in `
      }
    >
      <div className="max-w-10 pr-10 pl-16 flex items-center space-x-6">
        <Icon size={18} />
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
