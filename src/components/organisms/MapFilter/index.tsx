import { Button } from '@/components/atoms';
import { ButtonProps } from '@/components/atoms/Button';
import tw, { styled } from 'twin.macro';
import { useControlled } from '@/hooks/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import FilterTypes from './FilterTypes';
import { FilterType, RealestateTypeGroup } from './types';
import RealestateTypeFilter from './RealestateTypeFilter';
import BuyorRentFilter from './BuyOrRentFilter';
import PriceFilter from './PriceFilter';

function useFilterType(filterType: FilterType, filters: FilterType[]) {
  return useMemo(() => filters.includes(filterType), [filters, filterType]);
}

const FiltersContainer = styled.div`
  & > div {
    ${tw`mx-4`}
  }

  & > div:not(:last-of-type) {
    ${tw`border-b border-gray-300`}
  }
`;

const RealestateTypeGroupTabButton = styled(
  ({ size = 'bigger', variant = 'ghost', ...props }: ButtonProps) => (
    <Button size={size} variant={variant} {...props} />
  ),
)(({ isSelected }) => [
  tw`px-2 font-bold text-gray-600 text-b1`,
  isSelected && tw`text-gray-1000`,
]);

const Separator = tw.div`w-px h-2 bg-gray-300 mx-2`;

interface MapFilterProps {
  realestateTypeGroup?: RealestateTypeGroup;
  onChangerealestateTypeGroup?: (
    realestateTypeGroup: RealestateTypeGroup,
  ) => void;
}

export default function MapFilter({
  realestateTypeGroup: realestateTypeGroupProp,
  onChangerealestateTypeGroup,
}: MapFilterProps) {
  const [realestateTypeGroup, setrealestateTypeGroupState] = useControlled({
    controlled: realestateTypeGroupProp,
    default: 'apt,oftl' as RealestateTypeGroup,
  });

  const [isFilterTypesExpanded, setIsFilterTypeExapnded] = useState(false);

  const [filterTypes, setFilterTypes] = useState<FilterType[]>([
    'realestateType',
    'buyOrRent',
    'price',
    'saedaeCount',
    'etc',
  ]);

  const [filters, setFilters] = useState<FilterType[]>([]);

  const isRealestateTypeFilterAdded = useFilterType('realestateType', filters);

  const isBuyOrRentFilterAdded = useFilterType('buyOrRent', filters);

  const isPriceFilterAdded = useFilterType('price', filters);

  // const isSaedaeCountFilterAdded = useFilterType('realestateType', filters);

  const handlerealestateTypeGroupChange = useCallback(
    (value: RealestateTypeGroup) => {
      setrealestateTypeGroupState(value);
      onChangerealestateTypeGroup?.(value);
    },
    [setrealestateTypeGroupState, onChangerealestateTypeGroup],
  );

  const handleToggleExpansion = useCallback(() => {
    setIsFilterTypeExapnded((prev) => !prev);
  }, []);

  const handleClickFilterType = useCallback(
    (filterType: FilterType) => {
      if (filterType === 'all') {
        setFilters([...filterTypes]);
      } else {
        setFilters((prev) => {
          if (prev.length > 1 || prev[0] !== filterType) {
            return [filterType];
          }
          return prev;
        });
      }
    },
    [filterTypes],
  );

  useEffect(() => {
    switch (realestateTypeGroup) {
      case 'apt,oftl':
        setFilterTypes(['realestateType', 'buyOrRent', 'price', 'saedaeCount']);
        break;
      case 'villa,dandok':
        setFilterTypes(['realestateType', 'buyOrRent', 'price']);
        break;
      case 'one,two':
        setFilterTypes(['realestateType', 'buyOrRent', 'price']);
        break;
      default:
        break;
    }
  }, [realestateTypeGroup]);

  return (
    <motion.div layout tw="bg-white shadow rounded-lg overflow-hidden">
      <motion.div layout="preserve-aspect">
        <div tw="flex items-center px-2">
          <RealestateTypeGroupTabButton
            isSelected={realestateTypeGroup === 'apt,oftl'}
            onClick={() => handlerealestateTypeGroupChange('apt,oftl')}
          >
            아파트 · 오피스텔
          </RealestateTypeGroupTabButton>
          <Separator />
          <RealestateTypeGroupTabButton
            isSelected={realestateTypeGroup === 'villa,dandok'}
            onClick={() => handlerealestateTypeGroupChange('villa,dandok')}
          >
            빌라 · 주택
          </RealestateTypeGroupTabButton>
          <Separator />
          <RealestateTypeGroupTabButton
            isSelected={realestateTypeGroup === 'one,two'}
            onClick={() => handlerealestateTypeGroupChange('one,two')}
          >
            원룸 · 투룸
          </RealestateTypeGroupTabButton>
        </div>
        <div tw="w-full h-px bg-gray-300" />
        <FilterTypes
          filterTypes={filterTypes}
          expanded={isFilterTypesExpanded}
          onToggleExpansion={handleToggleExpansion}
          onClickFilterType={handleClickFilterType}
        />
        <div tw="w-full h-px bg-gray-300" />
        <FiltersContainer>
          {isRealestateTypeFilterAdded && (
            <RealestateTypeFilter realestateTypeGroup={realestateTypeGroup} />
          )}
          {isBuyOrRentFilterAdded && (
            <BuyorRentFilter realestateTypeGroup={realestateTypeGroup} />
          )}
          {isPriceFilterAdded && <PriceFilter buyOrRents="1,2,3" />}
        </FiltersContainer>
      </motion.div>
    </motion.div>
  );
}
