import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NotificationListItem from '.';

export default {
  title: 'organisms/NotificationListItem',
  component: NotificationListItem,
} as ComponentMeta<typeof NotificationListItem>;

export const Default: ComponentStory<typeof NotificationListItem> = (args) => (
  <div tw="flex flex-col gap-4">
    <NotificationListItem {...args} category={0} type={4} />
    <NotificationListItem {...args} category={0} type={3} />
    <NotificationListItem {...args} category={0} type={1} />
    <NotificationListItem {...args} category={1} type={2} />
    <NotificationListItem {...args} category={2} type={2} />
    <NotificationListItem {...args} category={3} type={2} />
  </div>
);
Default.args = {
  title: '제이님이 관심가질 만한 지난 주 실거래가가 있어요!',
  message:
    '매물의 거래가 중단되었습니다. 거래참여가 취소되어, 거래참여를 위해 납부하셨던 제안보증금 및 쿠폰이 반환되었습니다. 채팅은 자동으로 종료되었습니다.',
  listingTitle: '자이아파트 힐스테이트 105동',
  createdTime: '2023-03-22T08:01:32.085Z',
  unread: false,
  checkbox: false,
};
