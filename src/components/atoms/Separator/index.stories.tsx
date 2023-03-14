import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Separator from '.';

export default {
  title: 'atoms/Separator',
  component: Separator,
} as ComponentMeta<typeof Separator>;

export const Default: ComponentStory<typeof Separator> = () => <Separator />;
