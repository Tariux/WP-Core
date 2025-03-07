import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiToggleLeft, FiToggleRight, FiBox, FiChevronDown, FiChevronUp, FiSettings } from 'react-icons/fi';

const iconMapping = {
  home: FiHome,
  user: FiUser,
  left: FiToggleLeft,
  map: FiBox,
  right: FiToggleRight,
  settings: FiSettings,
  // add more mappings as needed
};

function Icon({ iconName }) {
  const IconComponent = iconMapping[iconName];
  return IconComponent ? <IconComponent /> : null;
}

function NavItem({ page, isActive, isSidebarCollapsed }) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const hasSubmenu = page.submenu && page.submenu.length > 0;

  const toggleSubmenu = (e) => {
    if (hasSubmenu) {
      e.preventDefault();
      setIsSubmenuOpen(!isSubmenuOpen);
    }
  };

  return (
    <div className="nav-item-container">
      <Link
        to={`/${page.slug}`}
        className={`the_box-admin-nav-item ${isActive ? "active" : ""}`}
        onClick={toggleSubmenu}
        title={page.title}
      >
        {Icon({ iconName: page.icon })}
        {!isSidebarCollapsed && (
          <>
            <span className="nav-title">{page.title}</span>
            {hasSubmenu && (
              <span className="submenu-arrow">
                {isSubmenuOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            )}
          </>
        )}
      </Link>
      
      {hasSubmenu && isSubmenuOpen && !isSidebarCollapsed && (
        <div className="submenu">
          {page.submenu.map((subItem) => (
            <Link
              key={`${page.slug}-${subItem.slug}`}
              to={`/${subItem.slug}`}
              className={`the_box-admin-nav-item submenu-item ${
                location.pathname === `/${subItem.slug}` ? "active" : ""
              }`}
            >
              <span className="submenu-title">{subItem.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ pages, isSidebarCollapsed, toggleSidebar, lang }) {
  const location = useLocation();

  return (
    <nav className="the_box-admin-navigation">
      {pages.map((page) => (
        <NavItem
          key={`nav-${page.slug}`}
          page={page}
          isActive={location.pathname === `/${page.slug}`}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      ))}
      <a className="the_box-admin-nav-item sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarCollapsed ? Icon({ iconName: 'right' }) : Icon({ iconName: 'left' })}
        {!isSidebarCollapsed && (lang['collapse_menu'] || 'Collapse menu')}
      </a>
    </nav>
  );
}