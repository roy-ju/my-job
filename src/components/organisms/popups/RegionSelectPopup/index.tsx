import { useCallback } from 'react';

import FullScreenPresenter from '@/components/molecules/FullScreenPresenter';

import { OverlayPresenter } from '@/components/molecules';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Header from './Header';

import Breadcrumbs from './Breadcrumbs';

import List from './List';

import Cta from './Cta';

import SelectedRegions from './SelectedRegions';

import useRegionSelectPopupHandler from './hooks/useRegionSelectPopupHandler';

import { RegionItem } from './types';

interface RegionSelectPopupProps {
  onClickClose?: () => void;
  onSubmit?: (item: RegionItem[]) => void;
}

export default function RegionSelectPopup({ onClickClose, onSubmit }: RegionSelectPopupProps) {
  const { platform } = useCheckPlatform();

  const {
    scrollRef,

    sidoList,
    sigunguList,
    eubmyeondongList,

    currentSelectedSido,
    currentSelectedSigungu,
    currentSelectedEubmyeondong,

    selectedSidos,
    selectedSigungus,
    selectedEubmyeondongs,

    selectedRegions,

    handleChangeSido,
    handleChangeSigungu,
    handleChangeEubmyeondong,
    handleRemoveSelectedRegionItem,
  } = useRegionSelectPopupHandler();

  const handleSubmit = useCallback(() => {
    if (selectedRegions.length === 0) {
      return;
    }

    if (selectedRegions.length > 0) {
      onSubmit?.(selectedRegions);
    }
  }, [selectedRegions, onSubmit]);

  if (platform === 'mobile') {
    return (
      <FullScreenPresenter>
        <div tw="bg-white w-[100%] h-[100%] shadow">
          <div tw="flex flex-col h-full">
            <Header onClickClose={onClickClose} />
            <Breadcrumbs />
            <List
              list1={sidoList}
              list2={sigunguList}
              list3={eubmyeondongList}
              onChangeValue1={handleChangeSido}
              onChangeValue2={handleChangeSigungu}
              onChangeValue3={handleChangeEubmyeondong}
              value1={currentSelectedSido}
              value2={currentSelectedSigungu}
              value3={currentSelectedEubmyeondong}
              values1={selectedSidos}
              values2={selectedSigungus}
              values3={selectedEubmyeondongs}
            />
            <SelectedRegions
              ref={scrollRef}
              selectedRegions={selectedRegions}
              handleRemoveSelectedRegionItem={handleRemoveSelectedRegionItem}
            />
            <Cta disabled={selectedRegions.length === 0} onSubmit={handleSubmit} />
          </div>
        </div>
      </FullScreenPresenter>
    );
  }

  return (
    <OverlayPresenter>
      <div tw="bg-white w-[375px] h-[600px] [border-radius: 20px] shadow">
        <div tw="flex flex-col h-full">
          <Header onClickClose={onClickClose} />
          <Breadcrumbs />
          <List
            list1={sidoList}
            list2={sigunguList}
            list3={eubmyeondongList}
            onChangeValue1={handleChangeSido}
            onChangeValue2={handleChangeSigungu}
            onChangeValue3={handleChangeEubmyeondong}
            value1={currentSelectedSido}
            value2={currentSelectedSigungu}
            value3={currentSelectedEubmyeondong}
            values1={selectedSidos}
            values2={selectedSigungus}
            values3={selectedEubmyeondongs}
          />
          <SelectedRegions
            ref={scrollRef}
            selectedRegions={selectedRegions}
            handleRemoveSelectedRegionItem={handleRemoveSelectedRegionItem}
          />
          <Cta disabled={selectedRegions.length === 0} onSubmit={handleSubmit} />
        </div>
      </div>
    </OverlayPresenter>
  );
}
