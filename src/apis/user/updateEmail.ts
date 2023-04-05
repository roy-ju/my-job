import axios from '@/lib/axios';

export default async function updateEmail(token: string, socialLoginType: number) {
  try {
    const { data } = await axios.post('/my/email/update', { token, social_login_type: socialLoginType });
    return data as ErrorResponse;
  } catch (e) {
    return null;
  }
}
