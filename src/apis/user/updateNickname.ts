import axios from '@/lib/axios';

export default async function updateNickname(nickname: string) {
  try {
    const { data } = await axios.post('/my/nickname/update', { nickname });
    return data as ErrorResponse;
  } catch (e) {
    return null;
  }
}
