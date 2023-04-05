import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyRealPriceList, { IMyRealPriceListItem } from '.';

const mockData: IMyRealPriceListItem[] = [
  {
    danjiName: '기흥더샵프라임뷰',
    price: 1000000000,
    createdTime: '2022-10-11',
    area: '111.11',
    buyOrRent: 1,
    dealType: '직거래',
  },
  {
    danjiName: '기흥더샵프라임뷰',
    price: 1000000000,
    monthlyRentFee: 100000,
    createdTime: '2022-10-11',
    area: '111.11',
    buyOrRent: 3,
    dealType: '',
  },
];

export default {
  title: 'templates/MyRealPriceList',
  component: MyRealPriceList,
} as ComponentMeta<typeof MyRealPriceList>;

export const Default: ComponentStory<typeof MyRealPriceList> = (args) => (
  <Panel>
    <MyRealPriceList {...args} />
  </Panel>
);

Default.args = {
  list: mockData,
  updatedTime: '2022-10-11',
};

export const NoData: ComponentStory<typeof MyRealPriceList> = (args) => (
  <Panel>
    <MyRealPriceList {...args} />
  </Panel>
);

NoData.args = {
  list: [],
  // updatedTime: '2022-10-11',
};
