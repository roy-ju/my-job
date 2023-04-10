/* eslint-disable consistent-return */
import { ChangeEventHandler, ReactNode, useEffect, useState } from 'react';
import {
  MobDanjiSummary,
  MobGlobalNavigation,
  MobListingSummary,
  MobMapControls,
  MobMapHeader,
  MobMapPositionBar,
  MobMapPriceSelect,
  MobMapToggleButton,
} from '@/components/organisms';
import { Button, Checkbox } from '@/components/atoms';
import Close from '@/assets/icons/close_24.svg';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { Filter } from '@/components/organisms/MapFilter/types';
import MobMapFilter from '@/components/organisms/MobMapFilter';
import { convertSidoName } from '@/utils/fotmat';
import useFullScreenDialogStore from '@/hooks/recoil/mobile/useFullScreenDialog';
import { DanjiSummary, ListingSummary } from '@/layouts/Mobile/MapLayout/useMapLayout';
import MobAreaSearch from '../MobAreaSearch';
import MobGuideOverlay from '../MobGuideOverlay';

interface MobLayoutMapContainerProps {
  code?: string;
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
  selectedDanjiSummary: DanjiSummary | null;
  selctedListingSummary: ListingSummary | null;
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
  code,
  mapType,
  priceType,
  mapLayer,
  schoolType,
  filter,
  centerAddress,
  mapToggleValue,
  listingCount,
  currentLocation,
  selectedDanjiSummary,
  selctedListingSummary,
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
  const { addFullScreenDialog } = useFullScreenDialogStore();

  const openFullSearchArea = () => {
    addFullScreenDialog({ body: <MobAreaSearch code={code} centerAddress={centerAddress} /> });
  };

  const [isRenderGuideOverlay, setIsRenderGuideOverlay] = useState(false);

  const disappearGuideOverlay = () => {
    setIsRenderGuideOverlay(false);
  };

  useEffect(() => {
    if (localStorage.getItem('neogico-mob-map-initial') === 'true') {
      setIsRenderGuideOverlay(false);
      return;
    }
    if (!localStorage.getItem('neogico-mob-map-initial')) {
      localStorage.setItem('neogico-mob-map-initial', 'true');
      setIsRenderGuideOverlay(true);
    }

    return () => setIsRenderGuideOverlay(false);
  }, []);

  useEffect(() => {
    if (isRenderGuideOverlay) {
      const timeout = setTimeout(() => setIsRenderGuideOverlay(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isRenderGuideOverlay]);

  return (
    <div tw="flex flex-col w-full max-w-mobile h-full overflow-y-hidden mx-auto items-center">
      <MobMapHeader />
      {isRenderGuideOverlay && <MobGuideOverlay disappearGuideOverlay={disappearGuideOverlay} />}

      <MobMapFilter filter={filter} onChangeFilter={onChangeFilter} />
      <div id="map-container" tw="relative flex-1 w-full max-w-mobile">
        {filter?.realestateTypeGroup === 'apt,oftl' && (
          <div tw="absolute left-4 top-3 z-20 flex justify-center pointer-events-none">
            <div tw="w-fit pointer-events-auto">
              <MobMapToggleButton value={mapToggleValue} onChange={onChangeMapToggleValue} />
            </div>
          </div>
        )}

        {isRenderGuideOverlay && (
          <div tw="absolute left-4 top-3 z-20 flex justify-center pointer-events-none [z-index: 9000]">
            <div tw="w-fit pointer-events-none">
              <MobMapToggleButton value={mapToggleValue} />
            </div>
            <span
              tw="pointer-events-none absolute top-[4rem] left-[5rem] text-info [line-height: 1rem] text-white"
              style={{ whiteSpace: 'nowrap' }}
            >
              지도에 표기되는 가격정보의 종류를 바꿀수 있어요
            </span>
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
            onClick={openFullSearchArea}
          />
          {isRenderGuideOverlay && (
            <Button size="medium" tw="whitespace-nowrap font-bold rounded-4xl text-info pointer-events-none">
              매물 추천받기
            </Button>
          )}
        </div>

        <div tw="w-full max-w-mobile inline-flex justify-between absolute left-0 right-0 bottom-6 px-4 z-10">
          <MobMapPositionBar
            sido={convertSidoName(centerAddress?.[0])}
            sigungu={centerAddress?.[1]}
            eubmyundong={centerAddress?.[2]}
            onClick={openFullSearchArea}
          />

          <Button size="medium" tw="whitespace-nowrap font-bold rounded-4xl text-info pointer-events-none">
            매물 추천받기
          </Button>
        </div>

        {isRenderGuideOverlay && (
          <div tw="w-full max-w-mobile inline-flex justify-between absolute left-0 right-0 bottom-6 px-4 z-10 [z-index: 9000]">
            <Button
              size="medium"
              tw="absolute right-[1rem] bottom-0 whitespace-nowrap font-bold rounded-4xl text-info pointer-events-none"
            >
              매물 추천받기
            </Button>
            <span tw="pointer-events-none absolute right-[1rem] bottom-[-2rem] text-info [line-height: 1rem] text-white">
              원하는 조건의 매물 &apos;추천을&apos; 요청할 수 있어요
            </span>
          </div>
        )}

        {children}
      </div>

      {isRenderGuideOverlay && (
        <div tw="w-[100%] pointer-events-auto max-w-mobile flex items-center justify-between px-5 pb-9 absolute bottom-0 [z-index: 9000]">
          <div tw="flex items-center gap-2">
            <Checkbox />
            <span tw="pointer-events-auto text-info [line-height: 1rem] text-white">다시보지 않기</span>
          </div>
          <Close style={{ color: 'white', cursor: 'pointer' }} />
        </div>
      )}

      {selectedDanjiSummary && <MobDanjiSummary selectedDanjiSummary={selectedDanjiSummary} />}
      {selctedListingSummary && <MobListingSummary selctedListingSummary={selctedListingSummary} />}

      <MobGlobalNavigation />
    </div>
  );
}

export default MobLayoutMapContainer;
