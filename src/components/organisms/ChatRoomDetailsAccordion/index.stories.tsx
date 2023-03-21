import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatRoomDetailsAccordion from '.';

export default {
  title: 'organisms/ChatRoomDetailsAccordion',
  component: ChatRoomDetailsAccordion,
} as ComponentMeta<typeof ChatRoomDetailsAccordion>;

export const Default: ComponentStory<typeof ChatRoomDetailsAccordion> = () => <ChatRoomDetailsAccordion />;
