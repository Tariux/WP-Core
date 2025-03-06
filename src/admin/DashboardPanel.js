import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page Components
import Landing from "./pages/Landing";
import Settings from "./pages/Settings";

// Layout Components
import DashboardLayout from "./components/DashboardLayout";
import { fetchUserInfo } from "./api/user";
import { SettingsContext } from "../context/SettingsContext";
import ListPages from "./pages/ListPages";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import ReadPage from "./pages/ReadPage";
import DeletePage from "./pages/DeletePage";
import DebugPage from "./pages/DebugPage";


export default function DashboardPanel() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useContext(SettingsContext);
  const dashboardPages = [
    {
      title: lang['dashboard'],
      slug: "dashboard" || 'Dashboard',
      icon: "map",
      component: Landing,
      // description: lang['dashboard_page_desc']
    },
    {
      title: lang['settings'] || 'Settings',
      slug: "settings",
      icon: "map",
      component: Settings,
    },
    {
      title: lang['pages'] || 'Pages',
      slug: "pages",
      icon: "map",
      component: ListPages,
    },
    {
      title: lang['create_page'] || 'Create Page',
      slug: "create_page",
      icon: "map",
      component: CreatePage,
    },
    {
      title: lang['read_page'] || 'Read Page',
      slug: "read_page",
      icon: "map",
      component: ReadPage,
    },
    {
      title: lang['update_page'] || 'Update Page',
      slug: "update_page",
      icon: "map",
      component: UpdatePage,
    },
    {
      title: lang['delete_page'] || 'Delete Page',
      slug: "delete_page",
      icon: "map",
      component: DeletePage,
    },
    {
      title: lang['debug_page'] || 'Debug',
      slug: "debug_page",
      icon: "map",
      component: DebugPage,
    }
  ];
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const userData = await fetchUserInfo();
        setUserInfo(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  if (isLoading) {
    return <div className="the_box-loader">{lang['loading']}...</div>;
  }

  return (
      <DashboardLayout pages={dashboardPages} userInfo={userInfo}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {dashboardPages.map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={<page.component />}
            />
          ))}
        </Routes>
      </DashboardLayout>
  );
}
