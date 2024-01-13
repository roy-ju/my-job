import { memo, useCallback, useMemo, useState } from 'react';

import tw, { styled } from 'twin.macro';

import { Button } from '@/components/atoms';

import { ButtonProps } from '@/components/atoms/Button';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import useControlled from '@/hooks/useControlled';

import { formatNumberInKorean, isOverflown as checkOverflow } from '@/utils';

import { BuyOrRentString, RealestateTypeString } from '@/constants/strings';

import { RealestateType } from '@/constants/enums';

import ChevronDownIcon from '@/assets/icons/chevron_down.svg';

import { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from './PriceFilter';

import { Filter, FilterType } from './types';

function f(n: number, short = false) {
  return formatNumberInKorean(n, {
    short,
    formatFn: (v) => v.toLocaleString('ko-KR', { useGrouping: true }),
  });
}

function getRangeLabel(steps: number[], range: number[], short = false) {
  return range
    .map((item) => {
      if (item === steps.length - 1) {
        return '';
      }
      return f(steps[item], short);
    })
    .filter((item) => item !== '0')
    .join('~');
}

function getFilterTypeProps(filterType: FilterType, filter: Filter): [string, boolean] {
  if (filterType === 'realestateType') {
    const realestateTypes = filter.realestateTypes.split(',');

    if (filter.realestateTypes === [RealestateType.Yunrip, RealestateType.Dasaedae].join(',')) {
      return ['빌라', true];
    }

    if (filter.realestateTypes === [RealestateType.Dandok, RealestateType.Dagagoo].join(',')) {
      return ['단독 / 다가구', true];
    }

    if (filter.roomCounts === '1') {
      return ['원룸', true];
    }

    if (filter.roomCounts === '2') {
      return ['투룸', true];
    }

    if (filter.roomCounts === '1,2') {
      return ['전체', true];
    }

    if (realestateTypes.length > 1) return ['전체', true];

    return [RealestateTypeString[Number(realestateTypes[0])], true];
  }
  if (filterType === 'buyOrRent') {
    const roomCounts = filter.roomCounts;
    const buyOrRents = filter.buyOrRents.split(',');

    if (buyOrRents.length > 2) return ['매매 / 전월세', true];

    if (roomCounts !== '') {
      if (buyOrRents.length > 1) return ['전월세', true];
    }

    if (filter.buyOrRents === '2,3') {
      return ['전월세', true];
    }

    return [BuyOrRentString[Number(buyOrRents[0])], true];
  }
  if (filterType === 'price') {
    const { priceRange, depositRange, rentRange } = filter;
    const labels = [];

    if (priceRange[0] !== 0 || priceRange[1] !== PRICE_STEPS.length - 1) {
      labels.push(getRangeLabel(PRICE_STEPS, priceRange, true));
    }

    if (depositRange[0] !== 0 || depositRange[1] !== DEPOSIT_STEPS.length - 1) {
      labels.push(`보 ${getRangeLabel(DEPOSIT_STEPS, depositRange, true)}`);
    }

    if (rentRange[0] !== 0 || rentRange[1] !== RENT_STEPS.length - 1) {
      labels.push(`월 ${getRangeLabel(RENT_STEPS, rentRange, false)}`);
    }

    if (labels.length > 0) {
      return [labels.join(' / '), true];
    }
    return ['가격', false];
  }
  if (filterType === 'household') {
    if (filter.minHousehold !== '0') {
      return [`${filter.minHousehold}세대~`, true];
    }

    return ['세대수', false];
  }
  if (filterType === 'etc') {
    const labels = [];
    if (filter.quickSale) {
      labels.push('급매');
    }
    if (filter.gapInvestment) {
      labels.push('갭투자');
    }
    if (labels.length > 0) {
      return [labels.join(', '), true];
    }

    return ['기타', false];
  }

  return ['N/A', false];
}

const FilterButton = memo(
  styled(({ size = 'small', variant = 'outlined', ...props }: ButtonProps) => (
    <Button size={size} variant={variant} {...props} />
  ))(() => [tw`pr-0 text-b2 shrink-0`]),
);

interface FilterTypesProps {
  filterTypes: FilterType[];
  filter: Filter;
  expanded: boolean;
  onToggleExpansion: () => void;
  onClickFilterType?: (filterType: FilterType) => void;
}

export default function FilterTypesMedium({
  filterTypes,
  filter,
  expanded: expandedProp,
  onToggleExpansion,
  onClickFilterType,
}: FilterTypesProps) {
  const [filterContainer, setFilterContainer] = useState<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpandedState] = useControlled({
    controlled: expandedProp,
    default: false,
  });
  const [isOverflown, setIsOverflown] = useState(false);

  const filterTypeProps = useMemo(() => {
    const list: { [key: string]: { label: string; selected: boolean } } = {};
    filterTypes.forEach((filterType) => {
      const [label, selected] = getFilterTypeProps(filterType, filter);
      list[filterType] = {
        label,
        selected,
      };
    });
    return list;
  }, [filter, filterTypes]);

  const handleToggleFilterExpansion = useCallback(() => {
    setIsExpandedState((prev) => !prev);
    onToggleExpansion();
  }, [setIsExpandedState, onToggleExpansion]);

  useIsomorphicLayoutEffect(() => {
    if (filterContainer) {
      setIsOverflown(checkOverflow(filterContainer));
    }
  }, [filterContainer, isExpanded, filterTypes, filter]);

  return (
    <div tw="flex relative pl-4 pr-2">
      <div
        ref={setFilterContainer}
        css={[tw`flex items-center gap-2 py-3 overflow-x-hidden`, isExpanded && tw`flex-wrap`]}
      >
        {filterTypes.map((filterType) => (
          <FilterButton
            key={filterType}
            onClick={() => {
              if (onClickFilterType) {
                onClickFilterType(filterType);
              }
            }}
            selected={filterTypeProps[filterType].selected}
            tw="px-2"
          >
            {filterTypeProps[filterType].label}
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
          <Button onClick={handleToggleFilterExpansion} size="none" variant="ghost" tw="w-10 h-full pr-2 bg-white">
            <ChevronDownIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
