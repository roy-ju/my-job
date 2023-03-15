import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import Avatar from '.';

export default {
  title: 'atoms/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

export const Default: ComponentStory<typeof Avatar> = () => (
  <div tw="flex items-center gap-2">
    <Avatar alt="alt" src={defaultAvatar} />
    <Avatar alt="alt" src={defaultAvatar} active={false} />
    <Avatar alt="alt" src={defaultAvatar} active />
  </div>
);
