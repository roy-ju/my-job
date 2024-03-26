import { memo } from 'react';

import tw, { styled } from 'twin.macro';

import NotifcitaionIcon from '@/assets/icons/icons_24_notification.svg';

type HeaderNotificationButtonProps = { unreadNotificationCount?: number; handleClick?: () => void };

const Button = styled.button`
  ${tw`relative`}
`;

const Count = styled.span`
  ${tw`absolute top-0 -right-0.5 animate-bounce text-[8px] text-white font-bold leading-none px-1 h-3 bg-red rounded-full inline-flex items-center justify-center`}
`;

function HeaderNotificationButton({ unreadNotificationCount, handleClick }: HeaderNotificationButtonProps) {
  return (
    <Button type="button" tw="relative" onClick={handleClick}>
      <NotifcitaionIcon />
      {!!unreadNotificationCount && <Count>{unreadNotificationCount}</Count>}
    </Button>
  );
}

export default memo(HeaderNotificationButton);
