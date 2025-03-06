import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/app.scss";
import { FiHome, FiUser,FiToggleLeft, FiToggleRight, FiBox } from 'react-icons/fi';
import TheBoxLogo from "./TheBoxLogo";
import { SettingsContext } from "../../context/SettingsContext";

export default function DashboardLayout({ children, pages, userInfo }) {
  const location = useLocation();
  const { lang } = useContext(SettingsContext);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  function Icon({ iconName }) {
    const IconComponent = iconMapping[iconName];
    return IconComponent ? <IconComponent /> : null;
  }
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const iconMapping = {
    home: FiHome,
    user: FiUser,
    left: FiToggleLeft,
    map: FiBox,
    right: FiToggleRight,
    // add more mappings as needed
  };
  
  return (
    <div id="the_box-admin-dashboard" className="the_box-admin-dashboard">
      <aside className={`the_box-admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="the_box-admin-sidebar__header">
          <h2 className="the_box-admin-sidebar__title">
            <TheBoxLogo width="20px" height="auto" className="the_box-logo-svg" />
            {isSidebarCollapsed ? '' : lang['box'] || 'Box'}
          </h2>
        </div>
        
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
            {/* {} */}
          </a>
        </nav>
      </aside>

      <main className="the_box-admin-main-content">
        {children}
      </main>
    </div>
  );
}
