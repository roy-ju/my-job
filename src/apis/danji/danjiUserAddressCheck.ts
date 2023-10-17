import axios from '@/lib/axios';

export type DanjiUserAddressCheckResponse = {
  has_user_address: boolean;
  can_create_listing: boolean;
} & ErrorResponse;

export default async function danjiUserAddressCheck(req: {
  danji_id: number;
}): Promise<DanjiUserAddressCheckResponse | null> {
  try {
    const { data } = await axios.post('/danji/useraddress/check', req);
    return data;
  } catch (e) {
    return null;
  }
}
