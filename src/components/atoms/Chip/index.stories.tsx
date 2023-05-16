import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Chip from '.';

export default {
  title: 'atoms/Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

export const Default: ComponentStory<typeof Chip> = () => (
  <div tw="flex gap-2">
    <Chip variant="nego">nego</Chip>
    <Chip variant="red">red</Chip>
    <Chip variant="gray">gray</Chip>
    <Chip variant="green">green</Chip>
    <Chip variant="blue">blue</Chip>
    <Chip variant="orange">oragne</Chip>
    <Chip variant="yellow">yellow</Chip>
    <Chip variant="black">black</Chip>
    <Chip variant="lightBlue">lightBlue</Chip>
    <Chip variant="outlined">outlined</Chip>
  </div>
);
