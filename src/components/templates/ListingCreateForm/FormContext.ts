import { createContext } from 'react';

interface IFormContext {
  // IsOwner
  isOwner?: boolean;
  onChangeIsOwner?: (value: boolean) => void;

  // OwnerInfo
  ownerName?: string;
  ownerPhone?: string;
  onChangeOwnerName?: (value: string) => void;
  onChangeOwnerPhone?: (value: string) => void;

  // BuyOrRent
  buyOrRent?: number;
  onChangeBuyOrRent?: (value: number) => void;

  // Price
  price?: string;
  monthlyRentFee?: string;
  onChangePrice?: (value: string) => void;
  onChangeMonthlyRentFee?: (value: string) => void;
}

const FormContext = createContext<IFormContext>({});

export default FormContext;
