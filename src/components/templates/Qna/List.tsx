import tw, { styled } from 'twin.macro';
import QnaListItem from '@/components/organisms/QnaListItem';

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-x-hidden overflow-y-auto`}
  & > div {
    ${tw`border-b border-gray-100`}
  }
`;

export interface IQnaItem {
  admin_message: string;
  admin_response_time: string;
  created_time: string;
  id: number;
  user_id: number;
  user_message: string;
}

export default function List({ list }: { list: IQnaItem[] }) {
  return (
    <ListContainer>
      {list.map((item) => (
        <QnaListItem key={item.id}>
          <QnaListItem.User
            userMessage={item.user_message}
            createdTime={item.created_time}
            didReply={!!item.admin_message}
          />
          {item.admin_message ? (
            <QnaListItem.Admin adminMessage={item.admin_message} responseTime={item.admin_response_time} />
          ) : null}
        </QnaListItem>
      ))}
    </ListContainer>
  );
}
