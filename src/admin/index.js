import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18
import DashboardPanel from './DashboardPanel';
import { HashRouter } from "react-router-dom";
import { SettingsProvider } from '../context/SettingsContext';

const container = document.getElementById('root-admin-wp');
const root = createRoot(container);
root.render(
    <HashRouter>
    <SettingsProvider>
        <DashboardPanel />
    </SettingsProvider>
    </HashRouter>
);
