import { Button } from '@/components/atoms';
import { ButtonProps } from '@/components/atoms/Button';
import tw, { styled } from 'twin.macro';
import { useControlled } from '@/hooks/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BuyOrRent, RealestateType } from '@/constants/enums';
import FilterTypes from './FilterTypes';
import { Filter, FilterType, RealestateTypeGroup } from './types';
import RealestateTypeFilter from './RealestateTypeFilter';
import BuyorRentFilter from './BuyOrRentFilter';
import PriceFilter, {
  DEPOSIT_STEPS,
  PRICE_STEPS,
  RENT_STEPS,
} from './PriceFilter';
import HouseholdFilter from './HouseholdFilter';
import EtcFilter from './EtcFilter';

function getDefaultFilterAptOftl(): Filter {
  return {
    realestateTypes: [RealestateType.Apartment, RealestateType.Officetel].join(
      ',',
    ),
    buyOrRents: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
    priceRange: [0, PRICE_STEPS.length - 1],
    depositRange: [0, DEPOSIT_STEPS.length - 1],
    rentRange: [0, RENT_STEPS.length - 1],
  };
}

function getDefaultFilterVillaDandok(): Filter {
  return {
    realestateTypes: [
      RealestateType.Yunrip,
      RealestateType.Dasaedae,
      RealestateType.Dandok,
      RealestateType.Dagagoo,
    ].join(','),
    buyOrRents: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
    priceRange: [0, PRICE_STEPS.length - 1],
    depositRange: [0, DEPOSIT_STEPS.length - 1],
    rentRange: [0, RENT_STEPS.length - 1],
  };
}

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
  filter?: Filter;
  onChangerealestateTypeGroup?: (
    realestateTypeGroup: RealestateTypeGroup,
  ) => void;
  onChangeFilter?: (newFilter: Partial<Filter>) => void;
}

export default function MapFilter({
  realestateTypeGroup: realestateTypeGroupProp,
  filter: filterProp,
  onChangerealestateTypeGroup,
  onChangeFilter,
}: MapFilterProps) {
  // 필터 대분류 ("아파트,오피스텔", "빌라,주택", "원룸,투룸")
  const [realestateTypeGroup, setRealestateTypeGroupState] = useControlled({
    controlled: realestateTypeGroupProp,
    default: 'apt,oftl' as RealestateTypeGroup,
  });

  // 필터
  const [filter, setFilterState] = useControlled({
    controlled: filterProp,
    default: getDefaultFilterAptOftl(),
  });

  // 필터 종류 열림/닫힘
  const [isFilterTypesExpanded, setIsFilterTypeExapnded] = useState(false);

  // 선택가능한 필터 종류들
  const [filterTypes, setFilterTypes] = useState<FilterType[]>([
    'realestateType',
    'buyOrRent',
    'price',
    'household',
    'etc',
  ]);

  // 현재 열려있는 필터목록
  const [filters, setFilters] = useState<FilterType[]>([]);

  // 유형 필터 열림/닫힘
  const isRealestateTypeFilterAdded = useFilterType('realestateType', filters);

  // 거래 종류 필터 열림/닫힘
  const isBuyOrRentFilterAdded = useFilterType('buyOrRent', filters);

  // 가격 필터 열림/닫힘
  const isPriceFilterAdded = useFilterType('price', filters);

  // 세대수 필터 열림/닫힘
  const isHouseholdFilterAdded = useFilterType('household', filters);

  // 기타 필터 열림/닫힘
  const isEtcFilterAdded = useFilterType('etc', filters);

  // 필터 대분류 Change Event Handler
  const handleChangeRealestateTypeGroup = useCallback(
    (value: RealestateTypeGroup) => {
      setRealestateTypeGroupState(value);
      onChangerealestateTypeGroup?.(value);
      setFilters([]);
    },
    [setRealestateTypeGroupState, onChangerealestateTypeGroup],
  );

  // 필터 종류 열림/닫힘 Toggle Event Handler
  const handleToggleExpansion = useCallback(() => {
    setIsFilterTypeExapnded((prev) => !prev);
  }, []);

  // 필터 종류 Click Event Handler
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

  // 열려 있는 모든 필터 닫기 버튼 Click Event Handler
  const handleCloseFilters = useCallback(() => {
    setFilters([]);
  }, []);

  const handleResetFilter = useCallback(() => {
    let defaultFilter = null;

    if (realestateTypeGroup === 'apt,oftl') {
      defaultFilter = getDefaultFilterAptOftl();
    } else if (realestateTypeGroup === 'villa,dandok') {
      defaultFilter = getDefaultFilterVillaDandok();
    }
    if (defaultFilter !== null) {
      setFilterState(defaultFilter);
      onChangeFilter?.(defaultFilter);
    }
  }, [realestateTypeGroup, setFilterState, onChangeFilter]);

  // 유형 필터 Change Event Handler
  const handleChangeRealestateTypes = useCallback(
    (newRealestateTypes: string) => {
      setFilterState((prev) => ({
        ...prev,
        realestateTypes: newRealestateTypes,
      }));
      onChangeFilter?.({ realestateTypes: newRealestateTypes });
    },
    [onChangeFilter, setFilterState],
  );

  // 거래 종류 필터 Change Event Handler
  const handleChangeBuyOrRents = useCallback(
    (newBuyOrRents: string) => {
      setFilterState((prev) => ({
        ...prev,
        buyOrRents: newBuyOrRents,
        priceRange: [0, PRICE_STEPS.length - 1],
        depositRange: [0, DEPOSIT_STEPS.length - 1],
        rentRange: [0, RENT_STEPS.length - 1],
      }));
      onChangeFilter?.({
        buyOrRents: newBuyOrRents,
        priceRange: [0, PRICE_STEPS.length - 1],
        depositRange: [0, DEPOSIT_STEPS.length - 1],
        rentRange: [0, RENT_STEPS.length - 1],
      });
    },
    [onChangeFilter, setFilterState],
  );

  // 매마가 필터 Change Event Handler
  const handleChangePriceRange = useCallback(
    (newPriceRange: number[]) => {
      setFilterState((prev) => ({
        ...prev,
        priceRange: newPriceRange,
      }));
      onChangeFilter?.({ priceRange: newPriceRange });
    },
    [onChangeFilter, setFilterState],
  );

  // 보증금 필터 Change Event Handler
  const handleChangeDepositRange = useCallback(
    (newDepositRange: number[]) => {
      setFilterState((prev) => ({
        ...prev,
        depositRange: newDepositRange,
      }));
      onChangeFilter?.({ depositRange: newDepositRange });
    },
    [onChangeFilter, setFilterState],
  );

  // 월세 필터 Change Event Handler
  const handleChangeRentRange = useCallback(
    (newRentRange: number[]) => {
      setFilterState((prev) => ({
        ...prev,
        rentRange: newRentRange,
      }));
      onChangeFilter?.({ rentRange: newRentRange });
    },
    [onChangeFilter, setFilterState],
  );

  // 세대수 필터 Change Event Handler

  // 기타 필터 Change Event Handler

  // 필터 대분류에 따라, 필터 종류 바꾸고 필터 초기화
  useEffect(() => {
    switch (realestateTypeGroup) {
      case 'apt,oftl':
        setFilterTypes(['realestateType', 'buyOrRent', 'price', 'household']);
        setFilterState(getDefaultFilterAptOftl());
        onChangeFilter?.(getDefaultFilterAptOftl());
        break;
      case 'villa,dandok':
        setFilterTypes(['realestateType', 'buyOrRent', 'price']);
        setFilterState(getDefaultFilterVillaDandok());
        onChangeFilter?.(getDefaultFilterVillaDandok());
        break;
      case 'one,two':
        setFilterTypes(['etc']);
        break;
      default:
        break;
    }
  }, [realestateTypeGroup, setFilterState, onChangeFilter]);

  return (
    <div tw="bg-white shadow rounded-lg overflow-hidden">
      <div tw="flex items-center px-2">
        <RealestateTypeGroupTabButton
          isSelected={realestateTypeGroup === 'apt,oftl'}
          onClick={() => handleChangeRealestateTypeGroup('apt,oftl')}
        >
          아파트 · 오피스텔
        </RealestateTypeGroupTabButton>
        <Separator />
        <RealestateTypeGroupTabButton
          isSelected={realestateTypeGroup === 'villa,dandok'}
          onClick={() => handleChangeRealestateTypeGroup('villa,dandok')}
        >
          빌라 · 주택
        </RealestateTypeGroupTabButton>
        <Separator />
        <RealestateTypeGroupTabButton
          isSelected={realestateTypeGroup === 'one,two'}
          onClick={() => handleChangeRealestateTypeGroup('one,two')}
        >
          원룸 · 투룸
        </RealestateTypeGroupTabButton>
      </div>
      <div tw="w-full h-px bg-gray-300" />
      <FilterTypes
        filter={filter}
        filterTypes={filterTypes}
        expanded={isFilterTypesExpanded}
        onToggleExpansion={handleToggleExpansion}
        onClickFilterType={handleClickFilterType}
      />
      {filters.length > 0 && <div tw="w-full h-px bg-gray-300" />}
      <FiltersContainer>
        {isRealestateTypeFilterAdded && (
          <RealestateTypeFilter
            realestateTypeGroup={realestateTypeGroup}
            value={filter.realestateTypes}
            onChange={handleChangeRealestateTypes}
          />
        )}
        {isBuyOrRentFilterAdded && (
          <BuyorRentFilter
            realestateTypeGroup={realestateTypeGroup}
            value={filter.buyOrRents}
            onChange={handleChangeBuyOrRents}
          />
        )}
        {isPriceFilterAdded && (
          <PriceFilter
            buyOrRents={filter.buyOrRents}
            priceRange={filter.priceRange}
            depositRange={filter.depositRange}
            rentRange={filter.rentRange}
            onChangePriceRange={handleChangePriceRange}
            onChangeDepositRange={handleChangeDepositRange}
            onChangeRentRange={handleChangeRentRange}
          />
        )}
        {isHouseholdFilterAdded && <HouseholdFilter />}
        {isEtcFilterAdded && <EtcFilter />}
      </FiltersContainer>
      {filters.length > 0 && (
        <div>
          <div tw="w-full h-px bg-gray-300" />
          <div tw="flex items-center justify-between">
            <Button variant="ghost" tw="underline" onClick={handleResetFilter}>
              필터 초기화
            </Button>
            <Button variant="ghost" onClick={handleCloseFilters}>
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
