import axios from '@/lib/axios';

export default async function deregister(reasons: string) {
  try {
    await axios.post('/my/user/deregister', { reasons });
    return true;
  } catch (e) {
    return false;
  }
}
