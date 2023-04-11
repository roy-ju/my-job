import axios from '@/lib/axios';

export interface CheckDuplicateResponse {
  duplicated: boolean;
  duplicated_buy_or_rents: any;
  eligible_buy_or_rents: number[];
  partial_rent_area: boolean;
  can_create: boolean;
}

export default async function checkDuplicate({
  roadNameAddress,
  dong,
  ho,
}: {
  roadNameAddress: string;
  dong: string;
  ho: string;
}) {
  try {
    const { data } = await axios.post('/listing/checkduplicate/v2', {
      road_name_address: roadNameAddress,
      dong,
      ho,
    });
    return data as CheckDuplicateResponse;
  } catch (e) {
    return null;
  }
}
