import { useCallback, useEffect, useMemo, useState } from 'react';

import tw, { styled } from 'twin.macro';

import { toast } from 'react-toastify';

import { Button } from '@/components/atoms';

import { ButtonProps } from '@/components/atoms/Button';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import { BuyOrRent, RealestateType } from '@/constants/enums';

import Close from '@/assets/icons/close_24.svg';

import BuyorRentFilter from '../MobMapFilter/BuyOrRentFilter';

import PriceFilter, { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from '../MobMapFilter/PriceFilter';

import HouseholdFilter from '../MobMapFilter/HouseholdFilter';

import EtcFilter from '../MobMapFilter/EtcFilter';

import FilterTypesMedium from '../MobMapFilter/FilterTypesMedium';

import RealestateTypeRoomCountFilter from '../MobMapFilter/RealestateTypeRoomCountFilter';

import { Filter, FilterType, MinHousehold, RealestateTypeGroup } from '../MobMapFilter/types';

export function getDefaultFilterAptOftl(): Filter {
  return {
    realestateTypeGroup: 'apt,oftl',
    realestateTypes: [RealestateType.Apartment, RealestateType.Officetel].join(','),
    // buyOrRents: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
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
    // buyOrRents: [BuyOrRent.Buy, BuyOrRent.Jeonsae, BuyOrRent.Wolsae].join(','),
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
    ${tw`px-1`}
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

export default function MobAllMapFilter({ filter: filterProp, onChangeFilter }: MapFilterProps) {
  const { closeAll } = useFullScreenDialog();

  const [uiFilter, setUIFilterState] = useState<Filter>(filterProp || getDefaultFilterAptOftl());

  const [isUIFilterTypesExpanded, setIsUIFilterTypeExapnded] = useState(false);

  const [uiFilterTypes, setUIFilterTypes] = useState<FilterType[]>([
    'realestateType',
    'buyOrRent',
    'price',
    'household',
    'etc',
  ]);

  // 현재 열려있는 필터목록(ONLY UI)
  const [uiFilters, setUIFilters] = useState<FilterType[]>([]);

  // 유형 필터 열림/닫힘

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

  const handleUIChangeRealestateTypeGroup = useCallback(
    (value: RealestateTypeGroup) => {
      switch (value) {
        case 'apt,oftl':
          setUIFilterTypes(['realestateType', 'buyOrRent', 'price', 'household']);
          setUIFilters([]);
          setUIFilterState(getDefaultFilterAptOftl());
          handleUIChangeFilter?.(getDefaultFilterAptOftl());
          break;
        case 'villa,dandok':
          setUIFilterTypes(['realestateType', 'buyOrRent', 'price']);
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

  const handleToggleUIExpansion = useCallback(() => {
    setIsUIFilterTypeExapnded((prev) => !prev);
  }, []);

  // 열려 있는 모든 필터 닫기 버튼 Click Event Handler

  const handleSummitFilters = useCallback(() => {
    onChangeFilter?.(uiFilter);
    closeAll();

    toast.success('필터를 적용했습니다.', { toastId: 'negocio-apply-filter' });
  }, [closeAll, onChangeFilter, uiFilter]);

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
  }, [uiFilter, handleUIChangeFilter]);

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
        gapInvestment: false,
        quickSale: false,
      }));
      handleUIChangeFilter?.({
        buyOrRents: newBuyOrRents,
        priceRange: [0, PRICE_STEPS.length - 1],
        depositRange: [0, DEPOSIT_STEPS.length - 1],
        rentRange: [0, RENT_STEPS.length - 1],
        gapInvestment: false,
        quickSale: false,
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
    if (uiFilter.realestateTypeGroup === 'apt,oftl') {
      if (uiFilter.buyOrRents === '1') {
        fts.push(...['realestateType', 'buyOrRent', 'price', 'household', 'etc']);
      } else {
        fts.push(...['realestateType', 'buyOrRent', 'price', 'household']);
      }
    } else if (uiFilter.realestateTypeGroup === 'villa,dandok') {
      if (uiFilter.buyOrRents === '1') {
        fts.push(...['realestateType', 'buyOrRent', 'price', 'etc']);
      } else {
        fts.push(...['realestateType', 'buyOrRent', 'price']);
      }
    } else if (uiFilter.realestateTypeGroup === 'one,two') {
      fts.push(...['realestateType', 'buyOrRent', 'price']);
    }

    const buyOrRents = uiFilter.buyOrRents.split(',').map((item) => Number(item) as BuyOrRent);

    if (!buyOrRents.includes(BuyOrRent.Buy)) {
      fts.filter((item) => item !== 'etc');
    }

    setUIFilterTypes(fts as FilterType[]);
  }, [uiFilter]);

  useEffect(() => {
    if (uiFilter.realestateTypeGroup === 'apt,oftl') {
      if (uiFilter.buyOrRents === '1') {
        setUIFilters(['realestateType', 'buyOrRent', 'price', 'household', 'etc']);
      } else {
        setUIFilters(['realestateType', 'buyOrRent', 'price', 'household']);
      }
    }

    if (uiFilter.realestateTypeGroup === 'villa,dandok') {
      if (uiFilter.buyOrRents === '1') {
        setUIFilters(['realestateType', 'buyOrRent', 'price', 'etc']);
      } else {
        setUIFilters(['realestateType', 'buyOrRent', 'price']);
      }
    }

    if (uiFilter.realestateTypeGroup === 'one,two') {
      setUIFilters(['realestateType', 'buyOrRent', 'price']);
    }
  }, [uiFilter]);

  useEffect(() => {
    if (filterProp) {
      setUIFilterState(filterProp);
    }
  }, [filterProp]);

  return (
    <FiltersContainer tw="w-full min-h-[100vh] overflow-y-hidden [z-index: 100] bg-white">
      <div tw="w-full fixed top-0 left-auto right-auto [z-index: 50] bg-white">
        <div tw="flex items-center justify-between py-4 px-4">
          <span tw="text-b1 [line-height: 1] font-bold">전체 필터</span>
          <Button variant="ghost" tw="px-0 py-0 h-[1.5rem]" onClick={closeAll}>
            <Close />
          </Button>
        </div>

        <div tw="flex items-center [z-index: 50] bg-white px-4">
          <RealestateTypeGroupTabButton
            selected={uiFilter.realestateTypeGroup === 'apt,oftl'}
            onClick={() => {
              handleUIChangeRealestateTypeGroup('apt,oftl');
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
            }}
          >
            빌라·주택
          </RealestateTypeGroupTabButton>
          <Separator />
          <RealestateTypeGroupTabButton
            selected={uiFilter.realestateTypeGroup === 'one,two'}
            onClick={() => {
              handleUIChangeRealestateTypeGroup('one,two');
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
      </div>

      <div tw="w-full fixed h-[calc(100vh - 5.5rem - 10.5rem)] overflow-y-auto left-auto right-auto [z-index: 1000] bg-white mt-[10.5rem] pb-[7rem]">
        <div tw="px-4">
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
        </div>
      </div>

      {uiFilters.length > 0 && (
        <div
          tw="flex gap-2 fixed bottom-0 left-auto right-auto items-center justify-between py-4 w-full bg-white z-50 shadow-persistentBottomBar [z-index: 1001]"
          style={{ paddingLeft: '1.6rem', paddingRight: '1.6rem' }}
        >
          <Button variant="outlined" size="bigger" tw="flex-[1]" onClick={handleResetUIFilter}>
            필터 초기화
          </Button>
          <Button variant="primary" size="bigger" tw="flex-[2.5]" onClick={handleSummitFilters}>
            선택완료
          </Button>
        </div>
      )}
    </FiltersContainer>
  );
}
