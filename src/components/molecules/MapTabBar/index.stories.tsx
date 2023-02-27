import type { ComponentMeta, ComponentStory } from '@storybook/react';

import MapTabBar from '.';

export default {
  title: 'molecules/MapTabBar',
  component: MapTabBar,
} as ComponentMeta<typeof MapTabBar>;

export const Default: ComponentStory<typeof MapTabBar> = () => (
  <MapTabBar>
    <MapTabBar.BuildingTab />
  </MapTabBar>
);

Default.args = {};
