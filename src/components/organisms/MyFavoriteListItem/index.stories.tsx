import { Panel } from '@/components/atoms';
import MyFavoriteListItem from '.';

const meta = {
  title: 'organisms/MyFavoriteListItem',
};

export default meta;

export const DanjiItem = () => (
  <Panel>
    <MyFavoriteListItem.Danji />
  </Panel>
);

export const ListingItem = () => (
  <Panel>
    <MyFavoriteListItem.Listing />
  </Panel>
);

/* 
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
*/
