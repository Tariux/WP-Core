import React, { useContext } from "react";
import "../styles/app.scss";
import TheBoxLogo from "./TheBoxLogo";
import { SettingsContext } from "../context/SettingsContext";
import Navbar from "./Navbar";

export default function DashboardLayout({ children, pages, userInfo }) {
  const { lang } = useContext(SettingsContext);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
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
        <Navbar 
          pages={pages}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          lang={lang}
        />

      </aside>

      <main className="the_box-admin-main-content">
        {children}
      </main>
    </div>
  );
}
