import { ClosablePanel } from '@/components/molecules';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapLayout from '.';

export default {
  title: 'templates/MapLayout',
  component: MapLayout,
} as ComponentMeta<typeof MapLayout>;

export const PanelClosed: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args}>
    <MapLayout.Panels />
    <MapLayout.Map />
  </MapLayout>
);
PanelClosed.storyName = '0 뎁스';

export const PanelOpened: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args}>
    <MapLayout.Panels>
      <ClosablePanel closable={false} />
    </MapLayout.Panels>
    <MapLayout.Map />
  </MapLayout>
);
PanelOpened.storyName = '1 뎁스';

export const TwoPanelsOpened: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args}>
    <MapLayout.Panels>
      <ClosablePanel closable={false} />
      <ClosablePanel closable />
    </MapLayout.Panels>
    <MapLayout.Map />
  </MapLayout>
);
TwoPanelsOpened.storyName = '2 뎁스';
