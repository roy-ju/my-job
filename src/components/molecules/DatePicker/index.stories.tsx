import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DatePicker from '.';

export default {
  title: 'molecules/DatePicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

export const Default: ComponentStory<typeof DatePicker> = () => (
  <div tw="flex flex-col gap-4">
    <DatePicker />
  </div>
);

Default.args = {};
