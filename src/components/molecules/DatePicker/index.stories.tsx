import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DatePicker from '.';

export default {
  title: 'molecules/DatePicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

export const Default: ComponentStory<typeof DatePicker> = (args) => (
  <div tw="flex flex-col gap-4">
    <DatePicker {...args} />
  </div>
);

Default.args = {
  variant: 'outlined',
  placeholder: '날짜선택',
};
