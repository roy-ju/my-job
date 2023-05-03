import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NotificationList from '.';

export default {
  title: 'templates/NotificationList',
  component: NotificationList,
} as ComponentMeta<typeof NotificationList>;

export const Default: ComponentStory<typeof NotificationList> = (args) => (
  <Panel>
    <NotificationList {...args} />
  </Panel>
);

Default.args = {
  isDeleting: false,
  notifications: Array(50)
    .fill(0)
    .map((_, i) => ({
      id: i,
      type: 0,
      category: 0,
      title: '최근 메시지가 들어갑니다 최근 메시지가 2줄 최근 메시지가 들어갑니다. ...',
      message:
        '매물의 거래가 중단되었습니다. 거래참여가 취소되어, 거래참여를 위해 납부하셨던 제안보증금 및 쿠폰이 반환되었습니다. 채팅은 자동으로 종료되었습니다.',
      listingTitle: '자이아파트 힐스테이트 105동',
      createdTime: '2023-03-22T08:01:32.085Z',
      unread: false,
    })),
};
