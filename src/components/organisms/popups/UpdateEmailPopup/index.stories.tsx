import type { ComponentMeta, ComponentStory } from '@storybook/react';
import UpdateEmailPopup from '.';

export default {
  title: 'organisms/popups/UpdateEmailPopup',
  component: UpdateEmailPopup,
} as ComponentMeta<typeof UpdateEmailPopup>;

export const Default: ComponentStory<typeof UpdateEmailPopup> = (args) => <UpdateEmailPopup {...args} />;

export const Success = () => <UpdateEmailPopup.Success />;

export const DuplicatedCi = () => <UpdateEmailPopup.DuplicatedCi />;

export const DuplicatedEmail = () => <UpdateEmailPopup.DuplicatedEmail />;

Default.args = {};
