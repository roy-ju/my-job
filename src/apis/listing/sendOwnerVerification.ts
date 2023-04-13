import axios from '@/lib/axios';

export type SendSMSRequest = {
  listing_id: number;
  name: string;
  phone: string;
};

export type SendSMSResponse = null | ErrorResponse;

export default async function sendOwnerVerification(req: SendSMSRequest): Promise<SendSMSResponse | null> {
  try {
    const { data } = await axios.post('/my/listing/agreement/sendsms', req);
    return data;
  } catch {
    return null;
  }
}
