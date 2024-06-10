/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useState, useMemo, useEffect } from 'react';

import cloneDeep from 'lodash/cloneDeep';

import { convertedArr, convertedArrForMarker } from '@/utils/danjiAroundInfo';

import { SearchCategoryResponse, searchCategoryGroup } from '@/lib/kakao/search_category';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';

import { DanjiDetailResponse } from '@/services/danji/types';

import { commonStyle } from '../widget/DanjiAroundDetailMobileWidget';

import { BtnState } from '../types';

export default function useDanjiAroundDetailMobileHandler({
  danji,
  danjiAddress,
  danjiPlace,
  danjiAroundDetailDefault,
}: {
  danji?: DanjiDetailResponse;
  danjiAddress?: string;
  danjiPlace?: string;
  danjiAroundDetailDefault: keyof BtnState;
}) {
  const sheet = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<naver.maps.Map | null | undefined>(null);

  const [activeIndex, setActiveIndex] = useState<number>();

  const [catergoryList, setCategoryList] = useState<SearchCategoryResponse['documents']>([]);

  const [markers, setMarkers] = useState<SearchCategoryResponse['documents']>([]);

  const [update, setUpdate] = useState(false);

  const [nodata, setNodata] = useState<boolean>();

  const [activeCategory, setActiveCategory] = useState<BtnState>({});

  const [addressName, setAddressName] = useState<string>('');

  const [placeName, setPlaceName] = useState<string>('');

  const [tableIndex, setTableIndex] = useState<number>();

  const [isClick, setIsClick] = useState<boolean>(false);

  const [selectedSubwayMarker, setSelectedSubwayMarker] = useState<string>();

  const convertedCategory = useMemo(() => {
    if (activeCategory.SW8)
      return convertedArr([...catergoryList].sort((a, b) => Number(a.distance) - Number(b.distance)));

    return [...catergoryList].sort((a, b) => Number(a.distance) - Number(b.distance));
  }, [update, activeCategory]);

  const convertedMarker = useMemo(() => {
    if (activeCategory.SW8) {
      return markers;
    }
    return convertedArrForMarker([...markers]);
  }, [update, activeCategory]);

  const handleAddressName = (val: string) => {
    setAddressName(val);
    setTableIndex(undefined);
    setIsClick(true);
  };

  const handlePlaceName = (val: string) => {
    setPlaceName(val);
  };

  const handleSelectedSubwayMarker = (val?: string) => {
    setSelectedSubwayMarker(val);
  };

  const getStylingFuction = (plName: string, adName: string, index: number) => {
    if (typeof tableIndex === 'number') {
      if (index === 0 && index === tableIndex) {
        return {
          ...commonStyle,
          background: '#F1EEFF',
          borderTop: '1px solid #E4E4EF',
        };
      }

      if (index !== 0 && index === tableIndex) {
        return {
          ...commonStyle,
          background: '#F1EEFF',
        };
      }

      return {
        ...commonStyle,
      };
    }

    if (placeName === plName && typeof tableIndex !== 'number') {
      return {
        ...commonStyle,
        background: '#F1EEFF',
      };
    }

    if (addressName === adName && typeof tableIndex !== 'number') {
      return {
        ...commonStyle,
        background: '#F1EEFF',
      };
    }

    if (index === 0) {
      return {
        ...commonStyle,
        borderTop: '1px solid #E4E4EF',
      };
    }

    return {
      ...commonStyle,
    };
  };

  useEffect(() => {
    if (map && sheet) {
      const header = document.getElementById('negocio-header');

      if (header && sheet?.current) {
        const footerHeight = window.innerHeight - sheet.current.offsetTop;
        const mapHeight = window.innerHeight - header.offsetHeight - footerHeight;
        const mapWidth = header.offsetWidth;
        map.setSize({ width: mapWidth, height: mapHeight });
      }
    }
  }, [map, sheet]);

  useEffect(() => {
    if (danjiAddress && danjiPlace) {
      setAddressName(danjiAddress);
      setPlaceName(danjiPlace);
      setIsClick(true);
    }
  }, [danjiAddress, danjiPlace]);

  useEffect(() => {
    setActiveCategory({ [danjiAroundDetailDefault]: true });

    if (danjiAroundDetailDefault === 'SW8') {
      setActiveIndex(0);
    }
    if (danjiAroundDetailDefault === 'HP8') {
      setActiveIndex(1);
    }

    if (danjiAroundDetailDefault === 'MT1') {
      setActiveIndex(2);
    }
    if (danjiAroundDetailDefault === 'CS2') {
      setActiveIndex(3);
    }
    if (danjiAroundDetailDefault === 'BK9') {
      setActiveIndex(4);
    }
    if (danjiAroundDetailDefault === 'PO3') {
      setActiveIndex(5);
    }
  }, [danjiAroundDetailDefault]);

  useEffect(() => {
    let page = 1;

    async function getPlaceData({ x, y, p }: { x?: string; y?: string; p: number }) {
      const response = await searchCategoryGroup({
        category_group_code: Object.keys(activeCategory)[0],
        x,
        y,
        radius: 1000,
        size: 15,
        page: p,
      });

      if (!danji?.lat || !danji?.long) return;

      if (response && response.documents.length === 0) {
        setCategoryList([]);
        setMarkers([]);
        setNodata(true);
        return;
      }

      if (response && response?.documents) {
        setNodata(false);
        const copiedResData = cloneDeep(response.documents);
        const copiedResMarkerData = cloneDeep(response.documents);

        const convertedResData = copiedResData.map((item) => {
          if (item.category_group_code === KakaoMapCategoryCode.SUBWAY) {
            return {
              ...item,
              category_name: item.category_name
                ? item.category_name
                    .replaceAll(/\s/gi, '')
                    .slice(item.category_name.replaceAll(/\s/gi, '').lastIndexOf('>') + 1)
                : item.category_name,
              place_name: item.place_name.indexOf(' ')
                ? item.place_name.slice(0, item.place_name.indexOf(' '))
                : item.place_name,
            };
          }
          return item;
        });

        setCategoryList((prev) => [...prev, ...convertedResData]);
        setMarkers((prev) => [...prev, ...copiedResMarkerData]);
      }

      if (response && !response?.meta.is_end) {
        getPlaceData({
          x: danji.long.toString(),
          y: danji.lat.toString(),
          p: (page += 1),
        });
      }

      if (response && response?.meta.is_end) {
        getPlaceData({
          x: danji.long.toString(),
          y: danji.lat.toString(),
          p: 0,
        });
        setUpdate(true);
      }
    }

    getPlaceData({
      x: danji?.long.toString(),
      y: danji?.lat.toString(),
      p: 1,
    });

    return () => {
      setUpdate(false);
    };
  }, [activeCategory, danji]);

  return {
    sheet,

    map,
    setMap,

    activeIndex,
    setActiveIndex,

    catergoryList,
    setCategoryList,

    activeCategory,
    setActiveCategory,

    setMarkers,

    nodata,

    addressName,
    setAddressName,

    placeName,
    setPlaceName,

    tableIndex,
    setTableIndex,

    isClick,
    setIsClick,

    selectedSubwayMarker,
    setSelectedSubwayMarker,

    convertedMarker,
    convertedCategory,

    handleAddressName,
    handlePlaceName,
    handleSelectedSubwayMarker,

    getStylingFuction,
  };
}
