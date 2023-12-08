import axios from '@/lib/axios';

export type SendSMSRequest = {
  user_address_id: number
  name: string;
  phone: string;
};

export type SendSMSResponse = null | ErrorResponse;

export default async function addressAgreementPhone(req: SendSMSRequest): Promise<SendSMSResponse | null> {
  try {
    const { data } = await axios.post('/my/agreement/sendsms', req);
    return data;
  } catch {
    return null;
  }
}
