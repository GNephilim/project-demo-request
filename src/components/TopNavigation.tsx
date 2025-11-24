import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Badge,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Home as HomeIcon,
  BarChart as BarChartIcon,
  Description as FileTextIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

interface TopNavigationProps {
  isAdminLoggedIn: boolean;
  adminName: string;
  onAdminLoginClick: () => void;
  onAdminLogout: () => void;
  onRequestDemoClick: () => void;
  onNavigate: (section: string) => void;
  currentSection: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  isAdminLoggedIn,
  adminName,
  onAdminLoginClick,
  onAdminLogout,
  onRequestDemoClick,
  onNavigate,
  currentSection,
}) => {
  const [homeAnchorEl, setHomeAnchorEl] = useState<null | HTMLElement>(null);
  const [reportingAnchorEl, setReportingAnchorEl] = useState<null | HTMLElement>(null);
  const [resourcesAnchorEl, setResourcesAnchorEl] = useState<null | HTMLElement>(null);
  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState<null | HTMLElement>(null);

  const handleHomeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHomeAnchorEl(event.currentTarget);
  };

  const handleHomeMenuClose = () => {
    setHomeAnchorEl(null);
  };

  const handleReportingMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setReportingAnchorEl(event.currentTarget);
  };

  const handleReportingMenuClose = () => {
    setReportingAnchorEl(null);
  };

  const handleResourcesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setResourcesAnchorEl(event.currentTarget);
  };

  const handleResourcesMenuClose = () => {
    setResourcesAnchorEl(null);
  };

  const handleAdminMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAdminMenuAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminMenuAnchorEl(null);
  };

  const handleAdminProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleAdminProfileMenuClose = () => {
    setAdminAnchorEl(null);
  };

  const handleNavigation = (section: string) => {
    onNavigate(section);
    handleHomeMenuClose();
    handleReportingMenuClose();
    handleResourcesMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
        boxShadow: '0 4px 12px rgba(30, 58, 95, 0.15)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            padding: '8px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => handleNavigation('home')}>
            <BusinessIcon
              sx={{
                fontSize: '2.2rem',
                color: '#ffffff',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                fontSize: '1.3rem',
                letterSpacing: '0.5px',
              }}
            >
              DemoHub
            </Typography>
          </Box>

          {/* Main Navigation Menu */}
          <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {/* Home Dropdown */}
            <Button
              startIcon={<HomeIcon sx={{ fontSize: '1.2rem' }} />}
              onClick={handleHomeMenuOpen}
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
                backgroundColor: currentSection === 'home' || currentSection === 'dashboard' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              }}
            >
              Home
            </Button>
            <Menu
              anchorEl={homeAnchorEl}
              open={Boolean(homeAnchorEl)}
              onClose={handleHomeMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: '8px',
                  marginTop: '8px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  '& .MuiMenuItem-root': {
                    padding: '12px 16px',
                    '&:hover': {
                      backgroundColor: '#f5f7fa',
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleNavigation('dashboard')} sx={{ gap: '12px' }}>
                <HomeIcon sx={{ fontSize: '1.2rem', color: '#1e3a5f' }} />
                <Typography>Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('overview')} sx={{ gap: '12px' }}>
                <BarChartIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                <Typography>Overview</Typography>
              </MenuItem>
            </Menu>

            {/* Reporting Dropdown */}
            <Button
              startIcon={<BarChartIcon sx={{ fontSize: '1.2rem' }} />}
              onClick={handleReportingMenuOpen}
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
                backgroundColor: currentSection.includes('report') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              }}
            >
              Reporting
            </Button>
            <Menu
              anchorEl={reportingAnchorEl}
              open={Boolean(reportingAnchorEl)}
              onClose={handleReportingMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: '8px',
                  marginTop: '8px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  minWidth: '220px',
                  '& .MuiMenuItem-root': {
                    padding: '12px 16px',
                    '&:hover': {
                      backgroundColor: '#f5f7fa',
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleNavigation('reports-all')} sx={{ gap: '12px' }}>
                <FileTextIcon sx={{ fontSize: '1.2rem', color: '#1e3a5f' }} />
                <Typography>All Reports</Typography>
              </MenuItem>
              <Divider sx={{ margin: '4px 0' }} />
              <MenuItem onClick={() => handleNavigation('reports-languages')} sx={{ gap: '12px' }}>
                <BarChartIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                <Typography>Languages Used</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('reports-databases')} sx={{ gap: '12px' }}>
                <BarChartIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                <Typography>Databases Used</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('reports-departments')} sx={{ gap: '12px' }}>
                <BarChartIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                <Typography>By Department</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('reports-timeline')} sx={{ gap: '12px' }}>
                <FileTextIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                <Typography>Demo Timeline</Typography>
              </MenuItem>
            </Menu>

            {/* Admin Dropdown (Admin Only) */}
            {isAdminLoggedIn && (
              <>
                <Button
                  startIcon={<DashboardIcon sx={{ fontSize: '1.2rem' }} />}
                  onClick={handleAdminMenuOpen}
                  sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  Admin
                </Button>
                <Menu
                  anchorEl={adminMenuAnchorEl}
                  open={Boolean(adminMenuAnchorEl)}
                  onClose={handleAdminMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: '8px',
                      marginTop: '8px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      minWidth: '240px',
                      '& .MuiMenuItem-root': {
                        padding: '12px 16px',
                        '&:hover': {
                          backgroundColor: '#f5f7fa',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem disabled sx={{ color: '#888888', fontWeight: 600 }}>
                    Dashboard & Reports
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('admin-dashboard'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <DashboardIcon sx={{ fontSize: '1.2rem', color: '#1e3a5f' }} />
                    <Typography>Admin Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('reports'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <BarChartIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>Reports</Typography>
                  </MenuItem>
                  <Divider sx={{ margin: '4px 0' }} />
                  
                  <MenuItem disabled sx={{ color: '#888888', fontWeight: 600 }}>
                    Management
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('users-management'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <PeopleIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>Users</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('departments-manage'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <PeopleIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>Departments</Typography>
                  </MenuItem>
                  <Divider sx={{ margin: '4px 0' }} />
                  
                  <MenuItem disabled sx={{ color: '#888888', fontWeight: 600 }}>
                    Configuration
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('forms-configuration'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <SettingsIcon sx={{ fontSize: '1.2rem', color: '#1e3a5f' }} />
                    <Typography>Request Options</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('site-settings'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <SettingsIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>Site Settings</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('database-settings'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <SettingsIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>Database</Typography>
                  </MenuItem>
                  <Divider sx={{ margin: '4px 0' }} />
                  
                  <MenuItem disabled sx={{ color: '#888888', fontWeight: 600 }}>
                    System
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('system-information'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <InfoIcon sx={{ fontSize: '1.2rem', color: '#1e3a5f' }} />
                    <Typography>System Information</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* Resources Dropdown (Admin Only) */}
            {isAdminLoggedIn && (
              <>
                <Button
                  startIcon={<HelpIcon sx={{ fontSize: '1.2rem' }} />}
                  onClick={handleResourcesMenuOpen}
                  sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  Resources
                </Button>
                <Menu
                  anchorEl={resourcesAnchorEl}
                  open={Boolean(resourcesAnchorEl)}
                  onClose={handleResourcesMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: '8px',
                      marginTop: '8px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      minWidth: '220px',
                      '& .MuiMenuItem-root': {
                        padding: '12px 16px',
                        '&:hover': {
                          backgroundColor: '#f5f7fa',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem
                    component="a"
                    href="https://docs.example.com"
                    target="_blank"
                    sx={{ gap: '12px' }}
                  >
                    <FileTextIcon sx={{ fontSize: '1.2rem', color: '#1e3a5f' }} />
                    <Typography>Documentation</Typography>
                  </MenuItem>
                  <MenuItem
                    component="a"
                    href="https://support.example.com"
                    target="_blank"
                    sx={{ gap: '12px' }}
                  >
                    <HelpIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>Support Center</Typography>
                  </MenuItem>
                  <MenuItem
                    component="a"
                    href="https://github.com"
                    target="_blank"
                    sx={{ gap: '12px' }}
                  >
                    <SettingsIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>GitHub Repository</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Notifications (Admin Only) */}
            {isAdminLoggedIn && (
              <IconButton
                sx={{
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                <Badge badgeContent={3} sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff6b6b' } }}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

            {/* Request Demo Button */}
            <Button
              onClick={onRequestDemoClick}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'none',
                padding: '8px 18px',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #006b7a 0%, #0097a7 100%)',
                  boxShadow: '0 8px 16px rgba(0, 151, 167, 0.3)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Request Demo
            </Button>

            {/* Admin Profile Menu */}
            {isAdminLoggedIn ? (
              <>
                <IconButton
                  onClick={handleAdminProfileMenuOpen}
                  sx={{
                    color: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={adminAnchorEl}
                  open={Boolean(adminAnchorEl)}
                  onClose={handleAdminProfileMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: '8px',
                      marginTop: '8px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      minWidth: '200px',
                      '& .MuiMenuItem-root': {
                        padding: '12px 16px',
                        '&:hover': {
                          backgroundColor: '#f5f7fa',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem disabled sx={{ color: '#888888', fontWeight: 600 }}>
                    <Typography variant="body2">Admin: {adminName}</Typography>
                  </MenuItem>
                  <Divider sx={{ margin: '4px 0' }} />
                  <MenuItem
                    onClick={() => {
                      onAdminLogout();
                      handleAdminProfileMenuClose();
                    }}
                    sx={{ gap: '12px', color: '#d32f2f' }}
                  >
                    <LogoutIcon sx={{ fontSize: '1.2rem' }} />
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={onAdminLoginClick}
                variant="outlined"
                sx={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: '#ffffff',
                  },
                }}
              >
                Admin Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
