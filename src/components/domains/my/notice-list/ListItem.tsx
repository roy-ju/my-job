import tw, { styled } from 'twin.macro';

import { Moment } from '@/components/atoms';

import { NoticeListItem } from '@/services/my/useFetchNoticeList';

type ListItemProps = { item: NoticeListItem; handleClickItem: (id: number) => void };

const ListItemWrraper = styled.div`
  ${tw`bg-white border-t-white not-first-of-type:border-t-gray-100 hover:bg-gray-50`}
`;

const ListItemButton = styled.button`
  ${tw`items-stretch w-full px-5 border-t-inherit text-start`}
`;

const Title = styled.div`
  ${tw`overflow-hidden leading-none text-b2 whitespace-nowrap text-ellipsis`}
`;

const ContentsWrraper = styled.div`
  ${tw`flex flex-col gap-2 py-5 border-t border-t-inherit`}
`;

export default function ListItem({ item, handleClickItem }: ListItemProps) {
  const { title, created_time } = item;

  return (
    <ListItemWrraper>
      <ListItemButton onClick={() => handleClickItem(item.id)}>
        <ContentsWrraper>
          <Title>{title}</Title>
          <Moment format="YYYY.MM.DD" tw="text-info leading-3.5 text-gray-700">
            {created_time}
          </Moment>
        </ContentsWrraper>
      </ListItemButton>
    </ListItemWrraper>
  );
}
