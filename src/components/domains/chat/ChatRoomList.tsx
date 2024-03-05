import { Loading } from '@/components/atoms';

import Container from '@/components/atoms/Container';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import { NavigationHeader } from '@/components/molecules';

import useCtasHandler from './list/hooks/useCtasHandler';

import useGetChatRoomList from './list/hooks/useGetChatRoomList';

import NoData from './list/NoData';

import List from './list/List';

export default function ChatRoomList() {
  const { chatRoomList, isLoading, mutate } = useGetChatRoomList();

  const { handleClickChatRoomListItem, handleClickSuggestForm } = useCtasHandler({ mutateFunc: mutate });

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.Title>채팅</NavigationHeader.Title>
      </NavigationHeader>
      {chatRoomList.length === 0 && <NoData onClickSuggestForm={handleClickSuggestForm} />}
      {chatRoomList.length > 0 && <List list={chatRoomList} handleClickListItem={handleClickChatRoomListItem} />}
    </Container>
  );
}
