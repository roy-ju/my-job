import axios from '@/lib/axios';

export default async function readNotifications() {
  try {
    return await axios.post('/notification/read');
  } catch (e) {
    return null;
  }
}
