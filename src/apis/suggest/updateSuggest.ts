import axios from '@/lib/axios';

export default async function updateSuggest(args: any) {
  try {
    const { data } = await axios.post('/suggest/update', { ...args });
    return data;
  } catch (e) {
    return null;
  }
}
