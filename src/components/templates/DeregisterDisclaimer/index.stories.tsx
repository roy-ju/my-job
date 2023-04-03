import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DeregisterDisclaimer from '.';

export default {
  title: 'templates/DeregisterDisclaimer',
  component: DeregisterDisclaimer,
} as ComponentMeta<typeof DeregisterDisclaimer>;

export const Default: ComponentStory<typeof DeregisterDisclaimer> = (args) => (
  <Panel>
    <DeregisterDisclaimer {...args} />
  </Panel>
);

Default.args = {};
