/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import useSessionStorage from '@/hooks/useSessionStorage';

import { getListingMapLevelByZoom, getZoomByMeters } from '@/utils/map';

import { SchoolType } from '@/constants/enums';

import { SchoolsListItem } from '@/services/danji/types';

import { useFetchDanjiMapSchools } from '@/services/danji/useFetchDanjiMapSchools';

import { apiService } from '@/services';

type Props = {
  lng?: number;
  lat?: number;
  danjiID?: number;
  rt?: number;
};

export default function useDanjiSchoolMapCardMobile({ lng, lat, danjiID, rt }: Props) {
  const schoolRef = useRef<HTMLDivElement>(null);
  const listRefs = useRef<any>([]);

  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [polygon, setPolygon] = useState<naver.maps.Polygon[]>([]); // 학구도 폴리곤
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>();

  const { danjiSchoolID, makeDanjiSchoolID } = useMobileDanjiInteraction();

  const [schoolType, setSchoolType] = useSessionStorage(
    'danji-selected-school',
    sessionStorage.getItem('danji-selected-school'),
  );

  const { list, isLoading } = useFetchDanjiMapSchools({
    schoolTypes: Number(schoolType) ? Number(schoolType).toString() : undefined,
    danjiId: danjiID || undefined,
    realestateType: rt || undefined,
  });

  const renderPolygon = useCallback(
    async (m: naver.maps.Map | null, schoolId: string) => {
      if (!m) return;

      const res = await apiService.mapHakgudo(schoolId);

      const polygonsArr: any[] = [];
      const multiPolygon = res?.list;

      multiPolygon?.forEach((item: any) => {
        const polyArr: any[] = [];
        const polygons = JSON.parse(item.polygons as string)?.coordinates[0];

        polygons[0].forEach((v: any) => {
          polyArr.push(new naver.maps.LatLng(v[1], v[0]));
        });

        const poly = new naver.maps.Polygon({
          map: m,
          paths: polyArr,
          fillColor: '#FF6D41',
          fillOpacity: 0.15,
          strokeColor: '#F34829',
          strokeOpacity: 1,
          strokeWeight: 2,
          zIndex: 0,
        });
        polygonsArr.push(poly);
      });

      setPolygon(polygonsArr);
    },
    [selectedSchoolId],
  );

  const removePolygon = useCallback(() => {
    if (!polygon) return;
    polygon.forEach((v: naver.maps.Polygon) => {
      v.setMap(null);
    });
    setPolygon([]);
  }, [polygon]);

  const onClickSchoolMarker = (marker: Omit<SchoolsListItem, 'distance_in_km'>, index: number) => {
    if (!map) return;

    if (selectedSchoolId === marker.school_id) return; // 같은 학교를 계속 클릭했을 때

    removePolygon();
    renderPolygon(map, marker.school_id);
    setSelectedSchoolId(marker.school_id);

    if (listRefs) {
      listRefs.current[index].scrollIntoView(true);
    }

    if (marker.school_type === '초등학교') {
      setSchoolType(SchoolType.ElementarySchool.toString());
    }
    if (marker.school_type === '중학교') {
      setSchoolType(SchoolType.MiddleSchool.toString());
    }
    if (marker.school_type === '고등학교') {
      setSchoolType(SchoolType.HighSchool.toString());
    }

    map.panTo(new naver.maps.LatLng(marker.lat, marker.long), {
      easing: 'easeOutCubic',
      duration: 500,
    });
  };

  const onClickSchoolButton = (parmas: SchoolType) => {
    setSelectedSchoolId(undefined);
    removePolygon();

    if (!schoolType) {
      setSchoolType(parmas.toString());
      if (parmas === SchoolType.ElementarySchool) {
        if (map && lat && lng) {
          map.morph({ lat: +lat, lng: +lng }, 15);
        }
      }
      if (parmas === SchoolType.MiddleSchool) {
        if (map && lat && lng) {
          map.morph({ lat: +lat, lng: +lng }, 14);
        }
      }
      if (parmas === SchoolType.HighSchool) {
        if (map && lat && lng) {
          map.morph({ lat: +lat, lng: +lng }, 13);
        }
      }
    } else {
      const schoolTypeArr = schoolType.split(',');

      if (schoolType.includes(parmas.toString())) {
        setSchoolType(schoolTypeArr.filter((ele) => ele !== parmas.toString()).join());
      } else {
        setSchoolType(parmas.toString());

        if (parmas === SchoolType.ElementarySchool) {
          if (map && lat && lng) {
            map.morph({ lat: +lat, lng: +lng }, 15);
          }
        }
        if (parmas === SchoolType.MiddleSchool) {
          if (map && lat && lng) {
            map.morph({ lat: +lat, lng: +lng }, 14);
          }
        }
        if (parmas === SchoolType.HighSchool) {
          if (map && lat && lng) {
            map.morph({ lat: +lat, lng: +lng }, 13);
          }
        }
      }
    }
  };

  const onZoomChanged = () => {
    if (!map) return;
    const mapLevel = getListingMapLevelByZoom(map.getZoom());

    if (mapLevel > 4) {
      removePolygon();
    }
  };

  const minZoom = useMemo(() => getZoomByMeters(20000), []);
  const maxZoom = useMemo(() => getZoomByMeters(20), []);

  const onCreate = useCallback(
    (m: naver.maps.Map) => {
      if (!lat) return;
      if (!lng) return;

      setMap(m);

      if (schoolType && schoolType.includes(SchoolType.ElementarySchool.toString())) {
        m.morph({ lat: +lat, lng: +lng }, 15);
        return;
      }

      if (schoolType && schoolType.includes(SchoolType.MiddleSchool.toString())) {
        m.morph({ lat: +lat, lng: +lng }, 14);
        return;
      }

      if (schoolType && schoolType.includes(SchoolType.HighSchool.toString())) {
        m.morph({ lat: +lat, lng: +lng }, 13);
      }
    },
    [lng, lat],
  );

  const center = useMemo(() => {
    if (!lat) return;
    if (!lng) return;

    return {
      lat: +lat,
      lng: +lng,
    };
  }, [lng, lat]);

  const getDistance = (val: number | undefined) => {
    if (val) {
      const result = val * 1000;

      return result > 1000
        ? `${val.toFixed(1)[2] === '0' ? val.toFixed(0) : val.toFixed(1)}km`
        : `${(val * 1000).toFixed(0)}m`;
    }

    return '-';
  };

  const convertSchoolType = (type: string) => {
    if (type === '초등학교') return 'elementary';
    if (type === '중학교') return 'middle';
    if (type === '고등학교') return 'high';
    return '';
  };

  const convertSchoolName = (type: string, name: string) => {
    if (type === '초등학교') return name.replace('등학교', '');
    if (type === '중학교') return name.replace('학교', '');
    if (type === '고등학교') return name.replace('등학교', '');
    return '';
  };

  const onClickMap = () => {
    setSelectedSchoolId(undefined);
    removePolygon();
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleClickSchoolListItem = (id: string, lat: number, lng: number) => {
    setSelectedSchoolId(id);
    removePolygon();
    renderPolygon(map, id);

    if (map) {
      map.panTo(new naver.maps.LatLng(lat, lng), {
        easing: 'easeOutCubic',
        duration: 500,
      });
    }
  };

  useEffect(() => {
    if (map && schoolRef) {
      const header = document.getElementById('negocio-header');

      if (header && schoolRef?.current) {
        const footerHeight = window.innerHeight - schoolRef.current.offsetTop;

        const mapHeight = window.innerHeight - header.offsetHeight - footerHeight;

        const mapWidth = header.offsetWidth;
        map.setSize({ width: mapWidth, height: mapHeight });
      }
    }
  }, [map, schoolRef]);

  useEffect(() => {
    async function init() {
      if (danjiSchoolID && map) {
        await setSelectedSchoolId(danjiSchoolID);
        setTimeout(() => renderPolygon(map, danjiSchoolID), 500);

        if (listRefs?.current) {
          const index = list.findIndex((ele) => ele.school_id === danjiSchoolID);
          const initialSchool = list.find((ele) => ele.school_id === danjiSchoolID);

          setTimeout(() => listRefs.current[index].scrollIntoView(true), 500);

          if (index && initialSchool) {
            map.panTo(new naver.maps.LatLng(initialSchool?.lat, initialSchool?.long), {
              easing: 'easeOutCubic',
              duration: 500,
            });
          }
        }
      }
    }

    init();
  }, [danjiSchoolID, map, listRefs?.current]);

  useEffect(
    () => () => {
      makeDanjiSchoolID(undefined);
      setSelectedSchoolId(undefined);
      removePolygon();
    },
    [],
  );

  return {
    schoolRef,
    listRefs,

    isLoading,

    center,
    minZoom,
    maxZoom,

    list,
    selectedSchoolId,
    schoolType,

    convertSchoolName,
    convertSchoolType,
    getDistance,
    onClickSchoolMarker,
    onClickSchoolButton,
    onClickMap,
    onCreate,
    onZoomChanged,

    handleClickSchoolListItem,
  };
}
