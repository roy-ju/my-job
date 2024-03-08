import tw, { styled } from 'twin.macro';

import { Title, Thumbnail } from './widget/ListItemWidget';

import useHandleClickListItem from './hooks/useHandleClickListItem';

type ListItemProps = {
  id: number;
  title: string;
  thumbnail: string;
};

const ListItemButton = styled.button`
  ${tw`flex flex-col gap-2 py-4 text-left`}
`;

export default function ListItem({ id, title, thumbnail }: ListItemProps) {
  const { handleClickListItem } = useHandleClickListItem({ id });

  return (
    <ListItemButton onClick={handleClickListItem} id={`negocio-dictionary-${title}`}>
      <Title>{title}</Title>
      <Thumbnail>{thumbnail}</Thumbnail>
    </ListItemButton>
  );
}
