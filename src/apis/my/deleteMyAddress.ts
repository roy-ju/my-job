import axios from '@/lib/axios';

interface deleteMyAddressRequest {
  user_address_id: number
}

export default async function deleteMyAddress(req: deleteMyAddressRequest) {
  try {
    await axios.post('/my/address/delete', req);
    return null;
  } catch (e) {
    return null;
  }
}
