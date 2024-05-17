import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

import { BiddingInfoResponse } from '@/services/bidding/types';

interface Args {
  biddingInfo: BiddingInfoResponse;

  acceptingTargetPrice: boolean;

  price: string;
  monthlyRentFee: string;

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

    move_in_date: args.moveInDate?.toISOString(),
    move_in_date_type: getDateType(args.moveInDateType),

    etcs: args.etcs.join(','),
    description: args.description,
  };

  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);

  return params;
}
