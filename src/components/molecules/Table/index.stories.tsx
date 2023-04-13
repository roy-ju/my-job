import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Table from '.';

export default {
  title: 'molecules/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

export const Default: ComponentStory<typeof Table> = (args) => <Table {...args} />;

Default.args = {};
