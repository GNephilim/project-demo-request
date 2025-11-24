import { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface AdminHeaderProps {
  adminName: string;
  onLogout: () => void;
  onNavigate: (section: string) => void;
  currentSection: string;
  unreadNotifications: number;
}

const DRAWER_WIDTH = 240;

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  adminName,
  onLogout,
  onNavigate,
  currentSection,
  unreadNotifications,
}) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    home: true,
    management: false,
    configuration: false,
    system: false,
  });
  const [adminMenuAnchor, setAdminMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleMenuToggle = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleNavigationClick = (section: string) => {
    onNavigate(section);
  };

  const handleAdminMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAdminMenuAnchor(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminMenuAnchor(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchor(null);
  };

  const menuItems = [
    {
      key: 'home',
      label: 'Home',
      icon: <HomeIcon sx={{ fontSize: '1.25rem' }} />,
      submenu: [
        { id: 'admin-dashboard', label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: '1.1rem' }} /> },
        { id: 'demo-dashboard', label: 'Demo Requests', icon: <DashboardIcon sx={{ fontSize: '1.1rem' }} /> },
      ],
    },
    {
      key: 'management',
      label: 'Management',
      icon: <PeopleIcon sx={{ fontSize: '1.25rem' }} />,
      submenu: [
        { id: 'users-management', label: 'Users', icon: <PeopleIcon sx={{ fontSize: '1.1rem' }} /> },
        { id: 'departments-manage', label: 'Departments', icon: <PeopleIcon sx={{ fontSize: '1.1rem' }} /> },
      ],
    },
    {
      key: 'configuration',
      label: 'Configuration',
      icon: <SettingsIcon sx={{ fontSize: '1.25rem' }} />,
      submenu: [
        { id: 'forms-configuration', label: 'Request Forms', icon: <EditIcon sx={{ fontSize: '1.1rem' }} /> },
        { id: 'site-settings', label: 'Site Settings', icon: <SettingsIcon sx={{ fontSize: '1.1rem' }} /> },
        { id: 'database-settings', label: 'Database', icon: <SettingsIcon sx={{ fontSize: '1.1rem' }} /> },
      ],
    },
    {
      key: 'system',
      label: 'System',
      icon: <InfoIcon sx={{ fontSize: '1.25rem' }} />,
      submenu: [
        { id: 'system-information', label: 'System Info', icon: <InfoIcon sx={{ fontSize: '1.1rem' }} /> },
      ],
    },
  ];

  return (
    <>
      {/* Admin Top Bar */}
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #1a2e4a 0%, #233d55 100%)',
          boxShadow: '0 4px 20px rgba(26, 46, 74, 0.15)',
          zIndex: 1300,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              padding: '12px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Box
                sx={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: '1.2rem',
                }}
              >
                D
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px',
                  }}
                >
                  DemoHub
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#a0c4d4',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  ADMIN PANEL
                </Typography>
              </Box>
            </Box>

            {/* Right Actions */}
            <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton
                  onClick={handleNotificationMenuOpen}
                  sx={{
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <Badge badgeContent={unreadNotifications} sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff6b6b' } }}>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Notification Menu */}
              <Menu
                anchorEl={notificationAnchor}
                open={Boolean(notificationAnchor)}
                onClose={handleNotificationMenuClose}
                PaperProps={{
                  sx: {
                    borderRadius: '8px',
                    marginTop: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    minWidth: '280px',
                  },
                }}
              >
                <MenuItem sx={{ fontWeight: 600, color: '#1a2e4a', cursor: 'default' }}>
                  Recent Notifications
                </MenuItem>
                <Divider />
                <MenuItem>New demo request from Sales Team</MenuItem>
                <MenuItem>3 pending demo approvals</MenuItem>
                <MenuItem>Database backup completed</MenuItem>
                <MenuItem>System update available</MenuItem>
              </Menu>

              {/* Admin User Profile */}
              <Tooltip title="Admin Settings">
                <IconButton
                  onClick={handleAdminMenuOpen}
                  sx={{
                    padding: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                    }}
                  >
                    {adminName.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>

              {/* Admin Menu */}
              <Menu
                anchorEl={adminMenuAnchor}
                open={Boolean(adminMenuAnchor)}
                onClose={handleAdminMenuClose}
                PaperProps={{
                  sx: {
                    borderRadius: '8px',
                    marginTop: '8px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <MenuItem disabled sx={{ fontWeight: 600, color: '#1a2e4a' }}>
                  Admin: {adminName}
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleAdminMenuClose();
                    handleNavigationClick('admin-profile');
                  }}
                >
                  <AccountCircleIcon sx={{ marginRight: '8px', color: '#1a2e4a' }} />
                  Profile Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleAdminMenuClose();
                    handleNavigationClick('admin-audit');
                  }}
                >
                  <DashboardIcon sx={{ marginRight: '8px', color: '#1a2e4a' }} />
                  Audit Logs
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleAdminMenuClose();
                    onLogout();
                  }}
                  sx={{ color: '#d32f2f' }}
                >
                  <LogoutIcon sx={{ marginRight: '8px' }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e8e8e8',
            top: '64px',
            height: 'calc(100vh - 64px)',
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ padding: '8px 0' }}>
            {menuItems.map((menu) => (
              <Box key={menu.key}>
                <ListItemButton
                  onClick={() => handleMenuToggle(menu.key)}
                  sx={{
                    padding: '10px 12px',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: '#555555',
                      minWidth: '36px',
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.label}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#1a1a1a',
                    }}
                  />
                  {openMenus[menu.key] ? <ExpandLessIcon sx={{ fontSize: '1.2rem' }} /> : <ExpandMoreIcon sx={{ fontSize: '1.2rem' }} />}
                </ListItemButton>

                <Collapse in={openMenus[menu.key]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.submenu.map((item) => (
                      <ListItemButton
                        key={item.id}
                        onClick={() => handleNavigationClick(item.id)}
                        selected={currentSection === item.id}
                        sx={{
                          paddingLeft: '44px',
                          paddingY: '8px',
                          backgroundColor: currentSection === item.id ? '#e3f2fd' : 'transparent',
                          borderLeft: currentSection === item.id ? '2px solid #0097a7' : 'none',
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: currentSection === item.id ? '#0097a7' : '#888888',
                            minWidth: '32px',
                            fontSize: '1rem',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: '0.85rem',
                            fontWeight: currentSection === item.id ? 700 : 500,
                            color: currentSection === item.id ? '#0097a7' : '#555555',
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
