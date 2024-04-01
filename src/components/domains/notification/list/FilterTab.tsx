import { useCallback } from 'react';

import { ButtonGroup } from '@/components/molecules';

import useControlled from '@/hooks/useControlled';

import { TabButton } from './widget/ListWidget';

import tabListItems from './constants/tabListItems';

interface FilterTabProps {
  index?: number;
  onChangeIndex?: (index: number) => void;
}

export default function FilterTab({ index: indexProp, onChangeIndex }: FilterTabProps) {
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
      {tabListItems.map((item, i) => (
        <TabButton key={item} selected={index === i} onClick={handleChangeIndex(i)}>
          {item}
        </TabButton>
      ))}
    </ButtonGroup>
  );
}
