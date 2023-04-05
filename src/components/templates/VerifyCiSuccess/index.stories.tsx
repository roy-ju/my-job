import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import VerifyCiSuccess from '.';

export default {
  title: 'templates/VerifyCiSuccess',
  component: VerifyCiSuccess,
} as ComponentMeta<typeof VerifyCiSuccess>;

export const Default: ComponentStory<typeof VerifyCiSuccess> = (args) => (
  <Panel>
    <VerifyCiSuccess {...args} />
  </Panel>
);

Default.args = {};
