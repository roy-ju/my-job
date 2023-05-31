import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MobVerifyCiSuccess from '.';

export default {
  title: 'templates/MobVerifyCiSuccess',
  component: MobVerifyCiSuccess,
} as ComponentMeta<typeof MobVerifyCiSuccess>;

export const Default: ComponentStory<typeof MobVerifyCiSuccess> = (args) => (
  <Panel>
    <MobVerifyCiSuccess {...args} />
  </Panel>
);

Default.args = {};
