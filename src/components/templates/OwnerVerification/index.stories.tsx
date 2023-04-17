import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import OwnerVerification from '.';

export default {
  title: 'templates/OwnerVerification',
  component: OwnerVerification,
} as ComponentMeta<typeof OwnerVerification>;

export const Default: ComponentStory<typeof OwnerVerification> = (args) => (
  <Panel>
    <OwnerVerification {...args} />
  </Panel>
);

Default.args = {};
