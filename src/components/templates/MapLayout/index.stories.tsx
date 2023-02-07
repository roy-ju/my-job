import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapLayout from './index';

export default {
  title: 'templates/MapLayout',
  component: MapLayout,
} as ComponentMeta<typeof MapLayout>;

export const Default: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args} />
);

Default.args = {
  panels: <Panel width="375px" />,
  map: null,
};

Default.parameters = {
  controls: {
    exclude: ['panels', 'map'],
  },
};
