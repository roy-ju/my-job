import type { ComponentMeta } from '@storybook/react';
import ChatRoomPopup from '.';

export default {
  title: 'organisms/popups/ChatRoomPopup',
  component: ChatRoomPopup,
} as ComponentMeta<typeof ChatRoomPopup>;

export const One = () => <ChatRoomPopup.CloseCase1 />;
export const Two = () => <ChatRoomPopup.CloseCase2 />;
export const Three = () => <ChatRoomPopup.CloseCase3 />;
export const Four = () => <ChatRoomPopup.CloseCase4 />;
export const Five = () => <ChatRoomPopup.CloseCase5 />;
export const Six = () => <ChatRoomPopup.CloseCase6 />;
export const ContractComplete = () => <ChatRoomPopup.ContractComplete name="열일하는제이" />;
