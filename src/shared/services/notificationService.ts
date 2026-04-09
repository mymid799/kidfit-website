export interface Notification { 
    id: string; 
    title: string; 
    content: string; 
    type: string; 
    date: string; 
    read: boolean; 
    action?: string; 
    confirmed?: boolean; 
    target?: string;
}
export const notificationService = {
  getNotifications: (): Notification[] => [],
  getTeacherNotifications: (): Notification[] => [],
  markAsRead: (id: string) => {},
  markAllAsRead: () => {},
  confirmAction: (id: string) => {},
  confirmNotification: (id: string) => {},
  sendNotification: (n: any) => {},
  addNotification: (n: any) => {}
};
export default notificationService;
