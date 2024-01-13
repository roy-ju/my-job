import { Button as ButtonBase } from '@/components/atoms';
import { ButtonGroup } from '@/components/molecules';
import useControlled from '@/hooks/useControlled';
import { useCallback } from 'react';
import tw, { styled } from 'twin.macro';

const items = ['전체', '서비스', '거래', '마케팅', '커뮤니티'];

const Button = styled(ButtonBase)(({ selected }) => [
  tw`h-12 px-3 font-bold leading-none text-gray-600 transition-colors text-b1`,
  selected && tw`text-gray-1000`,
]);

interface Props {
  index?: number;
  onChangeIndex?: (index: number) => void;
}

export default function NotificationFilterTab({ index: indexProp, onChangeIndex }: Props) {
  const [index, setIndex] = useControlled({
    controlled: indexProp,
    default: 0,
  });

  const handleChangeIndex = useCallback(
    (i: number) => () => {
      setIndex(i);
      onChangeIndex?.(i);
    },
    [setIndex, onChangeIndex],
  );

  return (
    <ButtonGroup variant="ghost" size="none" tw="flex border-b border-gray-300 bg-white px-2">
      {items.map((item, i) => (
        <Button key={item} selected={index === i} onClick={handleChangeIndex(i)}>
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
}
