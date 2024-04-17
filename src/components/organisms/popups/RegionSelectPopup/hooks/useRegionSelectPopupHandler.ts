import { useState, useMemo, useCallback, useRef } from 'react';

import { toast } from 'react-toastify';

import { convertSidoName, convertSigunguName } from '@/utils/fotmat';

import { useFetchDanjiEubmyeondongList } from '@/services/danji/useFetchDanjiEubmyeondongList';

import { useFetchDanjiSidoList } from '@/services/danji/useFetchDanjiSidoList';

import { useFetchDanjiSigunguList } from '@/services/danji/useFetchDanjiSigunguList';

import removeElementOnce from '../utils/removeElementOnce';

import { RegionItem } from '../types';

export default function useRegionSelectPopupHandler() {
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

  const handleChangeSido = useCallback((v: RegionItem) => {
    setCurrentSelectedSido(v);
    setCurrentSelectedSigungu(null);
    setCurrentSelectedEubmyeondong(null);
  }, []);

  const handleChangeSigungu = useCallback((v: RegionItem) => {
    setCurrentSelectedSigungu(v);
    setCurrentSelectedEubmyeondong(null);
  }, []);

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

  const handleChangeEubmyeondong = useCallback(
    (v: RegionItem) => {
      if (selectedRegions.length === 5) {
        toast.error('지역은 5개까지 선택 가능합니다');
        return;
      }

      if (currentSelectedSido && currentSelectedSigungu) {
        const item = {
          name: `${currentSelectedSido.name} ${currentSelectedSigungu.name} ${v.name}`,
          code: v.code,
        };

        const isExistedSelectedRegion = !!selectedRegions.filter((ele) => ele.name === item.name).length;

        if (isExistedSelectedRegion) {
          toast.error('이미 추가하신 지역입니다.');
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
    [currentSelectedSido, currentSelectedSigungu, selectedRegions],
  );

  const handleRemoveSelectedRegionItem = useCallback(
    (v: RegionItem) => {
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
