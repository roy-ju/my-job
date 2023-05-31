import axios from '@/lib/axios';

export default async function updateBidding(req: any) {
  try {
    if (req.accepting_target_price === true) {
      req = {
        ...req,
        bidding_trade_or_deposit_price: 0,
        bidding_monthly_rent_fee: 0,

        can_have_more_contract_amount: false,
        contract_amount: 0,
        can_have_more_interim_amount: false,
        interim_amount: 0,
        can_have_earlier_remaining_amount_payment_time: null,
        remaining_amount_payment_time: null,
        remaining_amount_payment_time_type: null,
        move_in_date: null,
        move_in_date_type: null,

        etcs: null,
        description: null,
      };
    }

    const { data } = await axios.post('/bidding/update', { ...req });

    return data as ErrorResponse;
  } catch (e) {
    return null;
  }
}
