import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiToggleLeft, FiToggleRight, FiBox } from 'react-icons/fi';

const iconMapping = {
  home: FiHome,
  user: FiUser,
  left: FiToggleLeft,
  map: FiBox,
  right: FiToggleRight,
  // add more mappings as needed
};

function Icon({ iconName }) {
  const IconComponent = iconMapping[iconName];
  return IconComponent ? <IconComponent /> : null;
}

export default function Navbar({ pages, isSidebarCollapsed, toggleSidebar, lang }) {
  const location = useLocation();

  return (
    <nav className="the_box-admin-navigation">
      {pages.map((page) => (
        <Link
          key={page.slug}
          to={`/${page.slug}`}
          className={`the_box-admin-nav-item ${
            location.pathname === `/${page.slug}` ? "active" : ""
          }`}
          title={page.title}
        >
          {Icon({ iconName: page.icon })}
          {!isSidebarCollapsed && page.title}
        </Link>
      ))}
      <a className="the_box-admin-nav-item sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarCollapsed ? Icon({ iconName: 'right' }) : Icon({ iconName: 'left' })}
        {isSidebarCollapsed ? '' : lang['collapse_menu'] || 'Collapse menu'}
      </a>
    </nav>
  );
}