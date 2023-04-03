import tw, { styled } from 'twin.macro';
import { ServiceContactListItem } from '@/components/organisms/ServiceContactListItem';

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-x-hidden overflow-y-auto`}
  & > div {
    ${tw`border-b border-gray-100`}
  }
`;

export interface IServiceContactItem {
  admin_message: string;
  admin_response_time: string;
  created_time: string;
  id: number;
  user_id: number;
  user_message: string;
}

export default function List({ list }: { list: IServiceContactItem[] }) {
  return (
    <ListContainer>
      {list.map((item) => (
        <ServiceContactListItem key={item.id}>
          <ServiceContactListItem.User
            userMessage={item.user_message}
            createdTime={item.created_time}
            didReply={!!item.admin_message}
          />
          {item.admin_message ? (
            <ServiceContactListItem.Admin adminMessage={item.admin_message} responseTime={item.admin_response_time} />
          ) : null}
        </ServiceContactListItem>
      ))}
    </ListContainer>
  );
}
