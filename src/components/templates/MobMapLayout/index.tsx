import { ChangeEventHandler, ReactNode } from 'react';
import { MobMapControls, MobMapPositionBar, MobMapPriceSelect, MobMapToggleButton } from '@/components/organisms';
import { Button } from '@/components/atoms';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { Filter } from '@/components/organisms/MapFilter/types';
import MobMapFilter from '@/components/organisms/MobMapFilter';
import { convertSidoName } from '@/utils/fotmat';

interface MobLayoutMapContainerProps {
  mapType?: string;
  priceType?: string;
  mapLayer?: string;
  mapToggleValue?: number;
  schoolType?: string;
  filter?: Filter;
  centerAddress?: string[];
  listingCount?: number;
  currentLocation:
    | {
        lat?: number | undefined;
        lng?: number | undefined;
      }
    | undefined;
  onClickCurrentLocation?: () => void;
  onClickSchool?: () => void;
  onClickMapLayerCadastral?: () => void;
  onClickMapLayerStreet?: () => void;
  onChangeMapType?: ChangeEventHandler<HTMLInputElement>;
  onChangeSchoolType?: ChangeEventHandler<HTMLInputElement>;
  onMapSearchSubmit?: (item: KakaoAddressAutocompleteResponseItem) => void;
  onChangeFilter?: (filter: Partial<Filter>) => void;
  onChangeMapToggleValue?: (value: number) => void;
  onChangePriceType?: (value: string) => void;
  onTogglepanelsVisibility?: () => void;
  children?: ReactNode;
}

function MobLayoutMapContainer({
  mapType,
  priceType,
  mapLayer,
  schoolType,
  filter,
  centerAddress,
  mapToggleValue,
  listingCount,
  currentLocation,
  onClickCurrentLocation,
  onClickMapLayerCadastral,
  onClickMapLayerStreet,
  onChangeMapType,
  onClickSchool,
  onChangeSchoolType,
  onChangeFilter,
  onChangeMapToggleValue,
  onChangePriceType,
  children,
}: MobLayoutMapContainerProps) {
  return (
    <>
      <MobMapFilter filter={filter} onChangeFilter={onChangeFilter} />
      <div id="map-container" tw="relative flex-1">
        {filter?.realestateTypeGroup === 'apt,oftl' && (
          <div tw="absolute left-4 top-3 z-20 flex justify-center pointer-events-none">
            <div tw="w-fit pointer-events-auto">
              <MobMapToggleButton value={mapToggleValue} onChange={onChangeMapToggleValue} />
            </div>
          </div>
        )}

        {filter?.realestateTypeGroup !== 'apt,oftl' && (
          <div tw="absolute left-4 top-3 z-20 flex justify-center pointer-events-none">
            <div tw="w-fit pointer-events-auto">
              <Button size="medium" tw="whitespace-nowrap font-bold rounded-4xl bg-nego-800">
                이 지역 매물 {listingCount ?? 0}
              </Button>
            </div>
          </div>
        )}

        <div tw="absolute right-4 top-3 z-20">
          <MobMapPriceSelect value={priceType} onChange={onChangePriceType} />
        </div>
        <div tw="absolute right-5 top-[4rem] flex flex-col gap-3 z-10">
          <MobMapControls.Group>
            <MobMapControls.MapButton selected value={mapType} onChange={onChangeMapType} />
            <MobMapControls.StreetViewButton selected={mapLayer === 'street'} onClick={onClickMapLayerStreet} />
            <MobMapControls.CadastralButton selected={mapLayer === 'cadastral'} onClick={onClickMapLayerCadastral} />
            <MobMapControls.SchoolButton
              selected={schoolType !== 'none'}
              value={schoolType}
              onChange={onChangeSchoolType}
              onClick={onClickSchool}
            />
          </MobMapControls.Group>
          <MobMapControls.GPSButton
            selected={!!(currentLocation?.lat && currentLocation?.lng)}
            onClick={onClickCurrentLocation}
          />
        </div>
        <div tw="w-full max-w-mobile inline-flex justify-between absolute left-0 right-0 bottom-6 px-4 z-10">
          <MobMapPositionBar
            sido={convertSidoName(centerAddress?.[0])}
            sigungu={centerAddress?.[1]}
            eubmyundong={centerAddress?.[2]}
          />
          <Button size="medium" tw="whitespace-nowrap font-bold rounded-4xl text-info">
            매물 추천받기
          </Button>
        </div>
        {children}
      </div>
    </>
  );
}

export default MobLayoutMapContainer;
