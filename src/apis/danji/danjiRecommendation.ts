import axios from '@/lib/axios';

type DanjiSuggestEligibilityCheckResponse = {
  eligible: true;
} & ErrorResponse;

export default async function danjiSuggestEligibilityCheck(
  bubjungdong_code: string,
): Promise<DanjiSuggestEligibilityCheckResponse | null> {
  try {
    const { data } = await axios.post('/suggest/eligibility/check', { bubjungdong_code });
    return data as DanjiSuggestEligibilityCheckResponse;
  } catch (e) {
    return null;
  }
}
