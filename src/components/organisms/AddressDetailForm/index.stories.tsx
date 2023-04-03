import type { ComponentMeta, ComponentStory } from '@storybook/react';
import AddressDetailForm from '.';

export default {
  title: 'organisms/AddressDetailForm',
  component: AddressDetailForm,
} as ComponentMeta<typeof AddressDetailForm>;

export const Default: ComponentStory<typeof AddressDetailForm> = (args) => <AddressDetailForm {...args} />;

Default.args = {
  addressLine1: '경기도 성남시 분당구 동판교로 156',
  addressLine2: '삼평동, 봇들마을9단지 금호어울림 아파트',
};
