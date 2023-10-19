import axios from '@/lib/axios';

type suggestEligibilityCheckResponse = {
  eligible: true;
} & ErrorResponse;

export async function suggestEligibilityCheck(
  bubjungdong_code: string,
  danji_id: number | null = null,
): Promise<suggestEligibilityCheckResponse | null> {
  try {
    const { data } = await axios.post('/suggest/eligibility/check', {
      bubjungdong_code,
      danji_id: danji_id && danji_id,
    });
    return data as suggestEligibilityCheckResponse;
  } catch (e) {
    return null;
  }
}
