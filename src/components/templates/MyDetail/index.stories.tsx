import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyDetail from '.';

export default {
  title: 'templates/MyDetail',
  component: MyDetail,
} as ComponentMeta<typeof MyDetail>;

export const Default: ComponentStory<typeof MyDetail> = (args) => (
  <Panel>
    <MyDetail {...args} />
  </Panel>
);

Default.args = {
  nickname: '김네고',
  email: 'joel.kim@negocio.co.kr',
  name: '김네고',
  phone: '01012341234',
  address: '서울 강남구 역삼동',
  addressDetail: '817-13',
  addressVerified: true,
  isLoading: false,
};
