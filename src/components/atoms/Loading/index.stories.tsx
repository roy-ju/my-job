import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Loading from '.';

export default {
  title: 'atoms/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Default: ComponentStory<typeof Loading> = () => <Loading />;

export const Center: ComponentStory<typeof Loading> = () => <Loading tw="text-center" />;
