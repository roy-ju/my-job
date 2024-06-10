import { useCallback, useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { useIsomorphicLayoutEffect } from 'usehooks-ts';

import CheckboxButton from '@/components/atoms/CheckboxButton';

import Container from '@/components/atoms/Container';

import FullScreenPresenter from '@/components/molecules/FullScreenPresenter';

import mobileMapAtom from '@/states/atom/mobileMap';

import { convertSidoName, convertSigunguName } from '@/utils/fotmat';

import Header from './region-select-popup/Header';

import Breadcrumbs from './region-select-popup/Breadcrumbs';

import Cta from './region-select-popup/Cta';

import {
  ListContainer,
  ListOuterWrraper,
  ListInnerWrraper,
  ListVerticalHorizontalSeperator,
  BackgroundContainer,
} from './region-select-popup/widget/RegionSelectWidget';

import useScrollSelecetedRef from './region-select-popup/hooks/useScrollSelectedRef';

import useRegionSelectHandler from './region-select-popup/hooks/useRegionSelectHandler';

interface RegionSelectPopupProps {
  code?: string;
  centerAddress?: string[];
  handleClose?: () => void;
}

export default function RegionSelect({ code, centerAddress, handleClose }: RegionSelectPopupProps) {
  const [map, _] = useRecoilState(mobileMapAtom);

  const {
    sidoData,
    sigunguData,
    eubmyeondongData,
    sidoCode,
    sigunguCode,
    eubmyeondongCode,
    handleChangeSelectedSido,
    handleChangeNoneSelectedSido,
    handleChangeSelectedSigungu,
    handleChangeNoneSelectedSigungu,
    handleChangeEummyeondong,
  } = useRegionSelectHandler(code);

  const [centerPoint, setCenterPoint] = useState<{ lat: number; lng: number } | undefined>();

  const [, setCenter] = useState<(string | null)[] | undefined>();

  const {
    selectedRefOne,
    selectedRefTwo,
    selectedRefThree,
    scrollConainerRefOne,
    scrollConainerRefTwo,
    scrollConainerRefThree,
  } = useScrollSelecetedRef();

  const handleUpdateCenterPoint = useCallback(() => {
    if (centerPoint) {
      map?.morph({ lat: centerPoint.lat, lng: centerPoint.lng });
      handleClose?.();
    }
  }, [centerPoint, map, handleClose]);

  useEffect(() => {
    if (centerAddress) {
      setCenter(centerAddress);
    }
  }, [centerAddress]);

  useIsomorphicLayoutEffect(() => {
    if (eubmyeondongCode && eubmyeondongData?.list) {
      const result = eubmyeondongData.list.filter((item) => item.code === eubmyeondongCode);

      if (result && result.length >= 1) {
        setCenterPoint({ lat: result[0].lat, lng: result[0].long });
      }
    }
  }, [eubmyeondongCode, eubmyeondongData]);

  return (
    <FullScreenPresenter isAnimate={false}>
      <BackgroundContainer>
        <Container tw="relative">
          <Header handleClick={handleClose} />
          <Breadcrumbs />
          <ListContainer>
            <ListOuterWrraper>
              <ListInnerWrraper ref={scrollConainerRefOne}>
                {sidoData?.list?.map((item) => {
                  if (item.code === sidoCode) {
                    return (
                      <CheckboxButton
                        selected
                        ref={selectedRefOne}
                        key={item.code}
                        variant="primary"
                        id={item.code}
                        onClick={handleChangeSelectedSido}
                      >
                        {convertSidoName(item.name)}
                      </CheckboxButton>
                    );
                  }
                  return (
                    <CheckboxButton
                      key={item.code}
                      variant="primary"
                      id={item.code}
                      onClick={handleChangeNoneSelectedSido}
                    >
                      {convertSidoName(item.name)}
                    </CheckboxButton>
                  );
                })}
              </ListInnerWrraper>
              <ListVerticalHorizontalSeperator />
              <ListInnerWrraper ref={scrollConainerRefTwo}>
                {sigunguData?.list?.map((item) => {
                  if (item.code === sigunguCode) {
                    return (
                      <CheckboxButton
                        selected
                        ref={selectedRefTwo}
                        key={item.code}
                        variant="primary"
                        id={item.code}
                        onClick={handleChangeSelectedSigungu}
                      >
                        {convertSigunguName(item.name)}
                      </CheckboxButton>
                    );
                  }
                  return (
                    <CheckboxButton
                      key={item.code}
                      variant="primary"
                      id={item.code}
                      onClick={handleChangeNoneSelectedSigungu}
                    >
                      {convertSigunguName(item.name)}
                    </CheckboxButton>
                  );
                })}
              </ListInnerWrraper>
              <ListVerticalHorizontalSeperator />
              <ListInnerWrraper ref={scrollConainerRefThree}>
                {eubmyeondongData?.list?.map((item) => {
                  if (item.code === eubmyeondongCode) {
                    return (
                      <CheckboxButton
                        selected
                        ref={selectedRefThree}
                        key={item.code}
                        variant="primary"
                        id={item.code}
                        onClick={handleChangeEummyeondong}
                      >
                        {item.name}
                      </CheckboxButton>
                    );
                  }
                  return (
                    <CheckboxButton key={item.code} variant="primary" id={item.code} onClick={handleChangeEummyeondong}>
                      {item.name}
                    </CheckboxButton>
                  );
                })}
              </ListInnerWrraper>
            </ListOuterWrraper>
          </ListContainer>
          <Cta handleClick={handleUpdateCenterPoint} />
        </Container>
      </BackgroundContainer>
    </FullScreenPresenter>
  );
}
