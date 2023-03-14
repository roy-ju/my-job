import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapStreetView from '.';

export default {
  title: 'templates/MapStreetView',
  component: MapStreetView,
} as ComponentMeta<typeof MapStreetView>;

export const Default: ComponentStory<typeof MapStreetView> = () => (
  <MapStreetView title="서울특별시 강남구 역삼동" position={{ lat: 0, lng: 0 }} />
);
