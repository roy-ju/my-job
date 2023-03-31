import tw, { styled } from 'twin.macro';
import { ServiceContactListItem } from '@/components/organisms/ServiceContactListItem';

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-x-hidden overflow-y-auto`}
  & > div {
    ${tw`border-b border-gray-100`}
  }
`;

export interface IServiceContactItem {
  id: number;
  contents: string;
  createdTime: string;
  didReply: boolean;
  adminContents: string;
  adminCreatedTime: string;
}

export default function List({ list }: { list: IServiceContactItem[] }) {
  return (
    <ListContainer>
      {list.map((item) => (
        <ServiceContactListItem key={item.id}>
          <ServiceContactListItem.User
            contents={item.contents}
            createdTime={item.createdTime}
            didReply={item.didReply}
          />
          {item.didReply ? (
            <ServiceContactListItem.Admin contents={item.adminContents} createdTime={item.adminCreatedTime} />
          ) : null}
        </ServiceContactListItem>
      ))}
    </ListContainer>
  );
}
