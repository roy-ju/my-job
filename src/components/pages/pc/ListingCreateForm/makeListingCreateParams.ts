import { CollateralType, DebtSuccessionType, InterimType } from '@/components/templates/ListingCreateForm/FormContext';
import { BuyOrRent } from '@/constants/enums';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

interface Args {
  isOwner: boolean;
  ownerName: string;
  ownerPhone: string;
  buyOrRent: number;
  price: string;
  monthlyRentFee: string;
  contractAmount: string;
  contractAmountNegotiable: boolean;
  remainingAmount: string;
  remainingAmountDate: Date | null;
  remainingAmountDateType: string;
  interims: InterimType[];

  debtSuccessionDeposit: string;
  debtSuccessionMiscs: DebtSuccessionType[];
  jeonsaeLoan: boolean;

  moveInDate: Date | null;
  moveInDateType: string;

  rentArea: string;
  rentTermYear: string;
  rentTermMonth: string;
  rentTermNegotiable: boolean;
  specialTerms: string;

  verandaExtended: boolean;
  verandaRemodelling: boolean;
  extraOptions: number[];

  collaterals: CollateralType[];

  quickSale: boolean;

  adminFee: string;

  listingPhotoUrls: string[];

  danjiPhotoUrls: string[];

  description: string;

  rentEndDate: Date | null;
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

export default function makeListingCreateParams(args: Args) {
  const collaterals = args.collaterals
    .filter((item) => item.price !== '')
    .map((item) => ({ name: item.name, amount: convertPriceInputToNumber(item.price) }));

  const debtSuccessions = [];
  if (args.debtSuccessionDeposit !== '') {
    debtSuccessions.push({
      name: '보증금',
      amount: convertPriceInputToNumber(args.debtSuccessionDeposit),
    });
  }
  debtSuccessions.push(
    ...args.debtSuccessionMiscs
      .filter((item) => item.price !== '')
      .map((item) => ({ name: item.name, amount: convertPriceInputToNumber(item.price) })),
  );

  const params: Record<string, unknown> = {
    negotiation_or_auction: 1,
    administrative_fee: convertPriceInputToNumber(args.adminFee),
    buy_or_rent: args.buyOrRent,
    contract_amount: convertPriceInputToNumber(args.contractAmount),
    contract_amount_negotiable: args.contractAmountNegotiable,
    collaterals,
    debt_successions: debtSuccessions,
    deposit: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    description: args.description,

    interim_amount1: convertPriceInputToNumber(args.interims[0]?.price),
    interim_amount_negotiable1: args.interims[0]?.negotiable, // true: 중도금 협의가능 false: 중도금 협의불가
    interim_amount_payment_time1: args.interims[0]?.date?.toISOString(), // 중도금 지급일
    interim_amount_payment_time1_type: getDateType(args.interims[0]?.dateType), // 중도금 지급일 이전/이후 1: 이전 2: 이후

    interim_amount2: convertPriceInputToNumber(args.interims[1]?.price), // 상동
    interim_amount_negotiable2: args.interims[1]?.negotiable,
    interim_amount_payment_time2: args.interims[1]?.date?.toISOString(),
    interim_amount_payment_time2_type: getDateType(args.interims[1]?.dateType),

    interim_amount3: convertPriceInputToNumber(args.interims[2]?.price), // 상동
    interim_amount_negotiable3: args.interims[2]?.negotiable,
    interim_amount_payment_time3: args.interims[2]?.date?.toISOString(),
    interim_amount_payment_time3_type: getDateType(args.interims[2]?.dateType),

    jeonsae_loan: args.jeonsaeLoan,

    move_in_date: args.moveInDate?.toISOString(),
    move_in_date_type: getDateType(args.moveInDateType),

    monthly_rent_fee: convertPriceInputToNumber(args.monthlyRentFee),

    owner_name: args.ownerName,
    owner_phone: args.ownerPhone,

    remaining_amount: convertPriceInputToNumber(args.remainingAmount),
    remaining_amount_payment_time: args.remainingAmountDate?.toISOString(), // 잔금 지급일
    remaining_amount_payment_time_type: getDateType(args.remainingAmountDateType), // 잔금 지급일 이전/이후 1: 이전 2: 이후

    rent_area: args.rentArea,
    rent_contract_term_year: Number(args.rentTermYear.replace('년', '')) ?? 0,
    rent_contract_term_month: Number(args.rentTermMonth.replace('개월', '')) ?? 0,
    rent_contract_term_negotiable: args.rentTermNegotiable,

    special_terms: args.specialTerms,

    veranda_extended: args.verandaExtended,
    veranda_remodelling: args.verandaRemodelling,
    extra_options: args.extraOptions,

    trade_price: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
    quick_sale: args.quickSale,

    rent_end_date: args.rentEndDate?.toISOString(),

    listingPhotoUrls: args.listingPhotoUrls,
    danjiPhotoUrls: args.danjiPhotoUrls,
    isOwner: args.isOwner, // 클라이언트 로직을 위해서 사용, 서버로 넘기지않음.
  };

  Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);

  return params;
}
