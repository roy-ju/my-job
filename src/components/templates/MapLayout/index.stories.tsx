import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapLayout from '.';

export default {
  title: 'templates/MapLayout',
  component: MapLayout,
} as ComponentMeta<typeof MapLayout>;

export const PanelOpen: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args}>
    <MapLayout.Panels>
      <Panel />
    </MapLayout.Panels>
    <MapLayout.Map />
  </MapLayout>
);

export const PanelClosed: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args}>
    <MapLayout.Panels />
    <MapLayout.Map />
  </MapLayout>
);
