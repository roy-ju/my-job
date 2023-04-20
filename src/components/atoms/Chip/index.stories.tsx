import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Chip from '.';

export default {
  title: 'atoms/Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

export const Default: ComponentStory<typeof Chip> = () => (
  <div tw="flex gap-2">
    <Chip>상담</Chip>
    <Chip variant="red">참여</Chip>
    <Chip variant="gray">참여</Chip>
    <Chip variant="green">참여</Chip>
  </div>
);
