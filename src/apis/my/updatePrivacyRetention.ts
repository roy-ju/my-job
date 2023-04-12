import axios from '@/lib/axios';

export interface UpdatePrivacyRequest {
  privacy_retention_type: number;
}

export async function updatePrivacyRetention(req: UpdatePrivacyRequest) {
  try {
    await axios.post('/my/privacyrentension/update', req);
    return null;
  } catch (e) {
    return null;
  }
}
