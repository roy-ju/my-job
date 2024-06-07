import dynamic from 'next/dynamic';

import { Button } from '@/components/atoms';

import NewCount from '@/components/atoms/NewCount';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import SearchIcon from '@/assets/icons/search_24px.svg';

import LogoIcon from '@/assets/icons/header_logo.svg';

import NotificationIcon from '@/assets/icons/notification_24px.svg';

const MobileSearchMap = dynamic(() => import('@/components/domains/map/MobileMapSearch'), { ssr: false });

interface Props {
  value?: number | boolean | null;
}

export default function MobileMapHeader({ value }: Props) {
  const { addFullScreenDialog } = useFullScreenDialog();

  const onClickSearchIcon = () => {
    addFullScreenDialog({
      body: <MobileSearchMap />,
    });
  };

  return (
    <>
      <div tw="flex items-center w-full bg-gradient-to-r from-nego-1200 to-nego-1100 px-5 py-4">
        <LogoIcon tw="text-white" />
        <div tw="flex items-center ml-auto gap-5">
          <Button variant="ghost" tw="px-0 h-auto" onClick={onClickSearchIcon}>
            <SearchIcon />
          </Button>
          <Button variant="ghost" tw="px-0 h-auto relative">
            <NotificationIcon />
            <div tw="absolute -top-0.5 -right-1.5">{!!value && <NewCount value={value} />}</div>
          </Button>
        </div>
      </div>
    </>
  );
}
