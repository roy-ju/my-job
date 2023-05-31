import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import MobHog from '.';

export default {
  title: 'templates/MobHog',
  component: MobHog,
} as ComponentMeta<typeof MobHog>;

export const Default: ComponentStory<typeof MobHog> = (args) => (
  <Panel>
    <MobHog {...args} />
  </Panel>
);

Default.args = {};
