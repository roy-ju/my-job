import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Developer from '.';

export default {
  title: 'templates/Developer',
  component: Developer,
} as ComponentMeta<typeof Developer>;

export const Default: ComponentStory<typeof Developer> = () => (
  <div tw="w-[380px] h-full bg-white">
    <Developer />
  </div>
);
