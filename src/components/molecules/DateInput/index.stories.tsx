import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DateInput from '.';

export default {
  title: 'molecules/DateInput',
  component: DateInput,
} as ComponentMeta<typeof DateInput>;

export const Default: ComponentStory<typeof DateInput> = () => <DateInput />;

Default.args = {};
