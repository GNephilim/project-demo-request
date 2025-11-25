import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Badge,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Home as HomeIcon,
  BarChart as BarChartIcon,
  Description as FileTextIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Info as InfoIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  CircleNotifications as CircleNotificationsIcon,
} from '@mui/icons-material';
import { NotificationCenter } from './NotificationCenter';

interface TopNavigationProps {
  isAdminLoggedIn: boolean;
  adminName: string;
  onAdminLoginClick: () => void;
  onAdminLogout: () => void;
  onNavigate: (section: string) => void;
  currentSection: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  isAdminLoggedIn,
  adminName,
  onAdminLoginClick,
  onAdminLogout,
  onNavigate,
  currentSection,
}) => {
  // Helper function to get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to get a consistent color based on name
  const getAvatarColor = (name: string) => {
    const colors = ['#0097a7', '#26c6da', '#00838f', '#0288d1', '#0277bd', '#01579b'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const [homeAnchorEl, setHomeAnchorEl] = useState<null | HTMLElement>(null);
  const [reportingAnchorEl, setReportingAnchorEl] = useState<null | HTMLElement>(null);
  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);

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
    handleAdminMenuClose();
  };

  const isActive = (section: string) => currentSection === section || currentSection.includes(section);

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2944 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          width: '100%',
        }}
      >
        <Toolbar
          sx={{
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            minHeight: 'auto',
            width: '100%',
          }}
        >
          {/* Logo Section - Far Left */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => handleNavigation('home')}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0097a7 0%, #26c6da 100%)',
                boxShadow: '0 8px 16px rgba(0, 151, 167, 0.3)',
              }}
            >
              <BusinessIcon sx={{ fontSize: '1.8rem', color: '#ffffff' }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#ffffff',
                  fontSize: '1.3rem',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.1,
                }}
              >
                DemoHub
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Enterprise
              </Typography>
            </Box>
          </Box>

          {/* Spacer - Left */}
          <Box sx={{ flex: 1 }} />

          {/* Main Navigation Menu - Center */}
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Home Dropdown */}
            <Button
              onClick={handleHomeMenuOpen}
              endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1.1rem' }} />}
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                },
                backgroundColor: isActive('home') || isActive('dashboard') ? 'rgba(0, 151, 167, 0.2)' : 'transparent',
              }}
            >
              <HomeIcon sx={{ fontSize: '1.1rem', marginRight: '8px' }} />
              Home
            </Button>
            <Menu
              anchorEl={homeAnchorEl}
              open={Boolean(homeAnchorEl)}
              onClose={handleHomeMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: '12px',
                  marginTop: '12px',
                  backdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 64px rgba(0, 0, 0, 0.3)',
                  '& .MuiMenuItem-root': {
                    padding: '12px 16px',
                    margin: '4px 8px',
                    borderRadius: '8px',
                    gap: '12px',
                    color: '#ffffff',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 151, 167, 0.15)',
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleNavigation('dashboard')} sx={{ gap: '12px' }}>
                <HomeIcon sx={{ fontSize: '1.2rem', color: '#26c6da' }} />
                <Typography>Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleHomeMenuClose(); onNavigate('request-demo-modal'); }} sx={{ gap: '12px' }}>
                <FileTextIcon sx={{ fontSize: '1.2rem', color: '#26c6da' }} />
                <Typography>New Demo Request</Typography>
              </MenuItem>
            </Menu>

            {/* Reporting Dropdown */}
            <Button
              onClick={handleReportingMenuOpen}
              endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1.1rem' }} />}
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                },
                backgroundColor: isActive('report') ? 'rgba(0, 151, 167, 0.2)' : 'transparent',
              }}
            >
              <BarChartIcon sx={{ fontSize: '1.1rem', marginRight: '8px' }} />
              Reporting
            </Button>
            <Menu
              anchorEl={reportingAnchorEl}
              open={Boolean(reportingAnchorEl)}
              onClose={handleReportingMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: '12px',
                  marginTop: '12px',
                  backdropFilter: 'blur(20px)',
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 64px rgba(0, 0, 0, 0.3)',
                  minWidth: '240px',
                  '& .MuiMenuItem-root': {
                    padding: '12px 16px',
                    margin: '4px 8px',
                    borderRadius: '8px',
                    color: '#ffffff',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 151, 167, 0.15)',
                    },
                  },
                  '& .MuiDivider-root': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    margin: '8px 0',
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleNavigation('reports-all')} sx={{ gap: '12px' }}>
                <FileTextIcon sx={{ fontSize: '1.2rem', color: '#26c6da' }} />
                <Typography>All Reports</Typography>
              </MenuItem>
              <Divider />
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

            {/* Admin Dropdown (Admin Only) - After regular links */}
            {isAdminLoggedIn && (
              <>
                <Button
                  onClick={handleAdminMenuOpen}
                  endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1.1rem' }} />}
                  sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    marginLeft: '8px',
                    background: 'rgba(0, 151, 167, 0.15)',
                    border: '1px solid rgba(0, 151, 167, 0.4)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 151, 167, 0.25)',
                      borderColor: 'rgba(0, 151, 167, 0.6)',
                    },
                  }}
                >
                  <DashboardIcon sx={{ fontSize: '1.1rem', marginRight: '8px' }} />
                  Admin
                </Button>
                <Menu
                  anchorEl={adminMenuAnchorEl}
                  open={Boolean(adminMenuAnchorEl)}
                  onClose={handleAdminMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: '12px',
                      marginTop: '12px',
                      backdropFilter: 'blur(20px)',
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 20px 64px rgba(0, 0, 0, 0.3)',
                      minWidth: '280px',
                      '& .MuiMenuItem-root': {
                        padding: '12px 16px',
                        margin: '4px 8px',
                        borderRadius: '8px',
                        color: '#ffffff',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 151, 167, 0.15)',
                        },
                      },
                      '& .MuiMenuItem-root[disabled]': {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      },
                      '& .MuiDivider-root': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        margin: '8px 0',
                      },
                    },
                  }}
                >
                  <MenuItem disabled>Dashboard & Reports</MenuItem>
                  <MenuItem onClick={() => { handleNavigation('admin-dashboard'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <DashboardIcon sx={{ fontSize: '1.2rem', color: '#26c6da' }} />
                    <Typography>Admin Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('reports'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <BarChartIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>Reports</Typography>
                  </MenuItem>
                  <Divider />

                  <MenuItem disabled>Management</MenuItem>
                  <MenuItem onClick={() => { handleNavigation('users-management'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <PeopleIcon sx={{ fontSize: '1.2rem', color: '#26c6da' }} />
                    <Typography>Users</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleNavigation('departments-manage'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <PeopleIcon sx={{ fontSize: '1.2rem', color: '#0097a7' }} />
                    <Typography>Departments</Typography>
                  </MenuItem>
                  <Divider />

                  <MenuItem disabled>Configuration</MenuItem>
                  <MenuItem onClick={() => { handleNavigation('forms-configuration'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <SettingsIcon sx={{ fontSize: '1.2rem', color: '#26c6da' }} />
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
                  <Divider />

                  <MenuItem disabled>System</MenuItem>
                  <MenuItem onClick={() => { handleNavigation('system-information'); handleAdminMenuClose(); }} sx={{ gap: '12px' }}>
                    <InfoIcon sx={{ fontSize: '1.2rem', color: '#26c6da' }} />
                    <Typography>System Information</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Spacer - Right */}
          <Box sx={{ flex: 1 }} />

          {/* Right Side Actions - Notifications & Profile */}
          <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
            {/* Notifications (Admin Only) */}
            {isAdminLoggedIn && (
              <Tooltip title="View notifications">
                <IconButton
                  onClick={(e) => setNotificationAnchorEl(e.currentTarget)}
                  sx={{
                    color: '#ffffff',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 151, 167, 0.15)',
                      color: '#26c6da',
                    },
                  }}
                >
                  <Badge badgeContent={3} sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ff6b6b',
                      color: '#ff6b6b',
                      boxShadow: '0 0 0 2px rgba(15, 23, 42, 1), 0 0 8px rgba(255, 107, 107, 0.5)',
                    }
                  }}>
                    <CircleNotificationsIcon sx={{ fontSize: '1.3rem' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* Admin Profile Menu */}
            {isAdminLoggedIn ? (
              <>
                <Button
                  onClick={handleAdminProfileMenuOpen}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 151, 167, 0.15)',
                      borderColor: 'rgba(0, 151, 167, 0.4)',
                    },
                    textTransform: 'none',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: getAvatarColor(adminName),
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {getInitials(adminName)}
                  </Avatar>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '2px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1,
                      }}
                    >
                      {adminName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.7rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      Administrator
                    </Typography>
                  </Box>
                </Button>
                <Menu
                  anchorEl={adminAnchorEl}
                  open={Boolean(adminAnchorEl)}
                  onClose={handleAdminProfileMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: '12px',
                      marginTop: '12px',
                      backdropFilter: 'blur(20px)',
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 20px 64px rgba(0, 0, 0, 0.3)',
                      minWidth: '220px',
                      '& .MuiMenuItem-root': {
                        padding: '12px 16px',
                        margin: '4px 8px',
                        borderRadius: '8px',
                        color: '#ffffff',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 151, 167, 0.15)',
                        },
                      },
                      '& .MuiDivider-root': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        margin: '8px 0',
                      },
                    },
                  }}
                >
                  <MenuItem disabled sx={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'default' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: getAvatarColor(adminName),
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                        }}
                      >
                        {getInitials(adminName)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                          {adminName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Admin Account
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      onAdminLogout();
                      handleAdminProfileMenuClose();
                    }}
                    sx={{ gap: '12px', color: '#ff6b6b' }}
                  >
                    <LogoutIcon sx={{ fontSize: '1.2rem' }} />
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={onAdminLoginClick}
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #0097a7 0%, #26c6da 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 16px rgba(0, 151, 167, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(0, 151, 167, 0.4)',
                  },
                }}
              >
                Admin Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Notification Center */}
      <NotificationCenter
        anchorEl={notificationAnchorEl}
        onClose={() => setNotificationAnchorEl(null)}
        onSettingsClick={() => {
          setNotificationAnchorEl(null);
          handleNavigation('notification-settings');
        }}
      />
    </>
  );
};
