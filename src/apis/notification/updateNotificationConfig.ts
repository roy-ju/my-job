import axios from '@/lib/axios';

export default async function updateNotificationConfig(notification: string, isOn: boolean) {
  try {
    return await axios.post(`/notification/config/${notification}`, { notification_on: isOn });
  } catch (e) {
    return null;
  }
}
