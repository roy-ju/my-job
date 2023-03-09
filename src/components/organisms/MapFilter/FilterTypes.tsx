import { Button } from '@/components/atoms';
import { ButtonProps } from '@/components/atoms/Button';
import tw, { styled } from 'twin.macro';
import FilterIcon from '@/assets/icons/filter.svg';
import { useControlled, useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import ChevronDownIcon from '@/assets/icons/chevron_down.svg';
import { isOverflown as checkOverflow } from '@/utils';
import { FilterType } from './types';

function getFilterTypeLabel(filterType: FilterType) {
  if (filterType === 'realestateType') {
    return '유형';
  }
  if (filterType === 'buyOrRent') {
    return '거래 종류';
  }
  if (filterType === 'price') {
    return '가격';
  }
  if (filterType === 'saedaeCount') {
    return '세대수';
  }
  if (filterType === 'etc') {
    return '기타';
  }

  return 'N/A';
}

const FilterButton = styled(
  ({ size = 'small', variant = 'outlined', ...props }: ButtonProps) => (
    <Button size={size} variant={variant} {...props} />
  ),
)(() => [tw`text-b2 shrink-0`]);

interface FilterTypesProps {
  filterTypes: FilterType[];
  expanded: boolean;
  onToggleExpansion: () => void;
  onClickFilterType: (filterType: FilterType) => void;
}

export default function FilterTypes({
  filterTypes,
  expanded: expandedProp,
  onToggleExpansion,
  onClickFilterType,
}: FilterTypesProps) {
  const [filterContainer, setFilterContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const [isExpanded, setIsExpandedState] = useControlled({
    controlled: expandedProp,
    default: false,
  });
  const [isOverflown, setIsOverflown] = useState(false);

  const handleToggleFilterExpansion = useCallback(() => {
    setIsExpandedState((prev) => !prev);
    onToggleExpansion();
  }, [setIsExpandedState, onToggleExpansion]);

  useIsomorphicLayoutEffect(() => {
    if (filterContainer) {
      setIsOverflown(checkOverflow(filterContainer));
    }
  }, [filterContainer, isExpanded, filterTypes]);

  return (
    <div tw="flex relative">
      <div
        ref={setFilterContainer}
        css={[
          tw`flex items-center gap-2 p-4 overflow-x-hidden`,
          isExpanded && tw`flex-wrap`,
        ]}
      >
        <FilterButton tw="p-2" onClick={() => onClickFilterType('all')}>
          <FilterIcon />
        </FilterButton>
        {filterTypes.map((filterType) => (
          <FilterButton
            key={filterType}
            onClick={() => onClickFilterType(filterType)}
          >
            {getFilterTypeLabel(filterType)}
          </FilterButton>
        ))}
      </div>
      {isExpanded && (
        <Button
          onClick={handleToggleFilterExpansion}
          size="none"
          variant="ghost"
          tw="w-10 h-12 pt-4 pr-2 bg-white shrink-0"
        >
          <ChevronDownIcon
            style={{
              transform: 'rotate(180deg)',
            }}
          />
        </Button>
      )}
      {filterContainer && !isExpanded && isOverflown && (
        <div tw="absolute top-0 right-0 h-full flex items-center">
          <div tw="w-10 h-full bg-gradient-to-l from-white to-transparent" />
          <Button
            onClick={handleToggleFilterExpansion}
            size="none"
            variant="ghost"
            tw="w-10 h-full pr-2 bg-white"
          >
            <ChevronDownIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
