import axios from '@/lib/axios';

export type UpdateFCMTokenResponse = ErrorResponse;

export async function updateFcmToken(data: {
  token: string;
  device_id: string;
}): Promise<UpdateFCMTokenResponse | null> {
  return axios.post('/user/update/fcmtoken', data);
}

export async function deleteFcmToken(data: { token: string }): Promise<UpdateFCMTokenResponse | null> {
  return axios.post('/user/delete/fcmtoken', data);
}
