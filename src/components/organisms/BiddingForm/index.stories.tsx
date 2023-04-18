import { BuyOrRent } from '@/constants/enums';
import BiddingForm from '.';

const meta = {
  title: 'organisms/BiddingForm',
};

export default meta;

export const Price = () => (
  <BiddingForm.Price buyOrRent={BuyOrRent.Jeonsae} listingPrice={343000000} listingMonthlyRentFee={500000} />
);

export const ContractAmount = () => (
  <BiddingForm.ContractAmount listingPrice={1500000000} listingContractAmount={10000000} />
);

export const InterimAmount = () => (
  <BiddingForm.InterimAmount listingPrice={1500000000} listingInterimAmount={10000000} />
);

export const RemainingAmount = () => (
  <BiddingForm.RemainingAmount listingRemainingAmountDate="2023-04-18T05:04:44.086Z" />
);

export const MoveInDate = () => <BiddingForm.MoveInDate />;

export const Etc = () => <BiddingForm.Etc />;
