import axios from '@/lib/axios';

export type UpdateCIResponse = {
  coupon_created: boolean;
} & ErrorResponse;

export async function updateCi(req: {
  encData: string;
  integrityValue: string;
  kie: string;
  tokenVersionId: string;
  type: number;
}): Promise<UpdateCIResponse | null> {
  const { data } = await axios.post('/user/update/ci', {
    enc_data: req.encData,
    integrity_value: req.integrityValue,
    kie: req.kie,
    token_version_id: req.tokenVersionId,
    type: req.type,
  });
  return data;
}
