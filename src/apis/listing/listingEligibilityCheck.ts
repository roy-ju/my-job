import axios from '@/lib/axios';

export type ListingEligibilityCheckResponse = {
  is_eligible: true;
} & ErrorResponse;

export default async function listingEligibilityCheck(req: {
  danji_id?: number | null;
}): Promise<ListingEligibilityCheckResponse | null> {
  try {
    const { data } = await axios.post('/listing/eligibility/check', req);
    return data;
  } catch (e) {
    return null;
  }
}
