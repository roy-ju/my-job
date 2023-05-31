import type { ComponentMeta, ComponentStory } from '@storybook/react';
import UpdateNicknamePopup from '.';

export default {
  title: 'organisms/popups/UpdateNicknamePopup',
  component: UpdateNicknamePopup,
} as ComponentMeta<typeof UpdateNicknamePopup>;

export const Default: ComponentStory<typeof UpdateNicknamePopup> = (args) => <UpdateNicknamePopup {...args} />;

Default.args = {};
