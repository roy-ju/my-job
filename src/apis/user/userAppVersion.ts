import axios from '@/lib/axios';

export type UserAppVersionResponse = {
  id: number;
  version_name: string;
  latest_version_name: string;
  is_latest: boolean
  platform: number
  stale: boolean
  released_time: string
  created_time: string
} & ErrorResponse;

export default async function getUserAppVersion(version_name: string, platform: number) {
  try {
    const { data } = await axios.post('/user/appversion/get', { version_name, platform });
    return data as UserAppVersionResponse;
  } catch (e) {
    return null;
  }
}
