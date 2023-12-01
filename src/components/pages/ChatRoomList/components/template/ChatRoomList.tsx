import { Loading } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import useClientInit from '../../hooks/useClientInit';

import List from '../organisms/List';

import NoData from '../organisms/NoData';

export default function ChatRoomList() {
  const { renderCondition } = useClientInit();

  if (!renderCondition) return null;

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>채팅</NavigationHeader.Title>
      </NavigationHeader>

      {renderCondition === 'loading' && <Loading tw="text-center mt-10" />}

      {renderCondition === 'nodata' && <NoData />}

      {renderCondition === 'list' && <List />}
    </div>
  );
}
