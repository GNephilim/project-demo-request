import type { Notification, NotificationPreferences, NotificationStats } from '../types/notification';

export class NotificationManager {
  private notifications: Notification[] = [];
  private preferences: NotificationPreferences = {
    emailNotifications: true,
    demoRequestAlerts: true,
    userActivityAlerts: true,
    systemAlerts: true,
    notificationFrequency: 'instant',
    doNotDisturbStart: '22:00',
    doNotDisturbEnd: '08:00',
    doNotDisturbEnabled: false,
  };

  // Initialize with mock notifications
  constructor() {
    this.initializeMockNotifications();
  }

  private initializeMockNotifications() {
    const now = new Date();
    this.notifications = [
      {
        id: '1',
        type: 'demo_request',
        title: 'New Demo Request',
        message: 'Sarah Johnson requested a demo of the DemoHub system',
        timestamp: new Date(now.getTime() - 5 * 60000),
        read: false,
        actionUrl: '/admin/demo-requests',
        actionLabel: 'View Request',
      },
      {
        id: '2',
        type: 'user_activity',
        title: 'New User Activity',
        message: 'Mike Chen completed the onboarding process',
        timestamp: new Date(now.getTime() - 15 * 60000),
        read: false,
        actionUrl: '/admin/users',
        actionLabel: 'View User',
      },
      {
        id: '3',
        type: 'system',
        title: 'System Maintenance',
        message: 'Database backup completed successfully',
        timestamp: new Date(now.getTime() - 1 * 3600000),
        read: true,
        actionUrl: '/admin/system',
        actionLabel: 'View Details',
      },
      {
        id: '4',
        type: 'demo_request',
        title: 'Demo Request Approved',
        message: 'Jennifer Lee approved the demo request from Q1 sales team',
        timestamp: new Date(now.getTime() - 2 * 3600000),
        read: false,
        actionUrl: '/admin/demo-requests',
        actionLabel: 'View',
      },
      {
        id: '5',
        type: 'success',
        title: 'Import Successful',
        message: '250 records imported from CSV file successfully',
        timestamp: new Date(now.getTime() - 24 * 3600000),
        read: true,
      },
    ];
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  getUnreadNotifications(): Notification[] {
    return this.notifications.filter((n) => !n.read);
  }

  getNotificationStats(): NotificationStats {
    const stats: NotificationStats = {
      total: this.notifications.length,
      unread: 0,
      byType: {
        info: 0,
        success: 0,
        warning: 0,
        error: 0,
        demo_request: 0,
        user_activity: 0,
        system: 0,
      },
    };

    this.notifications.forEach((notification) => {
      if (!notification.read) stats.unread++;
      stats.byType[notification.type]++;
    });

    return stats;
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find((n) => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.read = true));
  }

  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== notificationId);
  }

  clearAllNotifications(): void {
    this.notifications = [];
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    this.notifications.unshift(newNotification);
  }

  getPreferences(): NotificationPreferences {
    return this.preferences;
  }

  updatePreferences(preferences: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
  }
}

export const notificationManager = new NotificationManager();
