import { useCallback, useEffect, useState } from 'react';

import tw, { styled } from 'twin.macro';

import { Button } from '@/components/atoms';

import { ButtonProps } from '@/components/atoms/Button';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import useControlled from '@/hooks/useControlled';

import { BuyOrRent } from '@/constants/enums';

import FilterTypes from './mobile-map-filter/FilterTypes';

import BuyorRentFilter from './mobile-map-filter/BuyOrRentFilter';

import PriceFilter, { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from './mobile-map-filter/PriceFilter';

import HouseholdFilter from './mobile-map-filter/HouseholdFilter';

import EtcFilter from './mobile-map-filter/EtcFilter';

import FilterTypesMedium from './mobile-map-filter/FilterTypesMedium';

import RealestateTypeRoomCountFilter from './mobile-map-filter/RealestateTypeRoomCountFilter';

import { Filter, FilterType, MinHousehold, RealestateTypeGroup } from './mobile-map-filter/types';

import useFilterType from './hooks/useFilterType';

import MobileMapAllFilter from './MobileMapAllFilter';

import {
  getDefaultFilterAptOftl,
  getDefaultFilterVillaDandok,
  getDefaultFilterOneRoomTwoRoom,
} from './utils/getDefaultFilters';

const RealestateTypeGroupTabButton = styled(({ size = 'bigger', variant = 'ghost', ...props }: ButtonProps) => (
  <Button size={size} variant={variant} {...props} />
))(({ selected }) => [tw`px-2 font-bold text-gray-600 text-b1`, selected && tw`text-gray-1000`]);

const Separator = tw.div`w-px h-2 bg-gray-300 mx-2`;

interface MapFilterProps {
  filter?: Filter;
  onChangeFilter?: (newFilter: Partial<Filter>) => void;
}

export default function MobileMapFilter({ filter: filterProp, onChangeFilter }: MapFilterProps) {
  // 필터
  const [filter, setFilterState] = useControlled({
    controlled: filterProp,
    default: getDefaultFilterAptOftl(),
  });

  // 필터 종류 열림/닫힘
  const [isFirstFilterTypesExpanded, setIsFirstFilterTypesExpanded] = useState(false);
  const [isFirstFilterTypesExpandedTwo, setIsFirstFilterTypesExpandedTwo] = useState(false);
  const [isFirstFilterTypesExpandedThree, setIsFirstFilterTypesExpandedThree] = useState(false);

  const [isSecondFilterTypesExpandedOne, setIsSecondFilterTypesExpandedOne] = useState(false);
  const [isSecondFilterTypesExpandedTwo, setIsSecondFilterTypesExpandedTwo] = useState(false);
  const [isSecondFilterTypesExpandedThree, setIsSecondFilterTypesExpandedThree] = useState(false);
  const [isSecondFilterTypesExpandedFour, setIsSecondFilterTypesExpandedFour] = useState(false);
  const [isSecondFilterTypesExpandedFive, setIsSecondFilterTypesExpandedFive] = useState(false);
  const [isFilterTypesExpanded, setIsFilterTypeExapnded] = useState(false);

  const { addFullScreenDialog } = useFullScreenDialog();

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
          setFilterTypes(['realestateType', 'buyOrRent', 'price', 'household']);

          // setFilters([]);
          setFilterState(getDefaultFilterAptOftl());
          onChangeFilter?.(getDefaultFilterAptOftl());

          break;
        case 'villa,dandok':
          setFilterTypes(['realestateType', 'buyOrRent', 'price']);

          // setFilters([]);
          setFilterState(getDefaultFilterVillaDandok());
          onChangeFilter?.(getDefaultFilterVillaDandok());

          break;
        case 'one,two':
          setFilterTypes(['realestateType', 'buyOrRent', 'price']);

          // setFilters([]);
          setFilterState(getDefaultFilterOneRoomTwoRoom());
          onChangeFilter?.(getDefaultFilterOneRoomTwoRoom());

          break;
        default:
          break;
      }

      setIsFilterTypeExapnded(false);

      if (isSecondFilterTypesExpandedOne) {
        setIsSecondFilterTypesExpandedOne(false);
      }
      if (isSecondFilterTypesExpandedTwo) {
        setIsSecondFilterTypesExpandedTwo(false);
      }
      if (isSecondFilterTypesExpandedThree) {
        setIsSecondFilterTypesExpandedThree(false);
      }
      if (isSecondFilterTypesExpandedFour) {
        setIsSecondFilterTypesExpandedFour(false);
      }
      if (isSecondFilterTypesExpandedFive) {
        setIsSecondFilterTypesExpandedFive(false);
      }
    },
    [
      isSecondFilterTypesExpandedFive,
      isSecondFilterTypesExpandedFour,
      isSecondFilterTypesExpandedOne,
      isSecondFilterTypesExpandedThree,
      isSecondFilterTypesExpandedTwo,
      onChangeFilter,
      setFilterState,
    ],
  );

  // 필터 종류 열림/닫힘 Toggle Event Handler
  const handleToggleExpansion = useCallback(() => {
    setIsFilterTypeExapnded((prev) => !prev);
  }, []);

  // 전체 필터 열기
  const handleOpenAllFilterExpanded = useCallback(() => {
    addFullScreenDialog({
      body: <MobileMapAllFilter filter={filter} onChangeFilter={onChangeFilter} />,
    });
  }, [addFullScreenDialog, filter, onChangeFilter]);

  // 열려 있는 모든 필터 닫기 버튼 Click Event Handler
  const handleCloseFilters = useCallback(() => {
    setIsSecondFilterTypesExpandedFive(false);
    setIsSecondFilterTypesExpandedFour(false);
    setIsSecondFilterTypesExpandedThree(false);
    setIsSecondFilterTypesExpandedTwo(false);
    setIsSecondFilterTypesExpandedOne(false);
  }, []);

  // 필터 종류 Click Event Handler
  const handleClickFilterType = useCallback(
    (filterType: FilterType) => {
      if (filterType === 'realestateType') {
        setIsSecondFilterTypesExpandedOne((prev) => !prev);
        setIsSecondFilterTypesExpandedTwo(false);
        setIsSecondFilterTypesExpandedThree(false);
        setIsSecondFilterTypesExpandedFour(false);
        setIsSecondFilterTypesExpandedFive(false);
      }

      if (filterType === 'buyOrRent') {
        setIsSecondFilterTypesExpandedTwo((prev) => !prev);

        setIsSecondFilterTypesExpandedOne(false);
        setIsSecondFilterTypesExpandedThree(false);
        setIsSecondFilterTypesExpandedFour(false);
        setIsSecondFilterTypesExpandedFive(false);
      }

      if (filterType === 'price') {
        setIsSecondFilterTypesExpandedThree((prev) => !prev);

        setIsSecondFilterTypesExpandedOne(false);
        setIsSecondFilterTypesExpandedTwo(false);
        setIsSecondFilterTypesExpandedFour(false);
        setIsSecondFilterTypesExpandedFive(false);
      }

      if (filterType === 'household') {
        setIsSecondFilterTypesExpandedFour((prev) => !prev);

        setIsSecondFilterTypesExpandedOne(false);
        setIsSecondFilterTypesExpandedTwo(false);
        setIsSecondFilterTypesExpandedThree(false);
        setIsSecondFilterTypesExpandedFive(false);
      }

      if (filterType === 'etc') {
        setIsSecondFilterTypesExpandedFive((prev) => !prev);

        setIsSecondFilterTypesExpandedOne(false);
        setIsSecondFilterTypesExpandedTwo(false);
        setIsSecondFilterTypesExpandedThree(false);
        setIsSecondFilterTypesExpandedFour(false);
      }

      if (filterType === 'all') {
        setFilters([...filterTypes]);

        handleOpenAllFilterExpanded();
      } else {
        setFilters((prev) => {
          if (prev.length > 1 || prev[0] !== filterType) {
            return [filterType];
          }
          return prev;
        });
      }
    },
    [filterTypes, handleOpenAllFilterExpanded],
  );

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
        gapInvestment: false,
        quickSale: false,
      }));

      onChangeFilter?.({
        buyOrRents: newBuyOrRents,
        priceRange: [0, PRICE_STEPS.length - 1],
        depositRange: [0, DEPOSIT_STEPS.length - 1],
        rentRange: [0, RENT_STEPS.length - 1],
        gapInvestment: false,
        quickSale: false,
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
      if (filter.buyOrRents === '1') {
        fts.push(...['realestateType', 'buyOrRent', 'price', 'household', 'etc']);
      } else {
        fts.push(...['realestateType', 'buyOrRent', 'price', 'household']);
      }
    } else if (filter.realestateTypeGroup === 'villa,dandok') {
      if (filter.buyOrRents === '1') {
        fts.push(...['realestateType', 'buyOrRent', 'price', 'etc']);
      } else {
        fts.push(...['realestateType', 'buyOrRent', 'price']);
      }
    } else if (filter.realestateTypeGroup === 'one,two') {
      fts.push(...['realestateType', 'buyOrRent', 'price']);
    }

    const buyOrRents = filter.buyOrRents.split(',').map((item) => Number(item) as BuyOrRent);

    if (!buyOrRents.includes(BuyOrRent.Buy)) {
      fts.filter((item) => item !== 'etc');
    }

    setFilterTypes(fts as FilterType[]);
  }, [filter.realestateTypeGroup, filter.buyOrRents, filter]);

  return (
    <div tw="w-full bg-white shadow rounded-lg" id="negocio-map-header">
      <div tw="flex items-center px-2">
        <FilterTypes onClickFilterType={handleClickFilterType} />
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'apt,oftl'}
          onClick={() => {
            if (filter.realestateTypeGroup !== 'apt,oftl') {
              handleChangeRealestateTypeGroup('apt,oftl');

              setIsFirstFilterTypesExpandedTwo(false);
              setIsFirstFilterTypesExpandedThree(false);
            } else {
              setIsFirstFilterTypesExpandedTwo(false);
              setIsFirstFilterTypesExpandedThree(false);

              setIsFirstFilterTypesExpanded((prev) => !prev);
            }
          }}
        >
          아파트·오피스텔
        </RealestateTypeGroupTabButton>
        <Separator />
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'villa,dandok'}
          onClick={() => {
            if (filter.realestateTypeGroup !== 'villa,dandok') {
              handleChangeRealestateTypeGroup('villa,dandok');

              setIsFirstFilterTypesExpanded(false);
              setIsFirstFilterTypesExpandedThree(false);
            } else {
              setIsFirstFilterTypesExpanded(false);
              setIsFirstFilterTypesExpandedThree(false);

              setIsFirstFilterTypesExpandedTwo((prev) => !prev);
            }
          }}
        >
          빌라·주택
        </RealestateTypeGroupTabButton>
        <Separator />
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'one,two'}
          onClick={() => {
            if (filter.realestateTypeGroup !== 'one,two') {
              handleChangeRealestateTypeGroup('one,two');

              setIsFirstFilterTypesExpanded(false);
              setIsFirstFilterTypesExpandedTwo(false);
            } else {
              setIsFirstFilterTypesExpanded(false);
              setIsFirstFilterTypesExpandedTwo(false);

              setIsFirstFilterTypesExpandedThree((prev) => !prev);
            }
          }}
        >
          원룸·투룸
        </RealestateTypeGroupTabButton>
      </div>

      {isFirstFilterTypesExpanded && (
        <FilterTypesMedium
          filter={filter}
          filterTypes={filterTypes}
          expanded={isFilterTypesExpanded}
          onToggleExpansion={handleToggleExpansion}
          onClickFilterType={handleClickFilterType}
        />
      )}

      {isFirstFilterTypesExpandedTwo && (
        <FilterTypesMedium
          filter={filter}
          filterTypes={filterTypes}
          expanded={isFilterTypesExpanded}
          onToggleExpansion={handleToggleExpansion}
          onClickFilterType={handleClickFilterType}
        />
      )}

      {isFirstFilterTypesExpandedThree && (
        <FilterTypesMedium
          filter={filter}
          filterTypes={filterTypes}
          expanded={isFilterTypesExpanded}
          onToggleExpansion={handleToggleExpansion}
          onClickFilterType={handleClickFilterType}
        />
      )}

      {isRealestateTypeRoomCountFilterAdded && isSecondFilterTypesExpandedOne && (
        <div tw="px-4">
          <RealestateTypeRoomCountFilter
            realestateTypeGroup={filter.realestateTypeGroup}
            realestateTypes={filter.realestateTypes}
            roomCounts={filter.roomCounts}
            onChangeRealestateTypes={handleChangeRealestateTypes}
            onChangeRoomCounts={handleChangeRoomCounts}
          />
        </div>
      )}

      {isBuyOrRentFilterAdded && isSecondFilterTypesExpandedTwo && (
        <div tw="px-4">
          <BuyorRentFilter
            realestateTypeGroup={filter.realestateTypeGroup}
            value={filter.buyOrRents}
            onChange={handleChangeBuyOrRents}
          />
        </div>
      )}

      {isPriceFilterAdded && isSecondFilterTypesExpandedThree && (
        <div tw="px-4">
          <PriceFilter
            buyOrRents={filter.buyOrRents}
            priceRange={filter.priceRange}
            depositRange={filter.depositRange}
            rentRange={filter.rentRange}
            onChangePriceRange={handleChangePriceRange}
            onChangeDepositRange={handleChangeDepositRange}
            onChangeRentRange={handleChangeRentRange}
          />
        </div>
      )}

      {isHouseholdFilterAdded && isSecondFilterTypesExpandedFour && (
        <div tw="px-4">
          <HouseholdFilter value={filter.minHousehold} onChange={handleChangeMinHousehold} />
        </div>
      )}

      {isEtcFilterAdded && isSecondFilterTypesExpandedFive && (
        <div tw="px-4">
          <EtcFilter
            quickSale={filter.quickSale}
            gapInvestment={filter.gapInvestment}
            onChangeQuickSale={handleChangeQuickSale}
            onChangeGapInvestment={handleChangeGapInvestment}
          />
        </div>
      )}

      {(isSecondFilterTypesExpandedOne ||
        isSecondFilterTypesExpandedTwo ||
        isSecondFilterTypesExpandedThree ||
        isSecondFilterTypesExpandedFour ||
        isSecondFilterTypesExpandedFive) && (
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
