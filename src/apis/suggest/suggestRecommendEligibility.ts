import axios from '@/lib/axios';

export interface SuggestRecommendEligibilityResponse {
  is_eligible: boolean;
}

interface SuggestRecommendEligibilityRequest {
  danji_id: number;
}

export default async function suggestRecommendEligibility(req: SuggestRecommendEligibilityRequest) {
  try {
    const { data } = await axios.post('/danji/suggest/recommend/eligibility', {
      ...req,
    });
    return data as SuggestRecommendEligibilityResponse & ErrorResponse;
  } catch (e) {
    return null;
  }
}
