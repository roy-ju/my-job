import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyAddressDetail from '.';

export default {
  title: 'templates/MyAddressDetail',
  component: MyAddressDetail,
} as ComponentMeta<typeof MyAddressDetail>;

export const Default: ComponentStory<typeof MyAddressDetail> = (args) => (
  <Panel>
    <MyAddressDetail {...args} />
  </Panel>
);

Default.args = {
  addressLine1: '경기도 성남시 분당구 동판교로 156',
  addressLine2: '삼평동, 봇들마을9단지 금호어울림 아파트',
};
