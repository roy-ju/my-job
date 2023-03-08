import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapFilter from '.';

export default {
  title: 'organisms/MapFilter',
  component: MapFilter,
} as ComponentMeta<typeof MapFilter>;

export const Default: ComponentStory<typeof MapFilter> = () => <MapFilter />;
