import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { createContext } from 'react';

export interface IFormContext {
  listing?: GetListingDetailResponse['listing'];

  type?: number;
  onChangeType?: (value: number) => void;

  price?: string;
  onChangePrice?: (value: string) => void;

  monthlyRentFee?: string;
  onChangeMonthlyRentFee?: (value: string) => void;

  moveInDate?: Date | null;
  onChangeMoveInDate?: (value: Date | null) => void;

  moveInDateType?: string;
  onChangeMoveInDateType?: (value: string) => void;

  etcs?: string[];
  onChangeEtcs?: (value: string[]) => void;

  description?: string;
  onChangeDescription?: (value: string) => void;
}

const FormContext = createContext<IFormContext>({});

export default FormContext;
