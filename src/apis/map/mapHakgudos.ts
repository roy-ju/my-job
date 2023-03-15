import axios from '@/lib/axios';

export interface GetHakgudoResponse {
  list: {
    hakgudo_id: string;
    hakgudo_name: string;
    polygons: string;
  }[];
}

export default async function getHakgudo(schoolID: string) {
  try {
    const { data } = await axios.post('/map/hakgudo', { school_id: schoolID });
    return data as GetHakgudoResponse;
  } catch (e) {
    return null;
  }
}
