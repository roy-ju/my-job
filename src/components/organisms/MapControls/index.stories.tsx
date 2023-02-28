import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapControls from '.';

export default {
  title: 'organisms/MapControls',
  component: MapControls,
} as ComponentMeta<typeof MapControls>;

export const Default: ComponentStory<typeof MapControls> = () => (
  <div tw="inline-flex flex-col gap-2">
    <MapControls.Group>
      <MapControls.MapButton />
      <MapControls.RoadMapButton />
      <MapControls.MapTileButton />
      <MapControls.SchoolButton />
    </MapControls.Group>

    <MapControls.Group>
      <MapControls.ZoomInButton />
      <MapControls.ZoomOutButton />
    </MapControls.Group>

    <MapControls.GPSButton />
  </div>
);
