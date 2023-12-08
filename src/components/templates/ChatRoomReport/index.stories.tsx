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
  targetName: '김네고 공인중개사',
};
