import axios from '@/lib/axios';

export interface GetListingSummaryResponse {
  listing_id: number;
  realestate_type: number;
  listing_title: string;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  bidding_trade_or_deposit_price: number;
  bidding_monthly_rent_fee: number;
  negotiation_or_auction: number;
  buy_or_rent: number;
  negotiation_target: number;
  gonggeup_area: string;
  jeonyoung_area: string;
}

export default async function getListingSummary({ listingId }: { listingId: number }) {
  try {
    const { data } = await axios.post('/map/listing/summary', {
      listing_id: listingId,
    });
    return data as GetListingSummaryResponse;
  } catch (e) {
    return null;
  }
}
