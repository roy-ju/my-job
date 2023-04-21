import axios from 'axios';

export async function danjiSuggestEligibilityCheck(data: { bubjungdong_code: string }): Promise<ErrorResponse | null> {
  try {
    return await axios.post('/suggest/eligibility/check', data);
  } catch (e) {
    return null;
  }
}
