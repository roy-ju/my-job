import tw, { styled } from 'twin.macro';

type ListItemProps = {
  selected?: boolean;
  firstLine?: string;
  secondLine?: string;
  handleClickItem: () => void;
};

const ListItemButton = styled.button`
  ${tw`flex flex-col gap-1 p-5 text-left border rounded-2xl`}

  span {
    display: block;
  }

  span:nth-of-type(1) {
    ${tw`text-gray-900 text-body_03`}
  }

  span:nth-of-type(2) {
    ${tw`text-gray-700 text-body_02`}
  }
`;

export default function ListItem({ selected = false, firstLine, secondLine, handleClickItem }: ListItemProps) {
  return (
    <ListItemButton onClick={handleClickItem} css={[selected ? tw`bg-gray-100 border-gray-1000` : tw`border-gray-200`]}>
      {firstLine && <span>{firstLine}</span>}
      {secondLine && <span>{secondLine}</span>}
    </ListItemButton>
  );
}
