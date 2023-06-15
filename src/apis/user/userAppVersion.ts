import axios from '@/lib/axios';

export default async function getUserAppVersion(version_name: string, platform: number) {
  try {
    const { data } = await axios.post('/user/appversion/get', { version_name, platform });
    return data as ErrorResponse;
  } catch (e) {
    return null;
  }
}
