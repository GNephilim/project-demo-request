export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'demo_request' | 'user_activity' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  icon?: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  demoRequestAlerts: boolean;
  userActivityAlerts: boolean;
  systemAlerts: boolean;
  notificationFrequency: 'instant' | 'hourly' | 'daily' | 'weekly';
  doNotDisturbStart: string; // HH:mm format
  doNotDisturbEnd: string;   // HH:mm format
  doNotDisturbEnabled: boolean;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
}
