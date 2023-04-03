import axios from 'axios';

export type RefreshTokenResponse = {
  access_token: string;
  exp: number;
  refresh_token: string;
} & ErrorResponse;

export async function refresh(req: { token: string }): Promise<RefreshTokenResponse | null> {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_NEGOCIO_REST_API_BASE_URL}/user/auth/refresh`, req);
    return data as RefreshTokenResponse;
  } catch (e) {
    return null;
  }
}
