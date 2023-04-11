import { createContext } from 'react';

export interface InterimType {
  key: string;
  price?: string;
  negotiable?: boolean;
  date?: string;
  dateType?: string;
  onChangePrice?: (value: string) => void;
  onChangeNegotiable?: (value: boolean) => void;
  onChangeDate?: (value: string) => void;
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
  remainingAmountDate?: string;
  remainingAmountDateType?: string;
  interims?: InterimType[];
  onClickAddInterim?: () => void;
  onChangeContractAmount?: (value: string) => void;
  onChangeContractAmountNegotiable?: (value: boolean) => void;
  onChangeRemainingAmount?: (value: string) => void;
  onChangeRemainingAmountDate?: (value: string) => void;
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
  moveInDate?: string;
  dateType?: string;
  onChangeMoveInDate?: (value: string) => void;
  onChangeDateType?: (value: string) => void;

  // 특약사항
  specialTerms?: string;
  onChangeSpecialTerms?: (value: string) => void;

  // 임대할 부분
  rentArea?: string;
  onChangeRentArea?: (value: string) => void;

  // 임대기간
  rentTermYear?: string;
  rentTermMonth?: string;
  rentTermNegotiable?: boolean;
  onChangeRentTermYear?: (value: string) => void;
  onChangeRentTermMonth?: (value: string) => void;
  onChangeRentTermNegotiable?: (value: boolean) => void;
}

const FormContext = createContext<IFormContext>({});

export default FormContext;
