import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import ChatRoomAgentSummary from '.';

export default {
  title: 'organisms/ChatRoomAgentSummary',
  component: ChatRoomAgentSummary,
} as ComponentMeta<typeof ChatRoomAgentSummary>;

export const Default: ComponentStory<typeof ChatRoomAgentSummary> = (args) => <ChatRoomAgentSummary {...args} />;
Default.args = {
  agentName: '김네고',
  agentProfileImagePath: defaultAvatar,
};
