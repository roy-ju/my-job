import axios from '@/lib/axios';

export type CheckNicknameResponse = ErrorResponse;

export default async function checkNickname(nickname: string): Promise<CheckNicknameResponse | null> {
  try {
    const { data } = await axios.post('/user/checknickname', { nickname });
    return data;
  } catch (e) {
    return null;
  }
}
