import axios from '@/lib/axios';

export default async function updateNotificationConfig(notification: string, isOn: boolean) {
  await axios.post(`/notification/config/${notification}`, { notification_on: isOn });
}
