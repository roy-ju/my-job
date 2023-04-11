import { BuyOrRent as BuyOrRentType } from '@/constants/enums';
import type { ComponentStory } from '@storybook/react';
import ListingCreateForm from '.';
import { PaymentScheduleProps } from './PaymentSchedule';

const meta = {
  title: 'organisms/ListingCreateForm',
};

export default meta;

export const BuyOrRent = () => <ListingCreateForm.BuyOrRent />;

export const Price = () => <ListingCreateForm.Price buyOrRent={BuyOrRentType.Wolsae} />;

export const DebtSuccession = () => <ListingCreateForm.DebtSuccession />;

export const DebtSuccessionMiscellaneous = () => <ListingCreateForm.DebtSuccession.Miscellaneous />;

export const Collateral = () => <ListingCreateForm.Collateral />;

export const ContractAmount = () => <ListingCreateForm.ContractAmount />;

export const RemainingAmount = () => <ListingCreateForm.RemainingAmount />;

export const Schedule = () => <ListingCreateForm.Schedule />;

export const InterimAmount = () => <ListingCreateForm.InterimAmount />;

export const PaymentSchedule: ComponentStory<typeof ListingCreateForm.PaymentSchedule> = (
  args: PaymentScheduleProps,
) => <ListingCreateForm.PaymentSchedule {...args} />;

PaymentSchedule.args = {
  price: '1000',
  debtSuccessionDeposit: '200',
  debtSuccessionMiscs: [
    { key: '1', price: '100' },
    { key: '2', price: '100' },
  ],
};

export const IsOwner = () => <ListingCreateForm.IsOwner />;

export const OwnerInfo = () => <ListingCreateForm.OwnerInfo />;

export const SpecialTerms = () => <ListingCreateForm.SpecialTerms />;

export const ListingOptions = () => <ListingCreateForm.ListingOptions />;

export const ExtraOptions = () => <ListingCreateForm.ExtraOptions />;

export const AdminFee = () => <ListingCreateForm.AdminFee />;

export const Description = () => <ListingCreateForm.Description />;

export const RentArea = () => <ListingCreateForm.RentArea />;

export const JeonsaeLoan = () => <ListingCreateForm.JeonsaeLoan isJeonsae />;

export const MoveInDate = () => <ListingCreateForm.MoveInDate />;

export const RentTerm = () => <ListingCreateForm.RentTerm />;
