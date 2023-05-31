import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyRealPriceListItem from '.';

export default {
  title: 'organisms/MyRealPriceListItem',
  component: MyRealPriceListItem,
} as ComponentMeta<typeof MyRealPriceListItem>;

export const Default: ComponentStory<typeof MyRealPriceListItem> = (args) => <MyRealPriceListItem {...args} />;

Default.args = {
  danjiName: '백현마을2단지아파트 205동',
  price: 123456789,
  monthlyRentFee: 1234567,
  createdTime: '2023-04-03T07:36:04.097Z',
  area: '111.11',
};
