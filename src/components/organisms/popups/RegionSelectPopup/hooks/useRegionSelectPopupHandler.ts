import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { useIsomorphicLayoutEffect } from 'usehooks-ts';

import { toast } from 'react-toastify';

import SuggestFormState from '@/components/domains/suggest/form/atoms/SuggestFormState';

import { convertSidoName, convertSigunguName } from '@/utils/fotmat';

import { useFetchDanjiEubmyeondongList } from '@/services/danji/useFetchDanjiEubmyeondongList';

import { useFetchDanjiSidoList } from '@/services/danji/useFetchDanjiSidoList';

import { useFetchDanjiSigunguList } from '@/services/danji/useFetchDanjiSigunguList';

import moveCenterScrollInContainer from '@/utils/moveCenterScrollInContainer';

import removeElementOnce from '../utils/removeElementOnce';

import splitAddress from '../utils/splitAddress';

import { RegionItem } from '../types';

export default function useRegionSelectPopupHandler() {
  const [state, _] = useRecoilState(SuggestFormState);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [currentSelectedSido, setCurrentSelectedSido] = useState<RegionItem | null>(null);

  const [currentSelectedSigungu, setCurrentSelectedSigungu] = useState<RegionItem | null>(null);

  const [currentSelectedEubmyeondong, setCurrentSelectedEubmyeondong] = useState<RegionItem | null>(null);

  const [selectedSidos, setSelectedSidos] = useState<string[]>([]);

  const [selectedSigungus, setSelectedSigungus] = useState<string[]>([]);

  const [selectedEubmyeondongs, setSelectedEubmyeondongs] = useState<string[]>([]);

  const [selectedRegions, setSelectedRegions] = useState<RegionItem[]>([]);

  const { data: sidoData } = useFetchDanjiSidoList();

  const { data: sigunguData } = useFetchDanjiSigunguList({ sidoCode: currentSelectedSido?.code });

  const { data: eubmyeondongData } = useFetchDanjiEubmyeondongList({ sigunguCode: currentSelectedSigungu?.code });

  const sidoList = useMemo(
    () =>
      sidoData?.list
        ?.map((item) => ({
          name: convertSidoName(item.name),
          code: item.code,
        }))
        .filter((item) => ['서울', '경기', '인천'].includes(item.name))
        .sort((a, b) => (a.name < b.name ? -1 : 0)),
    [sidoData],
  );

  const sigunguList = useMemo(
    () =>
      sigunguData?.list
        ?.map((item) => ({
          name: convertSigunguName(item.name),
          code: item.code,
        }))
        .sort((a, b) => (a.name < b.name ? -1 : 0)),
    [sigunguData],
  );

  const eubmyeondongList = useMemo(
    () =>
      eubmyeondongData?.list
        ?.map((item) => ({
          name: item.name,
          code: item.code,
        }))
        .sort((a, b) => (a.name < b.name ? -1 : 0)),
    [eubmyeondongData],
  );

  const handleScrollScrollWidth = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;

      const { scrollWidth, clientWidth } = container;

      if (scrollWidth > clientWidth) {
        container.scrollTo({
          left: scrollWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleChangeSido = useCallback((v: RegionItem) => {
    setCurrentSelectedSido(v);
    setCurrentSelectedSigungu(null);
    setCurrentSelectedEubmyeondong(null);
  }, []);

  const handleChangeSigungu = useCallback((v: RegionItem) => {
    setCurrentSelectedSigungu(v);
    setCurrentSelectedEubmyeondong(null);
  }, []);

  const handleChangeEubmyeondong = useCallback(
    (v: RegionItem) => {
      if (currentSelectedSido && currentSelectedSigungu) {
        const item = {
          name: `${currentSelectedSido.name} ${currentSelectedSigungu.name} ${v.name}`,
          code: v.code,
        };

        const isExistedSelectedRegion = !!selectedRegions.filter((ele) => ele.name === item.name).length;

        if (isExistedSelectedRegion) {
          const filteredItems = selectedRegions.filter((i) => i.name !== item.name);

          const filteredSidos = removeElementOnce(selectedSidos, currentSelectedSido.name);

          const filteredSigungs = removeElementOnce(selectedSigungus, currentSelectedSigungu.name);

          const filteredEubmyeondongs = selectedEubmyeondongs.filter((i) => i !== v.name);

          // 선택된 읍면동 이름과 현재 선택된 읍면동 이름이 같으면
          if (v.name === currentSelectedEubmyeondong?.name) {
            setCurrentSelectedEubmyeondong(null);
          }

          setSelectedRegions(filteredItems);
          setSelectedSidos(filteredSidos);
          setSelectedSigungus(filteredSigungs);
          setSelectedEubmyeondongs(filteredEubmyeondongs);
          return;
        }

        if (selectedRegions.length === 5) {
          toast.error('지역은 5개까지 선택 가능합니다');
          return;
        }

        setCurrentSelectedEubmyeondong(v);
        setSelectedRegions((prev) => [...prev, item]);
        setSelectedSidos((prev) => [...prev, currentSelectedSido.name]);
        setSelectedSigungus((prev) => [...prev, currentSelectedSigungu.name]);
        setSelectedEubmyeondongs((prev) => [...prev, v.name]);

        setTimeout(() => {
          handleScrollScrollWidth();
        }, 50);
      }
    },
    [
      currentSelectedEubmyeondong?.name,
      currentSelectedSido,
      currentSelectedSigungu,
      selectedEubmyeondongs,
      selectedRegions,
      selectedSidos,
      selectedSigungus,
    ],
  );

  const handleRemoveSelectedRegionItem = useCallback(
    (v: RegionItem, isLastRemove: boolean) => {
      if (isLastRemove) {
        setCurrentSelectedEubmyeondong(null);
      }

      const splitedName = v.name.split(' ');
      const sido = splitedName[0];
      const sigungu = splitedName.slice(1, splitedName.length - 1).join(' ');
      const eubmyeondong = splitedName[splitedName.length - 1];

      const updatedSidos = removeElementOnce(selectedSidos, sido);
      const updatedSigungus = removeElementOnce(selectedSigungus, sigungu);
      const updatedEubmyeondongs = removeElementOnce(selectedEubmyeondongs, eubmyeondong);

      const regions = selectedRegions.filter((item) => item.name !== v.name);

      if (regions.length === 0) {
        setCurrentSelectedSido(null);
        setCurrentSelectedSigungu(null);
        setCurrentSelectedEubmyeondong(null);
      }

      setSelectedSidos(updatedSidos);
      setSelectedSigungus(updatedSigungus);
      setSelectedEubmyeondongs(updatedEubmyeondongs);
      setSelectedRegions(regions);
    },
    [selectedEubmyeondongs, selectedRegions, selectedSidos, selectedSigungus],
  );

  console.log(selectedSidos, selectedSigungus, selectedEubmyeondongs);

  useEffect(() => {
    const { bubjungdong, address } = state;

    if (bubjungdong && address && typeof address !== 'string' && Array.isArray(bubjungdong) && bubjungdong.length > 0) {
      setSelectedRegions(bubjungdong);

      const name = bubjungdong[bubjungdong.length - 1].name;

      const { sido, sigungu, eubmyeondong } = splitAddress(name);

      const sidoCode = bubjungdong[bubjungdong.length - 1].code.slice(0, 2);
      const sigunguCode = bubjungdong[bubjungdong.length - 1].code.slice(0, 5);
      const eubmyeondongCode = bubjungdong[bubjungdong.length - 1].code;

      setCurrentSelectedSido({ name: sido, code: sidoCode });
      setCurrentSelectedSigungu({ name: sigungu, code: sigunguCode });
      setCurrentSelectedEubmyeondong({ name: eubmyeondong, code: eubmyeondongCode });

      const sidos = bubjungdong.map((item) => splitAddress(item.name).sido);
      const sigungus = bubjungdong.map((item) => splitAddress(item.name).sigungu);
      const eubmyeondongs = bubjungdong.map((item) => splitAddress(item.name).eubmyeondong);

      setSelectedSidos(sidos);
      setSelectedSigungus(sigungus);
      setSelectedEubmyeondongs(eubmyeondongs);
    }
  }, [state]);

  useIsomorphicLayoutEffect(() => {
    if (currentSelectedSido && sidoData) {
      const container = document.getElementById('negocio-region-sido-wrraper');
      const element = document.getElementById(`negocio-region-sido-${currentSelectedSido.code}`);

      if (container && element) {
        setTimeout(() => {
          moveCenterScrollInContainer(element, container);
        }, 100);
      }
    }
  }, [currentSelectedSido, sidoData]);

  useIsomorphicLayoutEffect(() => {
    if (currentSelectedSigungu && sigunguData) {
      const container = document.getElementById('negocio-region-sigungu-wrraper');
      const element = document.getElementById(`negocio-region-sigungu-${currentSelectedSigungu.code}`);

      if (container && element) {
        setTimeout(() => {
          moveCenterScrollInContainer(element, container);
        }, 100);
      }
    }
  }, [currentSelectedSigungu, sigunguData]);

  useIsomorphicLayoutEffect(() => {
    if (currentSelectedEubmyeondong && eubmyeondongData) {
      const container = document.getElementById('negocio-region-eubmyeondong-wrraper');
      const element = document.getElementById(`negocio-region-eubmyeondong-${currentSelectedEubmyeondong.code}`);

      if (container && element) {
        setTimeout(() => {
          moveCenterScrollInContainer(element, container);
        }, 100);
      }
    }
  }, [currentSelectedEubmyeondong, eubmyeondongData]);

  return {
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
  };
}
