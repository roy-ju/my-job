import type { ComponentMeta, ComponentStory } from '@storybook/react';
import RegionMarker from '.';

export default {
  title: 'molecules/map_markers/RegionMarker',
  component: RegionMarker,
} as ComponentMeta<typeof RegionMarker>;

export const Default: ComponentStory<typeof RegionMarker> = () => (
  <RegionMarker />
);

Default.args = {};
