import { DanjiOrRegionalType, RealestateType, BuyOrRent } from '@/constants/enums';

import { TimeTypeString } from '@/constants/strings';

export default function normalizeParams(params: Record<string, unknown>) {
  /** 단지 인지 지역인지 */
  const danjiOrRegion = params?.danji_id ? DanjiOrRegionalType.Danji : DanjiOrRegionalType.Regional;
  /** 지역정보 */
  const address = params?.address ? params.address.toString() : '';
  const code = params.bubjungdong_code ? params.bubjungdong_code.toString() : '';
  /** 단지정보 */
  const danjiID = params?.danji_id ? Number(params.danji_id).toString() : null;
  const danjiAddress = params?.danji_address ? params.danji_address.toString() : '';
  const danjiName = params?.name ? params.name.toString() : '';
  const danjiRealestateType = params?.danji_type ? Number(params.danji_type) : 0;
  /** 부동산 종류 */
  const realestateTypes = params?.danji_type
    ? [Number(params.danji_type)]
    : params?.realestate_types
    ? String(params.realestate_types)
        .split(',')
        .map((v) => +v)
        .filter((type) => type !== RealestateType.Yunrip)
    : [];
  /** 매매 전월세 */
  const buyOrRent = Number(params?.buy_or_rents) === BuyOrRent.Buy ? BuyOrRent.Buy : BuyOrRent.Jeonsae;
  /** 매매가 또는 보증금 */
  const tradeOrDepositPrice = params?.trade_price
    ? params.trade_price.toString().slice(0, -4)
    : params?.deposit
    ? params.deposit.toString().slice(0, -4)
    : '';
  /** 월세 */
  const monthlyRentFee = params?.monthly_rent_fee ? params.monthly_rent_fee.toString().slice(0, -4) : '';
  /** 급매 */
  const quickSale = params.quick_sale ? (+(params.quick_sale as unknown as boolean)).toString() : '0';
  /** 금액 협상 가능 */
  const negotiable = Boolean(params?.negotiable);
  /** 매매 목적 */
  const purpose = (params?.purpose ? params.purpose.toString() : '') as '실거주' | '투자' | '';
  /** 투자금 */
  const investAmount = params.invest_amount ? String(params.invest_amount)?.slice(0, -4) : '';
  /** 입주일 */
  const moveInDate = params?.purpose === '투자' ? null : new Date(String(params.move_in_date ?? ''));
  /** 입주일 타입 */
  const moveInDateType =
    params?.purpose === '투자'
      ? ''
      : (TimeTypeString[Number(params?.move_in_date_type ?? 1)] as '이전' | '이후' | '당일' | '');
  /** 추가조건 */
  const note = params?.note ? (params.note as string) : '';

  const additionalConditions = (params?.additional_conditions || '').toString().split(',') as unknown as string[];
  /** 인터뷰 가능 시간 */
  const interviewAvailabletimes = (params?.interview_available_times || '')
    .toString()
    .split(',') as unknown as string[];
  /** 직접입력한 평 */
  const pyoungInput = '';
  /** 평 리스트 */

  const pyoungList = params?.danji_id
    ? (params.pyoungs as string[]) ?? []
    : ((params.pyoung_from as string).split(',') as string[]) ?? [];

  return {
    danjiOrRegion,
    danjiID,
    danjiAddress,
    danjiName,
    danjiRealestateType,
    address,
    bubjungdong: { name: address, code },
    realestateTypes,
    buyOrRent,
    tradeOrDepositPrice,
    monthlyRentFee,
    negotiable,
    quickSale,
    purpose,
    investAmount,
    moveInDate,
    moveInDateType,
    pyoungList,
    pyoungInput,
    note,
    additionalConditions,
    interviewAvailabletimes,
    popup: '' as '' | 'regionList' | 'danjiList' | 'reselectRegionOrDanji' | 'quit' | 'buyOrRent' | 'realestateTypes',
    errorMessageTradeOrDepositPrice: '',
    errorMessageMonthlyRentFeePrice: '',
    errorMessageInvestAmountPrice: '',
    errorMessagePyoungInput: '',
  };
}
