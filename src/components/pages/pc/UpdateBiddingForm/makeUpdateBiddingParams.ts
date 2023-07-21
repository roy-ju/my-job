import { GetBiddingInfoResponse } from '@/apis/bidding/getBiddingInfo';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

interface Args {
  biddingInfo: GetBiddingInfoResponse;

  acceptingTargetPrice: boolean;
  price: string;
  monthlyRentFee: string;
  canHaveMoreContractAmount: boolean | null;
  contractAmount: string;
  canHaveMoreInterimAmount: boolean | null;
  interimAmount: string;
  canHaveEarlierRemainingAmountDate: boolean | null;
  remainingAmountDate: Date | null;
  remainingAmountDateType: string;
  moveInDate: Date | null;
  moveInDateType: string;
  etcs: string[];
  description: string;
}

function getDateType(value?: string) {
  if (value === '이전') {
    return 1;
  }
  if (value === '이후') {
    return 2;
  }
  if (value === '당일') {
    return 3;
  }
  return undefined;
}

export default function makeUpdateBiddingParams(args: Args) {
  const { id: biddingID, ...others } = args.biddingInfo;

  const params: Record<string, unknown> = {
    ...others,
    bidding_id: biddingID,
    accepting_target_price: args.acceptingTargetPrice,

    bidding_trade_or_deposit_price: convertPriceInputToNumber(args.price),
    bidding_monthly_rent_fee: convertPriceInputToNumber(args.monthlyRentFee),

    can_have_more_contract_amount: args.canHaveMoreContractAmount ?? false,
    contract_amount: convertPriceInputToNumber(args.contractAmount),
    can_have_more_interim_amount: args.canHaveMoreInterimAmount ?? false,
    interim_amount: convertPriceInputToNumber(args.interimAmount),
    can_have_earlier_remaining_amount_payment_time: args.canHaveEarlierRemainingAmountDate,
    remaining_amount_payment_time: args.remainingAmountDate?.toISOString(), // 잔금 지급일
    remaining_amount_payment_time_type: getDateType(args.remainingAmountDateType), // 잔금 지급일 이전/이후 1: 이전 2: 이후
    move_in_date: args.moveInDate?.toISOString(),
    move_in_date_type: getDateType(args.moveInDateType),

    etcs: args.etcs.join(','),
    description: args.description,
  };

  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);

  return params;
}