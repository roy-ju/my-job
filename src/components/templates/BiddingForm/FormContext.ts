import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { createContext } from 'react';

export interface IFormContext {
  listing?: GetListingDetailResponse['listing'];

  type?: number;
  onChangeType?: (value: number) => void;

  price?: string;
  monthlyRentFee?: string;
  onChangePrice?: (value: string) => void;
  onChangeMonthlyRentFee?: (value: string) => void;

  canHaveMoreContractAmount?: boolean | null;
  onChangeCanHaveMoreContractAmount?: (value: boolean | null) => void;
  contractAmount?: string;
  onChangeContractAmount?: (value: string) => void;

  canHaveMoreInterimAmount?: boolean | null;
  onChangeCanHaveMoreInterimAmount?: (value: boolean | null) => void;
  interimAmount?: string;
  onChangeInterimAmount?: (value: string) => void;

  canHaveEarilerRemainingAmountDate?: boolean | null;
  onChangeCanHaveEarilerRemainingAmountDate?: (value: boolean | null) => void;
  remainingAmountDate?: Date | null;
  remainingAmountDateType?: string;
  onChangeRemainingAmountDate?: (value: Date | null) => void;
  onChangeRemainingAmountDateType?: (value: string) => void;

  canHaveEarilerMoveInDate?: boolean | null;
  moveInDate?: Date | null;
  moveInDateType?: string;
  onChangeMoveInDate?: (value: Date | null) => void;
  onChangeMoveInDateType?: (value: string) => void;

  etcs?: string[];
  onChangeEtcs?: (value: string[]) => void;

  description?: string;
  onChangeDescription?: (value: string) => void;
}

const FormContext = createContext<IFormContext>({});

export default FormContext;
