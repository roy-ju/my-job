import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapToggleButton from '.';

export default {
  title: 'organisms/MapToggleButton',
  component: MapToggleButton,
} as ComponentMeta<typeof MapToggleButton>;

export const Default: ComponentStory<typeof MapToggleButton> = () => <MapToggleButton />;
