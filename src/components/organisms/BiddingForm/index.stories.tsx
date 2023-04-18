import { BuyOrRent } from '@/constants/enums';
import BiddingForm from '.';

const meta = {
  title: 'organisms/BiddingForm',
};

export default meta;

export const Price = () => (
  <BiddingForm.Price buyOrRent={BuyOrRent.Jeonsae} listingPrice={343000000} listingMonthlyRentFee={500000} />
);

export const ContractAmount = () => <BiddingForm.ContractAmount />;

export const InterimAmount = () => <BiddingForm.InterimAmount />;

export const RemainingAmount = () => <BiddingForm.RemainingAmount />;

export const MoveInDate = () => <BiddingForm.MoveInDate />;

export const Etc = () => <BiddingForm.Etc />;
