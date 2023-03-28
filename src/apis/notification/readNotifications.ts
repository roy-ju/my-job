import axios from '@/lib/axios';

export default async function readNotifications() {
  await axios.post('/notification/read');
}
