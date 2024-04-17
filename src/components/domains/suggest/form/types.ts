import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import forms from './constants/forms';

export interface BubjungdongType {
  name: string;
  code: string;
}

/** 폼의 종류 */
export type FormType = (typeof forms)[keyof typeof forms];

interface SuggestForm {
  /** 폼의 종류 */
  forms: FormType[];
  /** 단지인지 지역인지 */
  danjiOrRegion: DanjiOrRegionalType | 0;
  /** 단지 구해요의 단지 ID */
  danjiID: string | null;
  /** 단지 구해요의 단지 명 */
  danjiName: string;
  /** 단지 구해요의 단지 주소 */
  danjiAddress: string;
  /** 단지 구해요의 단지 부동산 */
  danjiRealestateType: number;
  /** 지역 구해요의 address */
  address: string[] | string;
  /** 지역 구해요의 법정동 ID */
  bubjungdong: BubjungdongType[] | BubjungdongType | null;
  /** 지역 구해요의 부동산 종류 */
  realestateTypes: number[];
  /** 매매 | 전세 | 월세 */
  buyOrRent: BuyOrRent | 0;
  /** 가격 보증금 */
  tradeOrDepositPrice: string;
  /** 가격 월세 */
  monthlyRentFee: string;
  /** 가격 협상 가능 */
  negotiable: boolean;
  /** 단지 구해요 급매 */
  quickSale: string;
  /** 입주일 */
  moveInDate: Date | null;
  /** 입주일 타입 */
  moveInDateType: '이전' | '이후' | '당일' | '';
  /** 매매 목적 */
  purpose: '실거주' | '투자' | '';
  /** 투자 금액 */
  investAmount: string;
  /** 단지 구해요 평수 직접 입력 */
  pyoungInput: string;
  /** 평수 */
  pyoungList: string[];
  /** 추가조건 */
  note: string;
  /** 추가조건 */
  additionalConditions: string[];
  /** 인터뷰 가능 시간 */
  interviewAvailabletimes: string[];
  /** 보증금 또는 매매가 에러메세지 */
  errorMessageTradeOrDepositPrice: string;
  /** 월세 에러메세지 */
  errorMessageMonthlyRentFeePrice: string;
  /** 투자금 에러메시지 */
  errorMessageInvestAmountPrice: string;
  /** 평수 제안 에러상태 */
  errorMessagePyoungInput: string;

  /** ui 거래조건 */
  uiBuyOrRent?: BuyOrRent | 0;

  /** ui 부동산 */
  uiRealestateType?: string;

  /** ui 추가조건 (수정에서만 쓰임) */
  isPastAdditionalCondition?: boolean;

  popup:
    | 'regionList'
    | 'danjiList'
    | 'reselectRegion'
    | 'reselectDanji'
    | 'quit'
    | 'buyOrRent'
    | 'realestateTypes'
    | 'invalidAccess'
    | 'impossibleSuggestArea'
    | '';
}

export default SuggestForm;
