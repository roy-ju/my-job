import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Toggle from '.';

export default {
  title: 'atoms/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

export const Default: ComponentStory<typeof Toggle> = () => <Toggle />;
