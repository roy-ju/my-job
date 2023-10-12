import axios from '@/lib/axios';

export default async function completeAgreement(params: {
  enc_data: string;
  integrity_value: string;
  kie: string;
  loi: number;
  token: string;
  token_version_id: string;
  type: number;
}): Promise<ErrorResponse | null> {
  const { data } = await axios.post('/my/agreement/complete', params);
  return data;
}
