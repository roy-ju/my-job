import axios from '@/lib/axios';

export default async function sendPhoneVerificationCode(phone: string) {
  try {
    return await axios.post('/user/phone/verification/sms', { phone });
  } catch (e) {
    return null;
  }
}
