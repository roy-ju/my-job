import type { ComponentMeta, ComponentStory } from '@storybook/react';
import RegionMarker from '.';

export default {
  title: 'molecules/map_markers/RegionMarker',
  component: RegionMarker,
} as ComponentMeta<typeof RegionMarker>;

export const DongRealPrice: ComponentStory<typeof RegionMarker> = (args) => (
  <RegionMarker {...args}>
    <RegionMarker.DanjiCount count={0} />
    <RegionMarker.Divider />
    <RegionMarker.ListingCount count={0} />
  </RegionMarker>
);

DongRealPrice.storyName = '동/실거래가';
DongRealPrice.args = {
  name: '논현동',
};

export const DongHoga: ComponentStory<typeof RegionMarker> = (args) => (
  <RegionMarker {...args}>
    <RegionMarker.ListingCount count={0} />
  </RegionMarker>
);

DongHoga.storyName = '동/호가';
DongHoga.args = {
  name: '논현동',
};
