import axios from '@/lib/axios';

export interface LoginByCiRequest {
  encData: string;
  integrityValue: string;
  kie: string;
  tokenVersionId: string;
  type: number;
}

export interface LoginCIResponse extends ErrorResponse {
  access_token: string;
  email: string;
  exp: number;
  reactivated: boolean;
  refresh_token: string;
  social_login_type: number;
}

export default async function loginByCi(req: LoginByCiRequest): Promise<LoginCIResponse | null> {
  const { data } = await axios.post('/user/login/ci', {
    enc_data: req.encData,
    integrity_value: req.integrityValue,
    kie: req.kie,
    token_version_id: req.tokenVersionId,
    type: req.type,
  });
  return data;
}
