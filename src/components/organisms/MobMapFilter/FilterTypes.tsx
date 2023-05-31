import { Button } from '@/components/atoms';
import { ButtonProps } from '@/components/atoms/Button';
import tw, { styled } from 'twin.macro';
import FilterIcon from '@/assets/icons/filter.svg';
import { memo } from 'react';
import { FilterType } from './types';

const FilterButton = memo(
  styled(({ size = 'small', variant = 'outlined', ...props }: ButtonProps) => (
    <Button size={size} variant={variant} {...props} />
  ))(() => [tw`pr-0 text-b2 shrink-0`]),
);

interface FilterTypesProps {
  onClickFilterType: (filterType: FilterType) => void;
}

export default function FilterTypes({ onClickFilterType }: FilterTypesProps) {
  return (
    <div tw="flex relative px-2">
      <FilterButton tw="p-2" onClick={() => onClickFilterType('all')}>
        <FilterIcon />
      </FilterButton>
    </div>
  );
}
