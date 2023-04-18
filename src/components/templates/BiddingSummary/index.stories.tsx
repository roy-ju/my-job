import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import { BuyOrRent } from '@/constants/enums';
import BiddingSummary from '.';

export default {
  title: 'templates/BiddingSummary',
  component: BiddingSummary,
} as ComponentMeta<typeof BiddingSummary>;

export const Default: ComponentStory<typeof BiddingSummary> = (args) => (
  <Panel>
    <BiddingSummary {...args} />
  </Panel>
);

Default.args = {
  listingTitle: '펜트라우스 104동',
  address: '도로명주소',
  area: '44',
  floorDescription: '저',
  floor: '22',
  direction: '남향',

  listingBuyOrRent: BuyOrRent.Buy,
  listingPrice: 100000000,
  price: 10000000,
  interimAmount: 100000,
  remainingAmountDate: '2023-04-18T03:07:13.471Z',
  etcs: '전문직,대기업 재직,대학생,반려묘 있음,반려견 있음',
  description: '올수리 예정입니다, 실거주 목적입니다.길어지면 이렇게',
};
