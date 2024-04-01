import tw, { styled } from 'twin.macro';

import { ListItemViewTimeText, ListItemTitle, ListItemSubTitle } from './widget/RealestateDocumentListWidget';

const ListItemButton = styled.button`
  ${tw`flex flex-col gap-0.5 text-left w-full rounded-2xl border border-gray-200 p-5`}
`;

type ListItemProps = { lookupText: string; title: string; subTitle?: string; handleClickItem: () => void };

export default function ListItem({ lookupText, title, subTitle, handleClickItem }: ListItemProps) {
  return (
    <ListItemButton onClick={handleClickItem}>
      {lookupText && <ListItemViewTimeText tw="mb-0.5">{lookupText}</ListItemViewTimeText>}
      {title && <ListItemTitle>{title}</ListItemTitle>}
      {subTitle && <ListItemSubTitle>{subTitle}</ListItemSubTitle>}
    </ListItemButton>
  );
}
