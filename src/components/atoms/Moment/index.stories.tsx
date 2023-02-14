import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Moment from '.';

export default {
  title: 'atoms/Moment',
  component: Moment,
  argTypes: {
    falsy: {
      type: 'string',
    },
    children: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof Moment>;

export const Default: ComponentStory<typeof Moment> = (args) => (
  <Moment {...args} />
);

Default.args = {
  format: 'YYYY년 M월 D일',
  children: '2023-01-02',
};
