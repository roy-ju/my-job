import { createContext } from 'react';
import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';

export interface IFormContext {
  danji?: string;
  onClickOpenDanjiList?: () => void;

  danjiID?: number;

  forms?: string[];
  onClickNext?: () => void;
  nextButtonDisabled?: boolean;

  buyOrRent?: number;
  onChangeBuyOrRent?: (value: number) => void;

  price?: string;
  onChangePrice?: (value: string) => void;

  monthlyRentFee?: string;
  onChangeMonthlyRentFee?: (value: string) => void;

  quickSale?: string;
  onChangeQuickSale?: (value: string) => void;

  investAmount?: string;
  onChangeInvestAmount?: (value: string) => void;

  negotiable?: boolean;
  onChangeNegotiable?: (value: boolean) => void;

  pyoungList?: number[];
  onChangePyoungList?: (value: number[]) => void;

  purpose?: string;
  onChangePurpose?: (value: string) => void;

  moveInDate?: Date | null;
  onChangeMoveInDate?: (value: Date | null) => void;

  moveInDateType?: string;
  onChangeMoveInDateType?: (value: string) => void;

  description?: string;
  onChangeDescription?: (value: string) => void;

  pyoungInputValue?: string;
  onChangePyoungInputValue?: (value: string) => void;

  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];

  onClickPyoungDeleteIcon?: () => void;
  onClickPyoungAddIcon?: (value: string) => void;
  onClickPyoungButton?: (value: number) => void;
  onClickPyoungCloseButton?: (value: number) => void;

  emptyTextFields?: Record<string, boolean>;
}

const FormContext = createContext<IFormContext>({});

export default FormContext;
