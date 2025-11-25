import { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  IconButton,
  Button,
  Tab,
  Tabs,
  Badge,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  InfoOutlined as InfoIcon,
  WarningAmberOutlined as WarningIcon,
  ErrorOutlineOutlined as ErrorIcon,
  Notifications as NotificationsIcon,
  DeleteOutline as DeleteIcon,
  DoneAll as DoneAllIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import type { Notification } from '../types/notification';
import { notificationManager } from '../services/notificationManager';

interface NotificationCenterProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSettingsClick: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  anchorEl,
  onClose,
  onSettingsClick,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(
    notificationManager.getNotifications()
  );
  const [tabValue, setTabValue] = useState(0);

  const stats = notificationManager.getNotificationStats();
  const unreadNotifications = notifications.filter((n) => !n.read);

  const handleMarkAsRead = (id: string) => {
    notificationManager.markAsRead(id);
    setNotifications([...notificationManager.getNotifications()]);
  };

  const handleDelete = (id: string) => {
    notificationManager.deleteNotification(id);
    setNotifications([...notificationManager.getNotifications()]);
  };

  const handleMarkAllAsRead = () => {
    notificationManager.markAllAsRead();
    setNotifications([...notificationManager.getNotifications()]);
  };

  const handleClearAll = () => {
    notificationManager.clearAllNotifications();
    setNotifications([...notificationManager.getNotifications()]);
  };

  const getNotificationIcon = (notification: Notification) => {
    const iconProps = { sx: { fontSize: '1.2rem' } };
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon {...iconProps} sx={{ ...iconProps.sx, color: '#4caf50' }} />;
      case 'warning':
        return <WarningIcon {...iconProps} sx={{ ...iconProps.sx, color: '#ff9800' }} />;
      case 'error':
        return <ErrorIcon {...iconProps} sx={{ ...iconProps.sx, color: '#f44336' }} />;
      case 'demo_request':
      case 'user_activity':
      case 'system':
      case 'info':
      default:
        return <InfoIcon {...iconProps} sx={{ ...iconProps.sx, color: '#0097a7' }} />;
    }
  };

  const filteredNotifications =
    tabValue === 0 ? notifications : unreadNotifications;

  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 64px rgba(0, 0, 0, 0.3)',
          width: '420px',
          maxHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <NotificationsIcon sx={{ fontSize: '1.3rem' }} />
          Notifications
        </Typography>
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <IconButton
            size="small"
            onClick={onSettingsClick}
            sx={{
              color: '#ffffff',
              '&:hover': { backgroundColor: 'rgba(0, 151, 167, 0.15)' },
            }}
            title="Notification settings"
          >
            <SettingsIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: '#ffffff',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <CloseIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, value) => setTabValue(value)}
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          '& .MuiTabs-indicator': { backgroundColor: '#26c6da' },
          '& .MuiTab-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            '&.Mui-selected': { color: '#ffffff' },
          },
        }}
      >
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              All
              {stats.total > 0 && (
                <Badge badgeContent={stats.total} sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#0097a7',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    minWidth: '18px',
                  },
                }} />
              )}
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Unread
              {stats.unread > 0 && (
                <Badge badgeContent={stats.unread} sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#26c6da',
                    color: '#0f172a',
                    fontSize: '0.65rem',
                    minWidth: '18px',
                  },
                }} />
              )}
            </Box>
          }
        />
      </Tabs>

      {/* Notifications List */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 151, 167, 0.3)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(0, 151, 167, 0.5)',
            },
          },
        }}
      >
        {filteredNotifications.length === 0 ? (
          <Box
            sx={{
              padding: '32px 16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <NotificationsIcon sx={{ fontSize: '2.5rem', color: 'rgba(255, 255, 255, 0.3)' }} />
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.95rem' }}>
              {tabValue === 0 ? 'No notifications yet' : 'All caught up!'}
            </Typography>
          </Box>
        ) : (
          filteredNotifications.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                backgroundColor: !notification.read ? 'rgba(0, 151, 167, 0.05)' : 'transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 151, 167, 0.1)',
                },
              }}
            >
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Box sx={{ flexShrink: 0, paddingTop: '2px' }}>
                  {getNotificationIcon(notification)}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#ffffff',
                      }}
                    >
                      {notification.title}
                    </Typography>
                    {!notification.read && (
                      <Box
                        sx={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#26c6da',
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '8px',
                      lineHeight: 1.4,
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      {formatTime(notification.timestamp)}
                    </Typography>
                    {notification.actionUrl && (
                      <Button
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          textTransform: 'none',
                          padding: '4px 8px',
                          color: '#26c6da',
                          '&:hover': { backgroundColor: 'rgba(0, 151, 167, 0.15)' },
                        }}
                      >
                        {notification.actionLabel || 'View'}
                      </Button>
                    )}
                    <Box sx={{ flex: 1 }} />
                    {!notification.read && (
                      <IconButton
                        size="small"
                        onClick={() => handleMarkAsRead(notification.id)}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.5)',
                          '&:hover': { color: '#26c6da' },
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: '0.9rem' }} />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(notification.id)}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        '&:hover': { color: '#ff6b6b' },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Footer Actions */}
      {notifications.length > 0 && (
        <Box
          sx={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '8px',
            justifyContent: 'space-between',
          }}
        >
          {unreadNotifications.length > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllAsRead}
              startIcon={<DoneAllIcon sx={{ fontSize: '0.95rem' }} />}
              sx={{
                fontSize: '0.8rem',
                textTransform: 'none',
                color: '#26c6da',
                '&:hover': { backgroundColor: 'rgba(0, 151, 167, 0.15)' },
              }}
            >
              Mark All as Read
            </Button>
          )}
          <Box sx={{ flex: 1 }} />
          <Button
            size="small"
            onClick={handleClearAll}
            sx={{
              fontSize: '0.8rem',
              textTransform: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              '&:hover': { color: '#ff6b6b' },
            }}
          >
            Clear All
          </Button>
        </Box>
      )}
    </Popover>
  );
};

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
}
