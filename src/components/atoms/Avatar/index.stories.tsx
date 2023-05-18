import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import Avatar from '.';

export default {
  title: 'atoms/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

export const Default: ComponentStory<typeof Avatar> = () => (
  <div tw="flex flex-col gap-2">
    <div tw="flex gap-2 items-center">
      <Avatar alt="alt" src={defaultAvatar} size={40} />
      <Avatar alt="alt" src={defaultAvatar} />
      <Avatar alt="alt" src={defaultAvatar} size={100} />
    </div>
    <div tw="flex gap-2">
      <Avatar alt="alt" src={defaultAvatar} />
      <Avatar alt="alt" src={defaultAvatar} active={false} />
      <Avatar alt="alt" src={defaultAvatar} active />
    </div>
  </div>
);
