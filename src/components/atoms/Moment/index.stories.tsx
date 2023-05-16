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

export const Formats: ComponentStory<typeof Moment> = () => (
  <div tw="flex flex-col gap-2">
    <Moment format="a h시 mm분">2023-01-02T09:48:03.471Z</Moment>
    <Moment format="YYYY-MM-DD">2023/01/02</Moment>
    <Moment format="YYYY.MM.DD">20230102</Moment>
    <Moment format="YYYY.MM.DD a h:mm">2023-01-02T09:48:03.471Z</Moment>
    <Moment format="YYYY.MM.DD a hh시 mm분">2023-01-02T09:48:03.471Z</Moment>
    <Moment format="YYYY년 M월 DD일">2023 01 02</Moment>
    <Moment format="YYYY년 MM월 DD일 a h시 mm분">2023-01-02T09:48:03.471Z</Moment>
    <Moment format="YYYY.MM.DD a h:mm">2023-01-02T09:48:03.471Z</Moment>
  </div>
);

// 2023-05-04T01:48:03.471Z
export const CalendarFormat: ComponentStory<typeof Moment> = () => (
  <div tw="flex flex-col">
    <Moment format="calendar">2023-05-04T09:48:03.471Z</Moment>
    <Moment format="calendar">2023-05-04T00:10:03.471Z</Moment>
    <Moment format="calendar">2023-05-03T00:10:03.471Z</Moment>
    <Moment format="calendar">2023-04-30T00:10:03.471Z</Moment>
    <Moment format="calendar">2023-01-30T00:10:03.471Z</Moment>
  </div>
);

export const MessageFormat: ComponentStory<typeof Moment> = () => {
  const now = new Date();
  const today = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  const afterDay = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return (
    <div tw="flex flex-col">
      <Moment format="message">{now.toISOString()}</Moment>
      <Moment format="message">{today.toISOString()}</Moment>
      <Moment format="message">{afterDay.toISOString()}</Moment>
    </div>
  );
};
