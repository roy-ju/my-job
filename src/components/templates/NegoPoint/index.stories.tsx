import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NegoPoint from '.';

export default {
  title: 'templates/NegoPoint',
  component: NegoPoint,
} as ComponentMeta<typeof NegoPoint>;

export const Default: ComponentStory<typeof NegoPoint> = (args) => (
  <Panel>
    <NegoPoint {...args} />
  </Panel>
);

Default.args = {
  totalPoint: 0,
};
