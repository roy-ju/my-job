import tw, { styled } from 'twin.macro';
import { ServiceContactListItem } from '@/components/organisms/ServiceContactListItem';

const ListContainer = styled.div`
  ${tw`overflow-y-auto h-[calc(100%_-_88px)]  overflow-x-hidden`}
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
          <ServiceContactListItem.User contents={item.contents} createdTime={item.createdTime} />
          <ServiceContactListItem.Admin contents={item.adminContents} createdTime={item.adminCreatedTime} />
        </ServiceContactListItem>
      ))}
    </ListContainer>
  );
}
