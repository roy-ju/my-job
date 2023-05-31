import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import ChatRoomAgentSummary from '.';

export default {
  title: 'organisms/ChatRoomAgentSummary',
  component: ChatRoomAgentSummary,
} as ComponentMeta<typeof ChatRoomAgentSummary>;

export const Default: ComponentStory<typeof ChatRoomAgentSummary> = (args) => <ChatRoomAgentSummary {...args} />;
Default.args = {
  officeName: '네고시오 공인중개사사무소',
  agentName: '김네고',
  agentDescription:
    '이곳은네고시오공인중개사의자기소개가보여지는곳입니다 이곳은네이곳은네고시오공인중개사의자기소개가보여',
  agentProfileImagePath: defaultAvatar,
};
