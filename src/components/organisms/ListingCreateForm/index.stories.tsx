import { BuyOrRent as BuyOrRentType } from '@/constants/enums';
import ListingCreateForm from '.';

const meta = {
  title: 'organisms/ListingCreateForm',
};

export default meta;

export const BuyOrRent = () => <ListingCreateForm.BuyOrRent />;

export const Price = () => <ListingCreateForm.Price buyOrRent={BuyOrRentType.Buy} />;

export const DebtSuccession = () => <ListingCreateForm.DebtSuccession />;

export const ContractAmount = () => <ListingCreateForm.ContractAmount />;

export const RemainingAmount = () => <ListingCreateForm.RemainingAmount />;

export const Schedule = () => <ListingCreateForm.Schedule />;

export const InterimAmount = () => <ListingCreateForm.InterimAmount />;

export const PaymentSchedule = () => <ListingCreateForm.PaymentSchedule />;
