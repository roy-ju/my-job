import { useCallback, useEffect, useState, MouseEvent } from 'react';

import { useRecoilState } from 'recoil';

import { useIsomorphicLayoutEffect } from 'usehooks-ts';

import CheckboxButton from '@/components/atoms/CheckboxButton';

import Container from '@/components/atoms/Container';

import FullScreenPresenter from '@/components/molecules/FullScreenPresenter';

import mobileMapAtom from '@/states/atom/mobileMap';

import { convertSidoName, convertSigunguName } from '@/utils/fotmat';

import { useFetchDanjiSidoList } from '@/services/danji/useFetchDanjiSidoList';

import { useFetchDanjiSigunguList } from '@/services/danji/useFetchDanjiSigunguList';

import { useFetchDanjiEubmyeondongList } from '@/services/danji/useFetchDanjiEubmyeondongList';

import Header from './Header';

import Breadcrumbs from './Breadcrumbs';

import Cta from './Cta';

import {
  ListContainer,
  ListOuterWrraper,
  ListInnerWrraper,
  ListVerticalHorizontalSeperator,
  BackgroundContainer,
} from './widget/RegionSelectWidget';

import useScrollSelecetedRef from './hooks/useScrollSelectedRef';

interface RegionSelectPopupProps {
  code?: string;
  centerAddress?: string[];
  onClickClose?: () => void;
}

export default function RegionSelectPopup({ code, centerAddress, onClickClose }: RegionSelectPopupProps) {
  const [map, _] = useRecoilState(mobileMapAtom);

  const [sidoCode, setSidoCode] = useState('');
  const [sigunguCode, setSigunguCode] = useState('');
  const [eubmyeondongCode, setEubmyeondongCode] = useState('');

  const { data: sidoData } = useFetchDanjiSidoList();

  const { data: sigunguData } = useFetchDanjiSigunguList({ sidoCode });

  const { data: eubmyeondongData } = useFetchDanjiEubmyeondongList({ sigunguCode });

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

  const handleChangeSelectedSido = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setSidoCode(e.currentTarget.id);
    }
  }, []);

  const handleChangeNoneSelectedSido = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setSidoCode(e.currentTarget.id);

      setSigunguCode('');
      setEubmyeondongCode('');
    }
  }, []);

  const handleChangeSelectedSigungu = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setSigunguCode(e?.currentTarget.id);
    }
  }, []);

  const handleChangeNoneSelectedSigungu = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setSigunguCode(e?.currentTarget.id);

      setEubmyeondongCode('');
    }
  }, []);

  const handleChangeEummyeondong = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setEubmyeondongCode(e.currentTarget.id);
    }
  }, []);

  const handleUpdateCenterPoint = useCallback(() => {
    if (centerPoint) {
      map?.morph({ lat: centerPoint.lat, lng: centerPoint.lng });
      onClickClose?.();
    }
  }, [centerPoint, map, onClickClose]);

  useEffect(() => {
    if (centerAddress) {
      setCenter(centerAddress);
    }
  }, [centerAddress]);

  useEffect(() => {
    if (code) {
      setSidoCode(code.slice(0, 2));
      setSigunguCode(code.slice(0, 5));
      setEubmyeondongCode(`${code.slice(0, 8)}00`);
    }
  }, [code]);

  useIsomorphicLayoutEffect(() => {
    if (eubmyeondongCode && eubmyeondongData?.list) {
      const result = eubmyeondongData.list.filter((item) => item.code === eubmyeondongCode);

      if (result && result.length >= 1) {
        setCenterPoint({ lat: result[0].lat, lng: result[0].long });
      }
    }
  }, [eubmyeondongCode, eubmyeondongData]);

  useEffect(() => {
    if (!sigunguCode && sigunguData?.list?.[0].code && sigunguData?.list?.[0].name) {
      setSigunguCode(sigunguData?.list?.[0].code);
    }

    if (!eubmyeondongCode && eubmyeondongData?.list?.[0].code && eubmyeondongData?.list?.[0].name) {
      setEubmyeondongCode(eubmyeondongData?.list?.[0].code);
    }
  }, [sigunguCode, eubmyeondongCode, sidoData, sigunguData, eubmyeondongData]);

  return (
    <FullScreenPresenter isAnimate={false}>
      <BackgroundContainer>
        <Container tw="relative">
          <Header onClickClose={onClickClose} />
          <Breadcrumbs />
          <ListContainer>
            <ListOuterWrraper>
              <ListInnerWrraper ref={scrollConainerRefOne}>
                {sidoData?.list?.map((item) => {
                  if (item.code === sidoCode) {
                    return (
                      <CheckboxButton
                        selected
                        key={item.code}
                        variant="primary"
                        id={item.code}
                        name={convertSidoName(item.name)}
                        ref={selectedRefOne}
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
                      name={convertSidoName(item.name)}
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
                        key={item.code}
                        variant="primary"
                        id={item.code}
                        name={convertSigunguName(item.name)}
                        ref={selectedRefTwo}
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
                      name={convertSigunguName(item.name)}
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
                        key={item.code}
                        variant="primary"
                        id={item.code}
                        name={item.name}
                        ref={selectedRefThree}
                        onClick={handleChangeEummyeondong}
                      >
                        {item.name}
                      </CheckboxButton>
                    );
                  }
                  return (
                    <CheckboxButton
                      key={item.code}
                      variant="primary"
                      id={item.code}
                      name={item.name}
                      onClick={handleChangeEummyeondong}
                    >
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
