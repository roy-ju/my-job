import type { ComponentMeta, ComponentStory } from '@storybook/react';
import BottomBezel from '.';

export default {
  title: 'atoms/BottomBezel',
  component: BottomBezel,
} as ComponentMeta<typeof BottomBezel>;

export const Default: ComponentStory<typeof BottomBezel> = () => (
  <BottomBezel style={{ borderRadius: '10rem', maxWidth: '13.3rem' }} />
);
