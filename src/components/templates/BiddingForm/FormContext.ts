import { createContext } from 'react';

import { ListingDetailResponse } from '@/services/listing/types';

export interface IFormContext {
  listing?: ListingDetailResponse['listing'];

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
