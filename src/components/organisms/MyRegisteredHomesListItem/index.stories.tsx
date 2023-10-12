import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyRegisteredHomesListItem from '.';

export default {
  title: 'organisms/MyRegisteredHomesListItem',
  component: MyRegisteredHomesListItem,
} as ComponentMeta<typeof MyRegisteredHomesListItem>;

export const Default: ComponentStory<typeof MyRegisteredHomesListItem> = (args) => (
  <MyRegisteredHomesListItem {...args} />
);

Default.args = {
  roadnameAddress: '서울특별시 강남구 선릉로94길 11',
  addressDetail: '아트빌 401호',
  notVerified: true,
  onClickDeleteIcon: undefined,
  onClickSendSMS: undefined,
};
