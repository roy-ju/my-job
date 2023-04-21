import axios from '@/lib/axios';

export default async function createSuggestRegional(args: any) {
  try {
    const { data } = await axios.post('/suggest/regional/create', { ...args });
    return data;
  } catch (e) {
    return null;
  }
}
