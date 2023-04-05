import axios from '@/lib/axios';

export type GetNiceEncDataResponse = {
  enc_data: string;
  integrity_value: string;
  token_version_id: string;
} & ErrorResponse;

export default async function getNiceEncData(req: {
  returnUrl: string;
  type: number;
}): Promise<GetNiceEncDataResponse | null> {
  const { data } = await axios.post('/user/niceid/encdata/get', {
    return_url: req.returnUrl,
    type: req.type,
  });
  return data;
}
