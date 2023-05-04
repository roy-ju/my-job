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

export const Default: ComponentStory<typeof Moment> = (args) => <Moment {...args} />;

Default.args = {
  format: 'YYYY년 M월 D일',
  children: '2023-01-02',
};

// 2023-05-04T01:48:03.471Z
export const CalenarFormat: ComponentStory<typeof Moment> = () => (
  <div tw="flex flex-col">
    <Moment format="calendar">2023-05-04T09:48:03.471Z</Moment>
    <Moment format="calendar">2023-05-04T00:10:03.471Z</Moment>
    <Moment format="calendar">2023-05-03T00:10:03.471Z</Moment>
    <Moment format="calendar">2023-04-30T00:10:03.471Z</Moment>
    <Moment format="calendar">2023-01-30T00:10:03.471Z</Moment>
  </div>
);
