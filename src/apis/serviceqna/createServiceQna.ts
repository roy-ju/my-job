import axios from '@/lib/axios';

export default async function createServiceQna(message: string) {
  try {
    return await axios.post(`/my/serviceqna/create`, { message });
  } catch (e) {
    return null;
  }
}
