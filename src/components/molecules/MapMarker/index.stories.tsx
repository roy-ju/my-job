import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapMarker from './index';

export default {
  title: 'molecules/MapMarker',
  component: MapMarker,
} as ComponentMeta<typeof MapMarker>;

export const Default: ComponentStory<typeof MapMarker> = (args) => (
  <MapMarker {...args}>
    <div tw="text-[12px]">34평</div>
    <div tw="text-[16px] font-bold">30.4억</div>
  </MapMarker>
);

Default.args = {};
