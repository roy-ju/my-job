import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapSearchInput from '.';

export default {
  title: 'organisms/MapSearchInput',
  component: MapSearchInput,
} as ComponentMeta<typeof MapSearchInput>;

export const Default: ComponentStory<typeof MapSearchInput> = () => (
  <MapSearchInput />
);

Default.args = {};
