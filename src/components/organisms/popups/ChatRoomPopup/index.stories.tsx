import type { ComponentMeta } from '@storybook/react';
import ChatRoomPopup from '.';

export default {
  title: 'organisms/popups/ChatRoomPopup',
  component: ChatRoomPopup,
} as ComponentMeta<typeof ChatRoomPopup>;

export const One = () => <ChatRoomPopup.CloseCase1 />;
