import { Button } from '@/components/atoms';
import { ButtonProps } from '@/components/atoms/Button';
import tw, { styled } from 'twin.macro';
import { useControlled } from '@/hooks/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BuyOrRent, RealestateType } from '@/constants/enums';
import Close from '@/assets/icons/close_24.svg';
import useMap from '@/states/mobileMap';
import useDocumentHeight from '@/hooks/utils/useDocumentHeight';
import { toast } from 'react-toastify';
import FilterTypes from './FilterTypes';
import { Filter, FilterType, MinHousehold, RealestateTypeGroup } from './types';
import BuyorRentFilter from './BuyOrRentFilter';
import PriceFilter, { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from './PriceFilter';
import HouseholdFilter from './HouseholdFilter';
import EtcFilter from './EtcFilter';
import FilterTypesMedium from './FilterTypesMedium';
import RealestateTypeRoomCountFilter from './RealestateTypeRoomCountFilter';

export function getDefaultFilterAptOftl(): Filter {
  return {
    realestateTypeGroup: 'apt,oftl',
    realestateTypes: [RealestateType.Apartment, RealestateType.Officetel].join(','),
    buyOrRents: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
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
    buyOrRents: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
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
    realestateTypes: [].join(','),
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
    ${tw`px-5`}
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

export default function MobMapFilter({ filter: filterProp, onChangeFilter }: MapFilterProps) {
  const map = useMap();

  // 필터
  const [filter, setFilterState] = useControlled({
    controlled: filterProp,
    default: getDefaultFilterAptOftl(),
  });

  const [uiFilter, setUIFilterState] = useState<Filter>(filterProp || getDefaultFilterAptOftl());

  const [isAllFilterExpanded, setIsAllFilterExpanded] = useState(false);

  // 필터 종류 열림/닫힘
  const [isFirstFilterTypesExpanded, setIsFirstFilterTypesExpanded] = useState(false);
  const [isSecondFilterTypesExpandedOne, setIsSecondFilterTypesExpandedOne] = useState(false);
  const [isSecondFilterTypesExpandedTwo, setIsSecondFilterTypesExpandedTwo] = useState(false);
  const [isSecondFilterTypesExpandedThree, setIsSecondFilterTypesExpandedThree] = useState(false);
  const [isSecondFilterTypesExpandedFour, setIsSecondFilterTypesExpandedFour] = useState(false);
  const [isSecondFilterTypesExpandedFive, setIsSecondFilterTypesExpandedFive] = useState(false);
  const [isFilterTypesExpanded, setIsFilterTypeExapnded] = useState(false);
  const [isUIFilterTypesExpanded, setIsUIFilterTypeExapnded] = useState(false);

  // 선택가능한 필터 종류들
  const [filterTypes, setFilterTypes] = useState<FilterType[]>([
    'realestateType',
    'buyOrRent',
    'price',
    'household',
    'etc',
  ]);

  const [uiFilterTypes, setUIFilterTypes] = useState<FilterType[]>([
    'realestateType',
    'buyOrRent',
    'price',
    'household',
    'etc',
  ]);

  // 현재 열려있는 필터목록
  const [filters, setFilters] = useState<FilterType[]>([]);

  // 현재 열려있는 필터목록(ONLY UI)
  const [uiFilters, setUIFilters] = useState<FilterType[]>([]);

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

  // 유형 필터 열림/닫힘(onlyUI)
  const isUIRealestateTypeRoomCountFilterAdded = useFilterType('realestateType', uiFilters, uiFilterTypes);

  // 거래 종류 필터 열림/닫힘 (onlyUI)
  const isUIBuyOrRentFilterAdded = useFilterType('buyOrRent', uiFilters, uiFilterTypes);

  // 가격 필터 열림/닫힘 (onlyUI)
  const isUIPriceFilterAdded = useFilterType('price', uiFilters, uiFilterTypes);

  // 세대수 필터 열림/닫힘 (onlyUI)
  const isUIHouseholdFilterAdded = useFilterType('household', uiFilters, uiFilterTypes);

  // 기타 필터 열림/닫힘 (onlyUI)
  const isUIEtcFilterAdded = useFilterType('etc', uiFilters, uiFilterTypes);

  // onChagneEventHandler (onlyUI)
  const handleUIChangeFilter = useCallback(
    (value: Partial<Filter>) => {
      setUIFilterState((prev) => {
        const old = prev === null ? getDefaultFilterAptOftl() : prev;
        return {
          ...old,
          ...value,
        };
      });
    },
    [setUIFilterState],
  );

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
      setIsFirstFilterTypesExpanded((prev) => !prev);
    },
    [setFilterState, onChangeFilter],
  );

  const handleUIChangeRealestateTypeGroup = useCallback(
    (value: RealestateTypeGroup) => {
      switch (value) {
        case 'apt,oftl':
          setUIFilterTypes(['realestateType', 'buyOrRent', 'price', 'household', 'etc']);
          setUIFilters([]);
          setUIFilterState(getDefaultFilterAptOftl());
          handleUIChangeFilter?.(getDefaultFilterAptOftl());
          break;
        case 'villa,dandok':
          setUIFilterTypes(['realestateType', 'buyOrRent', 'price', 'etc']);
          setUIFilters([]);
          setUIFilterState(getDefaultFilterVillaDandok());
          handleUIChangeFilter?.(getDefaultFilterVillaDandok());
          break;
        case 'one,two':
          setUIFilterTypes(['realestateType', 'buyOrRent', 'price']);
          setUIFilters([]);
          setUIFilterState(getDefaultFilterOneRoomTwoRoom());
          handleUIChangeFilter?.(getDefaultFilterOneRoomTwoRoom());
          break;
        default:
          break;
      }
      setIsUIFilterTypeExapnded(false);
    },
    [setUIFilterState, handleUIChangeFilter],
  );

  // 필터 종류 열림/닫힘 Toggle Event Handler
  const handleToggleExpansion = useCallback(() => {
    setIsFilterTypeExapnded((prev) => !prev);
  }, []);

  const handleToggleUIExpansion = useCallback(() => {
    setIsUIFilterTypeExapnded((prev) => !prev);
  }, []);

  // 전체 필터 닫기
  const handleCloseAllFilterExpanded = useCallback(() => {
    setUIFilters([]);
    setFilters([]);
    setIsAllFilterExpanded(false);
  }, []);

  // 전체 필터 열기
  const handleOpenAllFilterExpanded = useCallback(() => {
    setIsAllFilterExpanded(true);
  }, []);

  // 열려 있는 모든 필터 닫기 버튼 Click Event Handler
  const handleCloseFilters = useCallback(() => {
    setFilters([]);
    setIsFirstFilterTypesExpanded(false);
    setIsSecondFilterTypesExpandedFive(false);
    setIsSecondFilterTypesExpandedFour(false);
    setIsSecondFilterTypesExpandedThree(false);
    setIsSecondFilterTypesExpandedTwo(false);
    setIsSecondFilterTypesExpandedOne(false);
    setIsAllFilterExpanded(false);
  }, []);

  const handleSummitFilters = useCallback(() => {
    // setFilters([]);
    setIsAllFilterExpanded(false);
    toast.success('필터를 적용했습니다.', { toastId: 'negocio-apply-filter' });
  }, []);

  // 필터 종류 Click Event Handler
  const handleClickFilterType = useCallback(
    (filterType: FilterType) => {
      if (filterType === 'buyOrRent') {
        setIsSecondFilterTypesExpandedTwo((prev) => !prev);
      }

      if (filterType === 'realestateType') {
        setIsSecondFilterTypesExpandedOne((prev) => !prev);
      }

      if (filterType === 'price') {
        setIsSecondFilterTypesExpandedThree((prev) => !prev);
      }

      if (filterType === 'household') {
        setIsSecondFilterTypesExpandedFour((prev) => !prev);
      }

      if (filterType === 'etc') {
        setIsSecondFilterTypesExpandedFive((prev) => !prev);
      }

      if (filterType === 'all') {
        setFilters([...filterTypes]);
        setUIFilters([...filterTypes]);
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

  const handleResetUIFilter = useCallback(() => {
    let defaultFilter = null;

    if (uiFilter.realestateTypeGroup === 'apt,oftl') {
      defaultFilter = getDefaultFilterAptOftl();
    } else if (uiFilter.realestateTypeGroup === 'villa,dandok') {
      defaultFilter = getDefaultFilterVillaDandok();
    } else if (uiFilter.realestateTypeGroup === 'one,two') {
      defaultFilter = getDefaultFilterOneRoomTwoRoom();
    }
    if (defaultFilter !== null) {
      setUIFilterState(defaultFilter);
      handleUIChangeFilter?.(defaultFilter);
    }

    toast.success('필터를 초기화 했습니다.', { toastId: 'negocio-initialize-filter' });
  }, [uiFilter.realestateTypeGroup, setUIFilterState, handleUIChangeFilter]);

  const handleUIChangeRealestateTypes = useCallback(
    (newRealestateTypes: string) => {
      setUIFilterState((prev) => ({
        ...prev,
        realestateTypes: newRealestateTypes,
      }));
      handleUIChangeFilter?.({ realestateTypes: newRealestateTypes });
    },
    [handleUIChangeFilter, setUIFilterState],
  );

  const handleUIChangeRoomCounts = useCallback(
    (newRoomCounts: string) => {
      setUIFilterState((prev) => ({
        ...prev,
        roomCounts: newRoomCounts,
      }));
      handleUIChangeFilter?.({ roomCounts: newRoomCounts });
    },
    [handleUIChangeFilter, setUIFilterState],
  );

  const handleUIChangeBuyOrRents = useCallback(
    (newBuyOrRents: string) => {
      setUIFilterState((prev) => ({
        ...prev,
        buyOrRents: newBuyOrRents,
        priceRange: [0, PRICE_STEPS.length - 1],
        depositRange: [0, DEPOSIT_STEPS.length - 1],
        rentRange: [0, RENT_STEPS.length - 1],
      }));
      handleUIChangeFilter?.({
        buyOrRents: newBuyOrRents,
        priceRange: [0, PRICE_STEPS.length - 1],
        depositRange: [0, DEPOSIT_STEPS.length - 1],
        rentRange: [0, RENT_STEPS.length - 1],
      });
    },
    [handleUIChangeFilter, setUIFilterState],
  );

  const handleUIChangePriceRange = useCallback(
    (newPriceRange: number[]) => {
      setUIFilterState((prev) => ({
        ...prev,
        priceRange: newPriceRange,
      }));
      handleUIChangeFilter?.({ priceRange: newPriceRange });
    },
    [handleUIChangeFilter, setUIFilterState],
  );

  const handleUIChangeDepositRange = useCallback(
    (newDepositRange: number[]) => {
      setUIFilterState((prev) => ({
        ...prev,
        depositRange: newDepositRange,
      }));
      handleUIChangeFilter?.({ depositRange: newDepositRange });
    },
    [handleUIChangeFilter, setUIFilterState],
  );

  const handleUIChangeRentRange = useCallback(
    (newRentRange: number[]) => {
      setUIFilterState((prev) => ({
        ...prev,
        rentRange: newRentRange,
      }));
      handleUIChangeFilter?.({ rentRange: newRentRange });
    },
    [handleUIChangeFilter, setUIFilterState],
  );

  const handleUIChangeQuickSale = useCallback(
    (newValue: boolean) => {
      setUIFilterState((prev) => ({
        ...prev,
        quickSale: newValue,
      }));
      handleUIChangeFilter?.({ quickSale: newValue });
    },
    [handleUIChangeFilter, setUIFilterState],
  );

  const handleUIChangeMinHousehold = useCallback(
    (newMinHousehold: MinHousehold) => {
      setUIFilterState((prev) => ({
        ...prev,
        minHousehold: newMinHousehold,
      }));
      handleUIChangeFilter?.({ minHousehold: newMinHousehold });
    },
    [handleUIChangeFilter, setUIFilterState],
  );

  const handleUIChangeGapInvestment = useCallback(
    (newValue: boolean) => {
      setUIFilterState((prev) => ({
        ...prev,
        gapInvestment: newValue,
      }));
      handleUIChangeFilter?.({ gapInvestment: newValue });
    },
    [handleUIChangeFilter, setUIFilterState],
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
    setUIFilterTypes(fts as FilterType[]);
  }, [filter.realestateTypeGroup, filter.buyOrRents, filter]);

  useEffect(() => {
    if (filterProp) {
      setUIFilterState(filterProp);
    }
  }, [filterProp]);

  const { height: winHeight } = useDocumentHeight();

  useEffect(() => {
    if (map && !isAllFilterExpanded) {
      const headerFirst = document.getElementById('negocio-top-header');
      const headerSecond = document.getElementById('negocio-map-header');

      const footer = document.getElementById('negocio-mob-global-navigation');

      if (headerFirst && headerSecond && footer && winHeight) {
        const footerHeight = winHeight - footer.offsetTop;
        const headerHeight = headerFirst.offsetHeight + headerSecond.offsetHeight;

        const mapHeight = winHeight - headerHeight - footerHeight;
        const mapWidth = headerFirst.offsetWidth;
        map.setSize({ width: mapWidth, height: mapHeight });
      }
    }
  }, [
    winHeight,
    map,
    isAllFilterExpanded,
    isBuyOrRentFilterAdded,
    isEtcFilterAdded,
    isFirstFilterTypesExpanded,
    isPriceFilterAdded,
    isEtcFilterAdded,
    isSecondFilterTypesExpandedFive,
    isSecondFilterTypesExpandedFour,
    isSecondFilterTypesExpandedThree,
    isSecondFilterTypesExpandedTwo,
    isSecondFilterTypesExpandedOne,
  ]);

  return (
    <div tw="bg-white shadow rounded-lg overflow-hidden" id="negocio-map-header">
      <div tw="flex items-center px-2">
        <FilterTypes onClickFilterType={handleClickFilterType} />
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'apt,oftl'}
          onClick={() => handleChangeRealestateTypeGroup('apt,oftl')}
        >
          아파트·오피스텔
        </RealestateTypeGroupTabButton>
        <Separator />
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'villa,dandok'}
          onClick={() => handleChangeRealestateTypeGroup('villa,dandok')}
        >
          빌라·주택
        </RealestateTypeGroupTabButton>
        <Separator />
        <RealestateTypeGroupTabButton
          selected={filter.realestateTypeGroup === 'one,two'}
          onClick={() => handleChangeRealestateTypeGroup('one,two')}
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

      {isAllFilterExpanded && (
        <>
          <FiltersContainer tw="w-full max-w-mobile min-h-[100vh] overflow-y-auto [z-index: 100] absolute top-0 bg-white">
            <div tw="py-4 flex items-center justify-between [z-index: 50] bg-white">
              <span tw="text-b1 [line-height: 1] font-bold">전체 필터</span>
              <Button
                variant="ghost"
                tw="px-0 py-0 h-[1.5rem]"
                onClick={() => {
                  handleCloseAllFilterExpanded();
                }}
              >
                <Close />
              </Button>
            </div>
            <div tw="flex items-center [z-index: 50] bg-white">
              <RealestateTypeGroupTabButton
                selected={uiFilter.realestateTypeGroup === 'apt,oftl'}
                onClick={() => {
                  handleUIChangeRealestateTypeGroup('apt,oftl');
                  setUIFilters(['realestateType', 'buyOrRent', 'price', 'household', 'etc']);
                }}
                tw="pl-0"
              >
                아파트·오피스텔
              </RealestateTypeGroupTabButton>
              <Separator />
              <RealestateTypeGroupTabButton
                selected={uiFilter.realestateTypeGroup === 'villa,dandok'}
                onClick={() => {
                  handleUIChangeRealestateTypeGroup('villa,dandok');
                  setUIFilters(['realestateType', 'buyOrRent', 'price', 'etc']);
                }}
              >
                빌라·주택
              </RealestateTypeGroupTabButton>
              <Separator />
              <RealestateTypeGroupTabButton
                selected={uiFilter.realestateTypeGroup === 'one,two'}
                onClick={() => {
                  handleUIChangeRealestateTypeGroup('one,two');
                  setUIFilters(['realestateType', 'buyOrRent', 'price']);
                }}
                tw="pr-0"
              >
                원룸·투룸
              </RealestateTypeGroupTabButton>
            </div>
            <FilterTypesMedium
              filter={uiFilter}
              filterTypes={uiFilterTypes}
              expanded={isUIFilterTypesExpanded}
              onToggleExpansion={handleToggleUIExpansion}
            />

            {isUIRealestateTypeRoomCountFilterAdded && (
              <RealestateTypeRoomCountFilter
                realestateTypeGroup={uiFilter.realestateTypeGroup}
                realestateTypes={uiFilter.realestateTypes}
                roomCounts={uiFilter.roomCounts}
                onChangeRealestateTypes={handleUIChangeRealestateTypes}
                onChangeRoomCounts={handleUIChangeRoomCounts}
              />
            )}

            {isUIBuyOrRentFilterAdded && (
              <BuyorRentFilter
                realestateTypeGroup={uiFilter.realestateTypeGroup}
                value={uiFilter.buyOrRents}
                onChange={handleUIChangeBuyOrRents}
              />
            )}

            {isUIPriceFilterAdded && (
              <PriceFilter
                buyOrRents={uiFilter.buyOrRents}
                priceRange={uiFilter.priceRange}
                depositRange={uiFilter.depositRange}
                rentRange={uiFilter.rentRange}
                onChangePriceRange={handleUIChangePriceRange}
                onChangeDepositRange={handleUIChangeDepositRange}
                onChangeRentRange={handleUIChangeRentRange}
              />
            )}

            {isUIHouseholdFilterAdded && (
              <HouseholdFilter value={uiFilter.minHousehold} onChange={handleUIChangeMinHousehold} />
            )}

            {isUIEtcFilterAdded && (
              <EtcFilter
                quickSale={uiFilter.quickSale}
                gapInvestment={uiFilter.gapInvestment}
                onChangeQuickSale={handleUIChangeQuickSale}
                onChangeGapInvestment={handleUIChangeGapInvestment}
              />
            )}

            {filters.length > 0 && (
              <div tw="flex gap-2 fixed bottom-0 left-auto right-auto items-center justify-between py-4 px-5 w-full max-w-mobile bg-white z-50 shadow-persistentBottomBar">
                <Button variant="outlined" size="bigger" tw="flex-[1]" onClick={handleResetUIFilter}>
                  필터 초기화
                </Button>
                <Button variant="primary" size="bigger" tw="flex-[2.5]" onClick={handleSummitFilters}>
                  선택왼료
                </Button>
              </div>
            )}
          </FiltersContainer>
        </>
      )}

      {isFirstFilterTypesExpanded && (
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
