import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Slider from '.';

export default {
  title: 'molecules/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

export const Default: ComponentStory<typeof Slider> = () => (
  <Slider
    min={0}
    max={10}
    step={1}
    defaultValue={[0, 10]}
    labels={['0', '5억', '무제한']}
  />
);

Default.args = {};
