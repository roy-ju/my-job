import { createContext } from 'react';

export interface IFormContext {
  region?: string;
  onClickOpenRegionList?: () => void;

  realestateType?: number[];
  onChangeRealestateType?: (value: number[]) => void;

  buyOrRent?: number;
  onChangeBuyOrRent?: (value: number) => void;

  price?: string;
  onChangePrice?: (value: string) => void;

  investAmount?: string;
  onChangeInvestAmount?: (value: string) => void;

  monthlyRentFee?: string;
  onChangeMonthlyRentFee?: (value: string) => void;

  negotiable?: boolean;
  onChangeNegotiable?: (value: boolean) => void;

  minArea?: string;
  onChangeMinArea?: (value: string) => void;

  maxArea?: string;
  onChangeMaxArea?: (value: string) => void;

  floor?: string[];
  onChangeFloor?: (value: string[]) => void;

  purpose?: string;
  onChangePurpose?: (value: string) => void;

  moveInDate?: Date | null;
  onChangeMoveInDate?: (value: Date | null) => void;

  moveInDateType?: string;
  onChangeMoveInDateType?: (value: string) => void;

  remainingAmountDate?: Date | null;
  onChangeRemainingAmountDate?: (value: Date | null) => void;

  remainingAmountDateType?: string;
  onChangeRemainingAmountDateType?: (value: string) => void;

  description?: string;
  onChangeDescription?: (value: string) => void;
}

const FormContext = createContext<IFormContext>({});

export default FormContext;
