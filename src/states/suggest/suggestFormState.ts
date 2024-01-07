import { atom } from 'recoil';

import { v1 } from 'uuid';

import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

export interface BubjungdongType {
  name: string;
  code: string;
}

export const Forms = {
  REGION_OR_DANJI: 'region_or_danji',
  REALESTATE_AND_BUYORRENT_AND_PRICE: 'realestate_and_buyOrRent_and_price',
  BUY_PURPOSE: 'buy_purpose',
  MOVE_IN_DATE: 'move_in_date',
  AREA: 'area',
  ADDITIONAL_CONDITIONS: 'additional_conditions',
  INTERVIEW: 'interview',
  SUMMARY: 'summary',
} as const;

/** 폼의 종류 */
export type FormType = (typeof Forms)[keyof typeof Forms];

export type SuggestFormAtomState = {
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
  address: string;
  /** 지역 구해요의 법정동 ID */
  bubjungdong: BubjungdongType | null;
  /** 지역 구해요의 부동산 종류 */
  realestateTypes: number[];
  /** 매매 | 전세 | 월세 */
  buyOrRent: BuyOrRent | 0;
  /** 가격 보증금 */
  price: string;
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
  pyoungInputValue: string;
  /** 평수 */
  pyoungList: string[];
  /** 추가조건 */
  additional_condtions: string[];
  /** 인터뷰 가능 시간 */
  interviewAvailabletimes: string[];

  popup: 'regionList' | 'danjiList' | 'reselectRegionOrDanji' | '';
};

export const initialValue = {
  forms: [],
  danjiOrRegion: 0,
  danjiID: null,
  danjiAddress: '',
  danjiName: '',
  danjiRealestateType: 0,
  address: '',
  bubjungdong: null,
  realestateTypes: [],
  buyOrRent: 0,
  price: '',
  monthlyRentFee: '',
  negotiable: true,
  quickSale: '0',
  purpose: '',
  investAmount: '',
  moveInDate: null,
  moveInDateType: '',
  pyoungList: [],
  pyoungInputValue: '',
  additional_condtions: [],
  interviewAvailabletimes: [],

  popup: '',
} as SuggestFormAtomState;

const suggestFormState = atom<SuggestFormAtomState>({
  key: `suggestFormState/${v1()}`,

  default: initialValue,

  dangerouslyAllowMutability: true,
});

export default suggestFormState;
