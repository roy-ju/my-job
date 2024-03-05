import { Avatar as BaseAvatar } from '@/components/atoms';

import { AvatarProps } from '@/components/atoms/Avatar';

export function Avatar({ size = 32, ...others }: AvatarProps) {
  return <BaseAvatar size={size} {...others} />;
}

export const AvatarType = (<Avatar />).type;
