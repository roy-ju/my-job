import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import UpdatePhone from '.';

export default {
  title: 'templates/UpdatePhone',
  component: UpdatePhone,
} as ComponentMeta<typeof UpdatePhone>;

export const Default: ComponentStory<typeof UpdatePhone> = (args) => (
  <Panel>
    <UpdatePhone {...args} />
  </Panel>
);

Default.args = {
  sent: false,
  codeVerified: false,
  codeErrorMessage: '',
};
