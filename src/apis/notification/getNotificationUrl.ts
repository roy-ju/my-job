import axios from '@/lib/axios';

export default async function getNotificationUrl(id: number) {
  try {
    return await axios.post('/notification/url', {
      notification_id: id,
    });
  } catch (e) {
    return null;
  }
}
