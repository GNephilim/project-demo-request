import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { theme } from './theme';
import {
  MainContainer,
  StatsSection,
  DemoTabs,
  AdminLogin,
  RequestDemoModal,
  TopNavigation,
} from './components';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { AdminDashboardContent } from './sections/AdminDashboardContent';
import {
  UserManagementSection,
  DepartmentManagementSection,
  FormConfigurationSection,
  SiteSettingsSection,
  DatabaseSettingsSection,
  ReportsSection,
  NotificationSettingsSection,
} from './sections/AdminSections';
import { SystemInformationSection } from './sections/SystemInformationSection';
import { ViewDepartmentsSection } from './sections/ViewDepartmentsSection';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRequestDemoModal, setShowRequestDemoModal] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('dashboard');

  // Check if admin is already logged in on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    const name = localStorage.getItem('adminName');
    if (loggedIn && name) {
      setIsAdminLoggedIn(true);
      setAdminName(name);
    }
  }, []);

  const handleAdminLogin = (name: string) => {
    setAdminName(name);
    setIsAdminLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminName('');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminName');
    setCurrentSection('dashboard');
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const renderContent = () => {
    // Admin Dashboard views
    if (currentSection === 'admin-dashboard') {
      return (
        <AdminDashboardContent onNavigate={handleNavigate} />
      );
    }

    if (currentSection === 'users-management') {
      return (
        <UserManagementSection onNavigate={handleNavigate} />
      );
    }

    if (currentSection === 'departments-manage') {
      return (
        <DepartmentManagementSection onNavigate={handleNavigate} />
      );
    }

    if (currentSection === 'view-departments') {
      return (
        <ViewDepartmentsSection />
      );
    }

    if (currentSection === 'forms-configuration') {
      return (
        <FormConfigurationSection onNavigate={handleNavigate} />
      );
    }

    if (currentSection === 'site-settings') {
      return (
        <SiteSettingsSection onNavigate={handleNavigate} />
      );
    }

    if (currentSection === 'database-settings') {
      return (
        <DatabaseSettingsSection onNavigate={handleNavigate} />
      );
    }

    if (currentSection === 'system-information') {
      return (
        <SystemInformationSection />
      );
    }

    if (currentSection === 'reports') {
      return (
        <ReportsSection onNavigate={handleNavigate} />
      );
    }

    if (currentSection === 'notification-settings') {
      return (
        <NotificationSettingsSection onNavigate={handleNavigate} />
      );
    }

    // Dashboard/Overview
    if (currentSection === 'dashboard' || currentSection === 'home' || currentSection === 'overview') {
      return (
        <MainContainer>
          <Box sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <Typography
              variant="h2"
              sx={{
                marginBottom: '12px',
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              }}
            >
              Demo Requests
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#555555',
                fontSize: '1.025rem',
                marginBottom: '48px',
              }}
            >
              View and manage all submitted demo requests from across your organization.
            </Typography>

            {/* Stats Section */}
            <StatsSection />

            {/* Demo Tabs Section */}
            <DemoTabs />
          </Box>
        </MainContainer>
      );
    }

    // All report pages redirect to the main Reports section
    if (currentSection === 'reports-all' || currentSection === 'reports-languages' || currentSection === 'reports-databases' || currentSection === 'reports-departments' || currentSection === 'reports-timeline') {
      return (
        <ReportsSection onNavigate={handleNavigate} />
      );
    }

    // Default fallback
    return (
      <MainContainer>
        <Box sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <Typography variant="h2">Welcome to DemoHub</Typography>
        </Box>
      </MainContainer>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f7fa',
        }}
      >
        {/* Top Navigation */}
        <TopNavigation
          isAdminLoggedIn={isAdminLoggedIn}
          adminName={adminName}
          onAdminLoginClick={() => setShowLoginModal(true)}
          onAdminLogout={handleAdminLogout}
          onNavigate={handleNavigate}
          currentSection={currentSection}
        />

        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          {renderContent()}
        </Box>
      </Box>

      {/* Admin Login Modal */}
      <AdminLogin
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleAdminLogin}
      />

      {/* Request Demo Modal */}
      <RequestDemoModal
        open={showRequestDemoModal}
        onClose={() => setShowRequestDemoModal(false)}
      />
    </ThemeProvider>
  );
}

export default App;
