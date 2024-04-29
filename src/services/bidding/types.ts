export interface BiddingInfoResponse {
  id: number;
  listing_id: number;
  user_id: number;
  status: number;
  reject_reason: string;
  accepting_target_price: boolean | null;
  bidding_trade_or_deposit_price: number;
  bidding_monthly_rent_fee: number;
  can_have_more_contract_amount: boolean | null;
  contract_amount: number;
  can_have_more_interim_amount: boolean | null;
  interim_amount: number;
  can_have_earlier_remaining_amount_payment_time: boolean | null;
  remaining_amount_payment_time: string | null;
  remaining_amount_payment_time_type: number;
  move_in_date: string | null;
  move_in_date_type: number;
  etcs: string | null;
  description: string | null;
  trade_price: number | null;
  deposit: number;
  monthly_rent_fee: number;
  accepted_type: number | null;
  cancel_type: number | null;
  updated_time: string;
  created_time: string;
}

export type BiddingCreateResponse = {
  can_receive_suggest: boolean;
  bidding_id: number;
};
