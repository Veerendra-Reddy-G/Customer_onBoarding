// //src/app/layout.js
 

'use client';

import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { App } from "antd";
import { AuthProvider } from '@/app/context/AuthContext';
import AppLayout from './components/Layout/AppLayout';
import './globals.css';

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <AuthProvider>
            <AppLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
            <App>
              {children}
              </App>
            </AppLayout>
          </AuthProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}