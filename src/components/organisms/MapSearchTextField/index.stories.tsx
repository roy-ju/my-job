import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapSearchTextField from './index';

export default {
  title: 'organisms/MapSearchTextField',
  component: MapSearchTextField,
} as ComponentMeta<typeof MapSearchTextField>;

export const Default: ComponentStory<typeof MapSearchTextField> = () => (
  <MapSearchTextField />
);

Default.args = {
  width: '375px',
  animationDuration: 0.3,
};
