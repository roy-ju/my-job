import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import FindAccount from '.';

export default {
  title: 'templates/FindAccount',
  component: FindAccount,
} as ComponentMeta<typeof FindAccount>;

export const Default: ComponentStory<typeof FindAccount> = (args) => (
  <Panel>
    <FindAccount {...args} />
  </Panel>
);

Default.args = {};
