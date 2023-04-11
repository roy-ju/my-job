import { DebtSuccessionType, InterimType } from '@/components/templates/ListingCreateForm/FormContext';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

interface Args {
  addressData: KakaoAddressAutocompleteResponseItem;
  ownerName: string;
  ownerPhone: string;
  buyOrRent: number;
  price: string;
  monthlyRentFee: string;
  contractAmount: string;
  contractAmountNegotiable: boolean;
  remainingAmount: string;
  remainingAmountDate: string;
  remainingAmountDateType: string;
  interims: InterimType[];

  debtSuccessionDeposit: string;
  debtSuccessionMiscs: DebtSuccessionType[];
  jeonsaeLoan: boolean;

  moveInDate: string;
  moveInDateType: string;

  rentArea: string;
  rentTermYear: string;
  rentTermMonth: string;
  rentTermNegotiable: string;
  specialTerms: string;
}

export default function makeListingCreateParams(args: Args) {
  return {
    ...args,
  };
}
