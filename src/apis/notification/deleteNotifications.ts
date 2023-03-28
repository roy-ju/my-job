import axios from '@/lib/axios';

export default async function deleteNotifications(ids: string) {
  await axios.post('/notification/delete', { ids });
}
