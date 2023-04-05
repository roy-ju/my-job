import axios from '@/lib/axios';

export default async function updatePhone(phone: string, code: string) {
  try {
    const { data } = await axios.post('/my/phone/update', { phone, verification_number: code });
    return data as ErrorResponse;
  } catch (e) {
    return null;
  }
}
