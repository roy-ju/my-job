import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NewCount from '.';

export default {
  title: 'atoms/NewCount',
  component: NewCount,
} as ComponentMeta<typeof NewCount>;

export const Default: ComponentStory<typeof NewCount> = () => (
  <div tw="flex gap-2">
    <NewCount value={1} />
    <NewCount value={99} />
    <NewCount value={100} />
    <NewCount value={1000} />
  </div>
);
