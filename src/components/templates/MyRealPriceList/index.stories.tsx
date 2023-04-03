import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyRealPriceList, { IMyRealPriceListItem } from '.';

const mockData: IMyRealPriceListItem[] = [];

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
};
