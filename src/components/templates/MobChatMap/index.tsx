/* eslint-disable no-plusplus */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationHeader } from '@/components/molecules';
import { useChatButtonStore } from '@/states/mob/chatButtonStore';
import CloseIcon from '@/assets/icons/close_18.svg';
import { Button } from '@/components/atoms';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { getZoomByMeters } from '@/utils/map';
import { NaverMapV1 } from '@/lib/navermapV1';
import { toast } from 'react-toastify';
import MapMarkerSearchItem from '@/assets/icons/mob_map_danji_pin.svg';
import CustomOverlayV1 from '@/lib/navermap/components/CustomOverlayV1';

const DEFAULT_LAT = 37.3945005; // 판교역
const DEFAULT_LNG = 127.1109415;

function hasArea(area: any) {
  return !!(area && area?.name && area?.name !== '');
}

function hasData(data: any) {
  return !!(data && data !== '');
}

function checkLastString(word: any, lastString: any) {
  return new RegExp(`${lastString}$`).test(word);
}

function hasAddition(addition: any) {
  return !!(addition && addition?.value);
}

export default function MobChatMap() {
  const { makeShowChat, makeShowLatLng, makeURL } = useChatButtonStore();

  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const onCreate = useCallback((m: naver.maps.Map) => {
    setMap(m);

    if (lat && lng) {
      m.morph({ lat: +lat, lng: +lng }, 16);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const minZoom = useMemo(() => getZoomByMeters(20000), []);
  const maxZoom = useMemo(() => getZoomByMeters(5), []);

  const center = useMemo(
    () => ({
      lat: +DEFAULT_LAT,
      lng: +DEFAULT_LNG,
    }),
    [],
  );

  const morphToCurrentLocation = useCallback(() => {
    setIsGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latlng = { lat: coords.latitude, lng: coords.longitude };

        setLat(latlng.lat);
        setLng(latlng.lng);
        setIsGeoLoading(false);
      },
      () => {
        toast.error('위치정보 접근이 허용되어있지 않습니다.');
        setLat(DEFAULT_LAT);
        setLng(DEFAULT_LNG);
        setIsGeoLoading(false);
      },
    );
  }, []);

  function makeAddress(item: any) {
    if (!item) {
      return;
    }

    const name = item?.name;
    const region = item?.region;
    const land = item?.land;
    const isRoadAddress = name === 'roadaddr';

    let sidoVal = '';
    let sigugunVal = '';
    let dongmyunVal = '';
    let riVal = '';
    let restVal = '';

    if (hasArea(region?.area1)) {
      sidoVal = region.area1.name;
    }

    if (hasArea(region?.area2)) {
      sigugunVal = region.area2.name;
    }

    if (hasArea(region?.area3)) {
      dongmyunVal = region.area3.name;
    }

    if (hasArea(region?.area4)) {
      riVal = region.area4.name;
    }

    if (land) {
      if (hasData(land?.number1)) {
        if (hasData(land?.type) && land.type === '2') {
          restVal += '산';
        }

        restVal += land.number1;

        if (hasData(land.number2)) {
          restVal += `-${land.number2}`;
        }
      }

      if (isRoadAddress === true) {
        if (checkLastString(dongmyunVal, '면')) {
          riVal = land.name;
        } else {
          dongmyunVal = land.name;
          riVal = '';
        }

        if (hasAddition(land.addition0)) {
          restVal += ` ${land.addition0.value}`;
        }
      }
    }

    const result = [sidoVal, sigugunVal, dongmyunVal, riVal, restVal].join(' ');
    return result;
  }

  function searchAddressToCoordinate(address?: string, val1?: string, val2?: string, val3?: string, val4?: string) {
    if (!address) return;

    naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          return toast.error('네이버 지도 서비스 에러');
        }

        if (response.v2.meta.totalCount === 0) {
          return toast.error(`검색 결과가 없습니다.`);
        }

        const item = response.v2?.addresses[0]?.addressElements?.filter((ele) => ele.types[0] === 'LAND_NUMBER');

        const jibun = item[0].longName || item[0].shortName;

        let mapUrl = '';

        if (val4) {
          mapUrl = `https://map.naver.com/v5/entry/address/${lng},${lat},${val1}%20${val2}%20${val3}%20${val4}%20${jibun},jibun?c=19,0,0,0,dh`;
        } else {
          mapUrl = `https://map.naver.com/v5/entry/address/${lng},${lat},${val1}%20${val2}%20${val3}%20${jibun},jibun?c=19,0,0,0,dh`;
        }

        makeURL(mapUrl);
      },
    );
  }

  function searchCoordinateToAddress(latlng: naver.maps.LatLng) {
    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(','),
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          return toast.error('네이버 지도 서비스 에러');
        }

        const item = response.v2.results[0] ? response?.v2?.results[0] : response?.v2?.results[1];

        const sidoValue = item?.region?.area1?.name || '';
        const sigunguValue = item?.region?.area2?.name || '';
        const eubmyeondongValue = item?.region?.area3?.name || '';
        const riValue = item?.region?.area4?.name || '';

        if (makeAddress(item)) {
          searchAddressToCoordinate(makeAddress(item), sidoValue, sigunguValue, eubmyeondongValue, riValue);
        }
      },
    );
  }

  const shareMapLink = () => {
    if (!map) return;

    if (lat && lng) {
      searchCoordinateToAddress(new naver.maps.LatLng(lat, lng));
    }
  };

  useEffect(() => {
    if (map) {
      morphToCurrentLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const clickListener = naver.maps.Event.addListener(map, 'click', (e) => {
      const latlng = e.coord;

      setLng(latlng.lng());
      setLat(latlng.lat());
    });

    const idleListener = naver.maps.Event.addListener(map, 'idle', () => {
      const c = map.getCenter();

      setLng(c.x);
      setLat(c.y);
    });

    return () => {
      naver.maps?.Event.removeListener(idleListener);
      naver.maps?.Event.removeListener(clickListener);
    };
  }, [map]);

  return (
    <div tw="flex flex-col w-full max-w-mobile h-full">
      <NavigationHeader>
        <NavigationHeader.Title>장소공유</NavigationHeader.Title>
        <Button
          variant="ghost"
          tw="p-0"
          onClick={() => {
            makeURL(undefined);
            makeShowLatLng(undefined, undefined);
            makeShowChat();
          }}
        >
          <CloseIcon />
        </Button>
      </NavigationHeader>

      <div tw="relative flex-1 w-full max-w-mobile">
        <NaverMapV1
          id="negocio-chat-map"
          onCreate={onCreate}
          minZoom={minZoom}
          maxZoom={maxZoom}
          center={center}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {lat && lng && (
            <CustomOverlayV1
              position={{
                lat,
                lng,
              }}
            >
              <MapMarkerSearchItem style={{ width: '48px', height: '48px' }} />
            </CustomOverlayV1>
          )}
        </NaverMapV1>
        <div tw="w-full absolute bottom-0 px-5 py-10">
          <Button
            tw="w-full"
            onClick={() => {
              shareMapLink();
              makeShowLatLng(lat, lng);
              makeShowChat();
            }}
          >
            장소 공유
          </Button>
        </div>
      </div>
    </div>
  );
}
