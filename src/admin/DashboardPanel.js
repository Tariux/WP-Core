import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


// Layout Components
import DashboardLayout from "./components/DashboardLayout";
import { fetchUserInfo } from "./api/user";
import { SettingsContext } from "./context/SettingsContext";
import DashboardRoutes from "./DashboardRoutes";


export default function DashboardPanel() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useContext(SettingsContext);
  const dashboardPages = DashboardRoutes({lang});
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
