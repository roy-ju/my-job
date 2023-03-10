import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import MapToggleButton from '.';

export default {
  title: 'organisms/MapToggleButton',
  component: MapToggleButton,
} as ComponentMeta<typeof MapToggleButton>;

export const Default: ComponentStory<typeof MapToggleButton> = () => {
  const [value, setValue] = useState(0);

  return <MapToggleButton value={value} onClick={(i: number) => setValue(i)} />;
};
