import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import ChatRoomReport from '.';

export default {
  title: 'templates/ChatRoomReport',
  component: ChatRoomReport,
} as ComponentMeta<typeof ChatRoomReport>;

export const Default: ComponentStory<typeof ChatRoomReport> = (args) => (
  <Panel>
    <ChatRoomReport {...args} />
  </Panel>
);

Default.args = {
  officeName: '김네고 공인중개사',
  listingTitle: '도곡한라비발디프라펠리스 101동aaaaaaaaa',
  additionalListingCount: 2,
};