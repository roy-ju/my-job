import { createContext } from 'react';

export interface InterimType {
  key: string;
  price?: string;
  negotiable?: boolean;
  onChangePrice?: (value: string) => void;
  onChangeNegotiable?: (value: boolean) => void;
  onRemove?: () => void;
}

interface IFormContext {
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
  onChangePrice?: (value: string) => void;
  onChangeMonthlyRentFee?: (value: string) => void;

  // 희망 지급일정
  contractAmount?: string;
  contractAmountNegotiable?: boolean;
  remainingAmount?: string;
  interims?: InterimType[];
  onClickAddInterim?: () => void;
  onChangeContractAmount?: (value: string) => void;
  onChangeContractAmountNegotiable?: (value: boolean) => void;
  onChangeRemainingAmount?: (value: string) => void;
}

const FormContext = createContext<IFormContext>({});

export default FormContext;
