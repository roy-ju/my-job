import { Panel } from '@/components/atoms';
import { ChatRoomList as ChatRoomListTemplate } from '@/components/templates';
import useChatRoomList from './useChatRoomList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function ChatRoomList({ depth, panelWidth }: Props) {
  const { chatRoomList, isLoading, handleClickListItem, handleClickSuggestForm } = useChatRoomList(depth);

  return (
    <Panel width={panelWidth}>
      <ChatRoomListTemplate
        list={chatRoomList}
        isLoading={isLoading}
        onClickListItem={handleClickListItem}
        onClickSuggestForm={handleClickSuggestForm}
      />
    </Panel>
  );
}
