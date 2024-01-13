/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Button } from '@/components/atoms';

import DeferredRender from '@/components/atoms/DeferredRender';

import { MobSchoolMarker } from '@/components/organisms';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import useSessionStorage from '@/hooks/useSessionStorage';

import { getListingMapLevelByZoom, getZoomByMeters } from '@/utils/map';

import { NaverMapV1 } from '@/lib/navermapV1';

import CustomOverlayV1 from '@/lib/navermap/components/CustomOverlayV1';

import getHakgudo from '@/apis/map/mapHakgudos';

import { useAPI_DanjiMapSchools } from '@/apis/danji/danjiMapSchools';

import { SchoolType } from '@/constants/enums';

import MapMarkerSearchItem from '@/assets/icons/mob_map_danji_pin.svg';

type GetSchoolResponse = {
  school_name: string;
  school_id: string;
  long: number;
  lat: number;
  school_type: string;
};

const Stack = styled('div')({});

const Typography = styled('p')({});

const BottomSheetContent = styled(Stack)({
  overflowY: 'auto',
  overflowX: 'hidden',
  WebkitOverflowScrolling: 'touch',
  minHeight: '105px',

  '&::-webkit-scrollbar': {
    width: '16px',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: '11px',
    border: '6px solid transparent',
    background: '#999999',
    backgroundClip: 'padding-box',
    minHeight: '50%',
  },
});

export default function DanjiSchoolMapCard({
  lng,
  lat,
  danjiID,
  rt,
}: {
  lng?: number;
  lat?: number;
  danjiID?: number;
  rt?: number;
}) {
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

  const { list, isLoading } = useAPI_DanjiMapSchools({
    schoolTypes: Number(schoolType) ? Number(schoolType).toString() : undefined,
    danjiId: danjiID || undefined,
    realestateType: rt || undefined,
  });

  const renderPolygon = useCallback(
    async (m: naver.maps.Map | null, schoolId: string) => {
      if (!m) return;

      const res = await getHakgudo(schoolId);

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

  const onClickSchoolMarker = (marker: GetSchoolResponse, index: number) => {
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

  if (!lat || !lng) return null;

  return (
    <>
      <div tw="relative flex-1 w-full">
        <NaverMapV1
          center={center}
          onCreate={onCreate}
          onZoomChanged={onZoomChanged}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onClickMap={() => {
            setSelectedSchoolId(undefined);
            removePolygon();
          }}
          style={{ width: '100%', height: '100%' }}
        >
          {list.length > 0 &&
            list.map((item, index) => (
              <DeferredRender key={`${item.school_id}${item.school_type}${item.lat}${item.long}`}>
                <CustomOverlayV1
                  key={`${item.school_id}${item.school_type}${item.lat}${item.long}`}
                  anchor="bottom-left"
                  position={{
                    lat: +item.lat,
                    lng: +item.long,
                  }}
                  zIndex={item.school_id === selectedSchoolId ? 40 : 20}
                >
                  <MobSchoolMarker
                    type={convertSchoolType(item.school_type)}
                    name={convertSchoolName(item.school_type, item.school_name)}
                    onClick={() => onClickSchoolMarker(item, index)}
                    selected={item.school_id === selectedSchoolId}
                  />
                </CustomOverlayV1>
              </DeferredRender>
            ))}

          <DeferredRender key={`${lat}${lng}`}>
            <CustomOverlayV1
              key="map-marker"
              position={{
                lat: +lat,
                lng: +lng,
              }}
              tw="relative"
              zIndex={30}
            >
              <MapMarkerSearchItem style={{ width: '32px', height: '32px', opacity: 0.9 }} tw="animate-bounce" />
              <div tw="w-8 h-[11px] absolute bottom-0 bg-nego-1000 opacity-20 [border-radius: 50%]" />
            </CustomOverlayV1>
          </DeferredRender>
        </NaverMapV1>
      </div>
      <Stack
        ref={schoolRef}
        tw="w-full"
        style={{
          paddingTop: '16px',
          paddingLeft: '20px',
          paddingRight: '20px',
          width: '100%',
          backgroundColor: 'white',
          zIndex: 150,
          borderTopLeftRadius: '2rem',
          borderTopRightRadius: '2rem',
        }}
      >
        <Stack tw="flex flex-row gap-2 mb-5">
          <Button
            variant="outlined"
            size="medium"
            tw="[border-radius: 22px] [scroll-snap-align: center] whitespace-nowrap"
            onClick={() => onClickSchoolButton(SchoolType.ElementarySchool)}
            selected={schoolType ? schoolType.includes(SchoolType.ElementarySchool.toString()) : false}
          >
            초등학교
          </Button>
          <Button
            variant="outlined"
            size="medium"
            tw="[border-radius: 22px] [scroll-snap-align: center] whitespace-nowrap"
            onClick={() => onClickSchoolButton(SchoolType.MiddleSchool)}
            selected={schoolType ? schoolType.includes(SchoolType.MiddleSchool.toString()) : false}
          >
            중학교
          </Button>
          <Button
            variant="outlined"
            size="medium"
            tw="[border-radius: 22px] [scroll-snap-align: center] whitespace-nowrap"
            onClick={() => onClickSchoolButton(SchoolType.HighSchool)}
            selected={schoolType ? schoolType.includes(SchoolType.HighSchool.toString()) : false}
          >
            고등학교
          </Button>
        </Stack>
        <BottomSheetContent tw="[margin-bottom: 43px]">
          {isLoading && <div style={{ minHeight: '136px', maxHeight: '136px' }} />}
          {!isLoading && list && list.length === 0 && schoolType && (
            <Typography tw="min-w-full [min-height: 136px] [max-height: 136px] text-b2 [line-height: 20px] text-gray-300 [text-align: center]">
              주변에 학교가 없습니다.
            </Typography>
          )}
          {!isLoading && !schoolType && (
            <Typography tw="min-w-full [min-height: 136px] [max-height: 136px] text-b2 [line-height: 20px] text-gray-300 [text-align: center]">
              학교타입을 선택해 주세요.
            </Typography>
          )}
          {list && list.length > 0 && (
            <div className="danji-around-school-list-wrraper" style={{ minHeight: '13.6rem', maxHeight: '13.6rem' }}>
              {list.map((item, index) => (
                <Stack
                  tw="flex flex-row items-center"
                  id={item.school_id}
                  key={item.school_id}
                  ref={(element) => {
                    listRefs.current[index] = element;
                  }}
                  onClick={() => {
                    if (listRefs) {
                      listRefs.current[index].scrollIntoView(true);
                    }
                    setSelectedSchoolId(item.school_id);
                    removePolygon();
                    renderPolygon(map, item.school_id);
                    if (map) {
                      map.panTo(new naver.maps.LatLng(item.lat, item.long), {
                        easing: 'easeOutCubic',
                        duration: 500,
                      });
                    }
                  }}
                  style={
                    index === 0
                      ? selectedSchoolId === item.school_id
                        ? {
                            borderTop: '1px solid  #E4E4EF',
                            borderBottom: '1px solid  #E4E4EF',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            background: '#F1EEFF',
                            cursor: 'pointer',
                          }
                        : {
                            borderTop: '1px solid  #E4E4EF',
                            borderBottom: '1px solid  #E4E4EF',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            cursor: 'pointer',
                          }
                      : selectedSchoolId === item.school_id
                      ? {
                          borderBottom: '1px solid  #E4E4EF',
                          paddingTop: '8px',
                          paddingBottom: '8px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          background: '#F1EEFF',
                          cursor: 'pointer',
                        }
                      : {
                          borderBottom: '1px solid  #E4E4EF',
                          paddingTop: '8px',
                          paddingBottom: '8px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          cursor: 'pointer',
                        }
                  }
                >
                  <Typography tw="text-b2 [line-height: 20px] text-gray-1000 ml-1">{item.school_name}</Typography>
                  <Typography tw="text-b2 [line-height: 20px] text-gray-1000 ml-auto">
                    {getDistance(item.distance_in_km)}
                  </Typography>
                </Stack>
              ))}
            </div>
          )}
        </BottomSheetContent>
      </Stack>
    </>
  );
}
