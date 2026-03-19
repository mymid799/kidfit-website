export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'emergency' | 'event' | 'general';
  date: string;
  sender: string;
  read: boolean;
  confirmed?: boolean;
}

class NotificationService {
  private notifications: Notification[] = [
    {
      id: '1',
      title: 'Thông báo nghỉ học đột xuất: Sự cố vỡ đường ống nước',
      content: 'Do sự cố vỡ đường ống nước trong khu vực, KidsFit STEAM sẽ đóng cửa sớm vào lúc 1:00 chiều nay. Ba mẹ vui lòng sắp xếp đón bé sớm. Các lớp ngoại khóa chiều nay sẽ tạm hủy.',
      type: 'emergency',
      date: '10:45 AM Hôm nay',
      sender: 'Nhà trường',
      read: false,
    },
    {
      id: '2',
      title: 'Triển lãm Robotics Mùa Xuân sắp tới',
      content: 'Mời ba mẹ cùng tham gia buổi sáng sáng tạo, nơi Leo và các bạn sẽ trình bày những dự án LEGO Robotics của mình tại sảnh chính. Có phục vụ nhẹ cho ba mẹ.',
      type: 'event',
      date: 'Hôm qua',
      sender: 'Cô Minh Thư',
      read: true,
    }
  ];

  getNotifications() {
    return [...this.notifications];
  }

  addNotification(notification: Omit<Notification, 'id' | 'read' | 'date'>) {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      read: false,
      date: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN')
    };
    this.notifications = [newNotification, ...this.notifications];
    return newNotification;
  }

  markAsRead(id: string) {
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, read: true } : n);
  }

  confirmNotification(id: string) {
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, confirmed: true } : n);
  }
}

export const notificationService = new NotificationService();
