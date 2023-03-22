import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import MySummary from '.';

export default {
  title: 'organisms/MySummary',
  component: MySummary,
} as ComponentMeta<typeof MySummary>;

export const Default: ComponentStory<typeof MySummary> = (args) => (
  <div tw="bg-white">
    <MySummary {...args} />
  </div>
);

Default.args = {
  isLoading: false,
  profileImagePath: defaultAvatar,
  nickname: '김네고',
};
