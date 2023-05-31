import axios from '@/lib/axios';

export default async function deleteNotifications(ids: string) {
  try {
    return await axios.post('/notification/delete', { ids });
  } catch (e) {
    return null;
  }
}
