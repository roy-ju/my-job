import { Button } from '@/components/atoms';
import { ButtonProps } from '@/components/atoms/Button';
import tw, { styled } from 'twin.macro';
import useControlled from '@/hooks/useControlled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BuyOrRent, RealestateType } from '@/constants/enums';
import FilterTypes from './FilterTypes';
import { Filter, FilterType, MinHousehold, RealestateTypeGroup } from './types';
import RealestateTypeRoomCountFilter from './RealestateTypeRoomCountFilter';
import BuyorRentFilter from './BuyOrRentFilter';
import PriceFilter, { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from './PriceFilter';
import HouseholdFilter from './HouseholdFilter';
import EtcFilter from './EtcFilter';

export function getDefaultFilterAptOftl(): Filter {
  return {
    realestateTypeGroup: 'apt,oftl',
    realestateTypes: [RealestateType.Apartment, RealestateType.Officetel].join(','),
    buyOrRents: [BuyOrRent.Buy].join(','),
    priceRange: [0, PRICE_STEPS.length - 1],
    depositRange: [0, DEPOSIT_STEPS.length - 1],
    rentRange: [0, RENT_STEPS.length - 1],
    minHousehold: '100',
    gapInvestment: false,
    quickSale: false,
    roomCounts: '',
  };
}

export function getDefaultFilterVillaDandok(): Filter {
  return {
    realestateTypeGroup: 'villa,dandok',
    realestateTypes: [
      RealestateType.Yunrip,
      RealestateType.Dasaedae,
      RealestateType.Dandok,
      RealestateType.Dagagoo,
    ].join(','),
    buyOrRents: [BuyOrRent.Buy].join(','),
    priceRange: [0, PRICE_STEPS.length - 1],
    depositRange: [0, DEPOSIT_STEPS.length - 1],
    rentRange: [0, RENT_STEPS.length - 1],
    minHousehold: '0',
    gapInvestment: false,
    quickSale: false,
    roomCounts: '',
  };
}

export function getDefaultFilterOneRoomTwoRoom(): Filter {
  return {
    realestateTypeGroup: 'one,two',
    realestateTypes: [
      RealestateType.Officetel,
      RealestateType.Yunrip,
      RealestateType.Dasaedae,
      RealestateType.Dandok,
      RealestateType.Dagagoo,
    ].join(','),
    buyOrRents: [BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
    priceRange: [0, PRICE_STEPS.length - 1],
    depositRange: [0, DEPOSIT_STEPS.length - 1],
    rentRange: [0, RENT_STEPS.length - 1],
    minHousehold: '0',
    gapInvestment: false,
    quickSale: false,
    roomCounts: '1,2',
  };
}

function useFilterType(filterType: FilterType, filters: FilterType[], filterTypes: FilterType[]) {
  return useMemo(
    () => filters.includes(filterType) && filterTypes.includes(filterType),
    [filters, filterType, filterTypes],
  );
}

const FiltersContainer = styled.div`
  & > div {
    ${tw`mx-4`}
  }

  & > div:not(:last-of-type) {
    ${tw`border-b border-gray-300`}
  }
`;

const RealestateTypeGroupTabButton = styled(({ size = 'bigger', variant = 'ghost', ...props }: ButtonProps) => (
  <Button size={size} variant={variant} {...props} />
))(({ selected }) => [tw`px-2 font-bold text-gray-600 text-b1`, selected && tw`text-gray-1000`]);

const Separator = tw.div`w-px h-2 bg-gray-300 mx-2`;

interface MapFilterProps {
  filter?: Filter;
  onChangeFilter?: (newFilter: Partial<Filter>) => void;
}

export default function MapFilter({ filter: filterProp, onChangeFilter }: MapFilterProps) {
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
  const isRealestateTypeRoomCountFilterAdded = useFilterType('realestateType', filters, filterTypes);

  // 거래 종류 필터 열림/닫힘
  const isBuyOrRentFilterAdded = useFilterType('buyOrRent', filters, filterTypes);

  // 가격 필터 열림/닫힘
  const isPriceFilterAdded = useFilterType('price', filters, filterTypes);

  // 세대수 필터 열림/닫힘
  const isHouseholdFilterAdded = useFilterType('household', filters, filterTypes);

  // 기타 필터 열림/닫힘
  const isEtcFilterAdded = useFilterType('etc', filters, filterTypes);

  // 필터 대분류 Change Event Handler
  const handleChangeRealestateTypeGroup = useCallback(
    (value: RealestateTypeGroup) => {
      switch (value) {
        case 'apt,oftl':
          setFilterTypes(['realestateType', 'buyOrRent', 'price', 'household', 'etc']);
          setFilters([]);
          setFilterState(getDefaultFilterAptOftl());
          onChangeFilter?.(getDefaultFilterAptOftl());
          break;
        case 'villa,dandok':
          setFilterTypes(['realestateType', 'buyOrRent', 'price', 'etc']);
          setFilters([]);
          setFilterState(getDefaultFilterVillaDandok());
          onChangeFilter?.(getDefaultFilterVillaDandok());
          break;
        case 'one,two':
          setFilterTypes(['realestateType', 'buyOrRent', 'price']);
          setFilters([]);
          setFilterState(getDefaultFilterOneRoomTwoRoom());
          onChangeFilter?.(getDefaultFilterOneRoomTwoRoom());
          break;
        default:
          break;
      }
      setIsFilterTypeExapnded(false);
    },
    [setFilterState, onChangeFilter],
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

    if (filter.realestateTypeGroup === 'apt,oftl') {
      defaultFilter = getDefaultFilterAptOftl();
    } else if (filter.realestateTypeGroup === 'villa,dandok') {
      defaultFilter = getDefaultFilterVillaDandok();
    } else if (filter.realestateTypeGroup === 'one,two') {
      defaultFilter = getDefaultFilterOneRoomTwoRoom();
    }
    if (defaultFilter !== null) {
      setFilterState(defaultFilter);
      onChangeFilter?.(defaultFilter);
    }
  }, [filter.realestateTypeGroup, setFilterState, onChangeFilter]);

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

  // 유형 필터 방개수 Change Event Handler
  const handleChangeRoomCounts = useCallback(
    (newRoomCounts: string) => {
      setFilterState((prev) => ({
        ...prev,
        roomCounts: newRoomCounts,
      }));
      onChangeFilter?.({ roomCounts: newRoomCounts });
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
  const handleChangeMinHousehold = useCallback(
    (newMinHousehold: MinHousehold) => {
      setFilterState((prev) => ({
        ...prev,
        minHousehold: newMinHousehold,
      }));
      onChangeFilter?.({ minHousehold: newMinHousehold });
    },
    [onChangeFilter, setFilterState],
  );

  // 급매 Change Event Handler
  const handleChangeQuickSale = useCallback(
    (newValue: boolean) => {
      setFilterState((prev) => ({
        ...prev,
        quickSale: newValue,
      }));
      onChangeFilter?.({ quickSale: newValue });
    },
    [onChangeFilter, setFilterState],
  );

  // 갭투자 Change Event Handler
  const handleChangeGapInvestment = useCallback(
    (newValue: boolean) => {
      setFilterState((prev) => ({
        ...prev,
        gapInvestment: newValue,
      }));
      onChangeFilter?.({ gapInvestment: newValue });
    },
    [onChangeFilter, setFilterState],
  );

  // 필터 존재 여부
  useEffect(() => {
    const fts = [];
    if (filter.realestateTypeGroup === 'apt,oftl') {
      fts.push(...['realestateType', 'buyOrRent', 'price', 'household', 'etc']);
    } else if (filter.realestateTypeGroup === 'villa,dandok') {
      fts.push(...['realestateType', 'buyOrRent', 'price', 'etc']);
    } else if (filter.realestateTypeGroup === 'one,two') {
      fts.push(...['realestateType', 'buyOrRent', 'price']);
    }

    const buyOrRents = filter.buyOrRents.split(',').map((item) => Number(item) as BuyOrRent);

    if (!buyOrRents.includes(BuyOrRent.Buy)) {
      fts.filter((item) => item !== 'etc');
    }

    setFilterTypes(fts as FilterType[]);
  }, [filter.realestateTypeGroup, filter.buyOrRents]);

  return (
    <div tw="bg-white shadow rounded-lg overflow-hidden">
      <div tw="flex items-center px-2">
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'apt,oftl'}
          onClick={() => handleChangeRealestateTypeGroup('apt,oftl')}
        >
          아파트 · 오피스텔
        </RealestateTypeGroupTabButton>
        <Separator />
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'villa,dandok'}
          onClick={() => handleChangeRealestateTypeGroup('villa,dandok')}
        >
          빌라 · 주택
        </RealestateTypeGroupTabButton>
        <Separator />
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'one,two'}
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
      <FiltersContainer tw="max-h-[500px] overflow-y-auto">
        {isRealestateTypeRoomCountFilterAdded && (
          // TODO: 방개수와 부동산종류 필터 두개로 나누는 리펙토링 필요.
          <RealestateTypeRoomCountFilter
            realestateTypeGroup={filter.realestateTypeGroup}
            realestateTypes={filter.realestateTypes}
            roomCounts={filter.roomCounts}
            onChangeRealestateTypes={handleChangeRealestateTypes}
            onChangeRoomCounts={handleChangeRoomCounts}
          />
        )}
        {isBuyOrRentFilterAdded && (
          <BuyorRentFilter
            realestateTypeGroup={filter.realestateTypeGroup}
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
        {isHouseholdFilterAdded && <HouseholdFilter value={filter.minHousehold} onChange={handleChangeMinHousehold} />}
        {isEtcFilterAdded && (
          <EtcFilter
            quickSale={filter.quickSale}
            gapInvestment={filter.gapInvestment}
            onChangeQuickSale={handleChangeQuickSale}
            onChangeGapInvestment={handleChangeGapInvestment}
          />
        )}
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
