import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Loading from '.';

export default {
  title: 'atoms/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Default: ComponentStory<typeof Loading> = () => (
  <div tw="flex flex-col gap-5">
    <Loading size="small" />
    <Loading size="medium" />
  </div>
);

export const Center: ComponentStory<typeof Loading> = () => <Loading tw="text-center" />;
