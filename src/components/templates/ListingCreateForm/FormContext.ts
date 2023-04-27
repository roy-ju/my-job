import { createContext } from 'react';

export interface InterimType {
  key: string;
  price?: string;
  negotiable?: boolean;
  date?: Date | null;
  dateType?: string;
  onChangePrice?: (value: string) => void;
  onChangeNegotiable?: (value: boolean) => void;
  onChangeDate?: (value: Date | null) => void;
  onChangeDateType?: (value: string) => void;
  onRemove?: () => void;
}

export interface DebtSuccessionType {
  key: string;
  name?: string;
  price?: string;
  onChangeName?: (value: string) => void;
  onChangePrice?: (value: string) => void;
  onRemove?: () => void;
}

export interface CollateralType {
  key: string;
  name?: string;
  price?: string;
  onChangeName?: (value: string) => void;
  onChangePrice?: (value: string) => void;
  onRemove?: () => void;
}

export interface IFormContext {
  // IsOwner
  isOwner?: boolean;
  onChangeIsOwner?: (value: boolean) => void;

  // OwnerInfo
  ownerName?: string;
  ownerPhone?: string;
  onChangeOwnerName?: (value: string) => void;
  onChangeOwnerPhone?: (value: string) => void;

  // 매매/전세/월세
  buyOrRent?: number;
  onChangeBuyOrRent?: (value: number) => void;

  // 매매가/보증금/월세
  price?: string;
  monthlyRentFee?: string;
  quickSale?: boolean;
  onChangePrice?: (value: string) => void;
  onChangeMonthlyRentFee?: (value: string) => void;
  onChangeQuickSale?: (value: boolean) => void;

  // 희망 지급일정
  contractAmount?: string;
  contractAmountNegotiable?: boolean;
  remainingAmount?: string;
  remainingAmountDate?: Date | null;
  remainingAmountDateType?: string;
  interims?: InterimType[];
  onClickAddInterim?: () => void;
  onChangeContractAmount?: (value: string) => void;
  onChangeContractAmountNegotiable?: (value: boolean) => void;
  onChangeRemainingAmount?: (value: string) => void;
  onChangeRemainingAmountDate?: (value: Date | null) => void;
  onChangeRemainingAmountDateType?: (value: string) => void;

  // 채무승계
  debtSuccessionDeposit?: string;
  debtSuccessionMiscs?: DebtSuccessionType[];
  onChangeDebtSuccessionDeposit?: (value: string) => void;
  onClickAddDebtSuccessionMisc?: () => void;

  // 선순위 담보권
  collaterals?: CollateralType[];
  onClickAddCollateral?: () => void;

  // 입주가능시기
  moveInDate?: Date | null;
  moveInDateType?: string;
  hasMoveInDate?: string;
  onChangeMoveInDate?: (value: Date | null) => void;
  onChangeMoveInDateType?: (value: string) => void;
  onChangeHasMoveInDate?: (value: string) => void;

  // 특약사항
  specialTerms?: string;
  hasSpecialTerms?: string;
  onChangeSpecialTerms?: (value: string) => void;
  onChangeHasSpecialTerms?: (value: string) => void;

  // 임대할 부분
  rentArea?: string;
  hasRentArea?: string;
  onChangeRentArea?: (value: string) => void;
  onChangeHasRentArea?: (value: string) => void;

  // 베란다 확장
  verandaExtended?: boolean;
  onChangeVerandaExtended?: (value: boolean) => void;

  // 2년 내 올수리
  verandaRemodelling?: boolean;
  onChangeVerandaRemodelling?: (value: boolean) => void;

  // 추가 옵션
  extraOptions?: number[];
  onChangeExtraOptions?: (id: number) => void;
  listingOptions?: {
    id: number;
    name: string;
    createdTime: string;
  }[];

  // 임대기간
  rentTermYear?: string;
  rentTermMonth?: string;
  rentTermNegotiable?: boolean;
  onChangeRentTermYear?: (value: string) => void;
  onChangeRentTermMonth?: (value: string) => void;
  onChangeRentTermNegotiable?: (value: boolean) => void;

  // 전세자금대출
  jeonsaeLoan?: boolean;
  onChangeJeonsaeLoan?: (value: boolean) => void;

  // 고정관리비
  adminFee?: string;
  onChangeAdminFee?: (value: string) => void;

  listingPhotoUrls?: string[];
  onChangeListingPhotoUrls?: (values: string[]) => void;

  danjiPhotoUrls?: string[];
  onChangeDanjiPhotoUrls?: (values: string[]) => void;

  description?: string;
  onChangeDescription?: (value: string) => void;

  rentEndDate?: Date | null;
  onChangeRentEndDate?: (value: Date | null) => void;
}

const FormContext = createContext<IFormContext>({});

export default FormContext;
