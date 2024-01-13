/* eslint-disable react-hooks/exhaustive-deps */

import { motion } from 'framer-motion';
import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useMemo, useRef, useState, MouseEvent } from 'react';
import { NavigationHeader } from '@/components/molecules';
import CloseIcon from '@/assets/icons/close_18.svg';
import { Button } from '@/components/atoms';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';
import { convertedArr, convertedArrForMarker, getAverageDistance } from '@/hooks/utils/aroundInfo';
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { searchCategoryGroup, SearchCategoryResponse } from '@/lib/kakao/search_category';
import ConvertArrayToSubwayComponent from '@/components/organisms/MobDanjiDetail/SubwayFormatComponent';
import { styled } from 'twin.macro';
import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';
import DanjiAroundMapCard from './DanjiAroundMapCard';

const commonStyle = {
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
  borderBottom: '1px solid #E4E4EF',
};

type BtnState = {
  SW8?: boolean;
  HP8?: boolean;
  MT1?: boolean;
  CS2?: boolean;
  BK9?: boolean;
  PO3?: boolean;
};

const ButtonsWrraper = styled.div`
  display: 'flex';
  align-items: 'center';
  column-gap: '8px';
  padding-top: 16px;
  padding-bottom: 16px;
  overflow-x: scroll;
  z-index: 130;
  -webkit-overflow-scrolling: touch;
  padding-right: 1px;
`;

const buttonList: { id: keyof BtnState; korTitle: string }[] = [
  { id: 'SW8', korTitle: '지하철' },
  { id: 'HP8', korTitle: '병원' },
  { id: 'MT1', korTitle: '마트' },
  { id: 'CS2', korTitle: '편의점' },
  { id: 'BK9', korTitle: '은행' },
  { id: 'PO3', korTitle: '관공서' },
];

const Wrapper = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  left: 'auto',
  right: 'auto',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  background: 'white',
  transition: 'transform 300ms ease-out' /* 바텀시트 애니메이션 속도 */,
  margin: 'auto',
});

const BottomSheetContent = styled('div')({
  overflow: ' auto',
  WebkitOverflowScrolling: 'touch',
  minHeight: '105px',
  marginBottom: '43px',
  paddingLeft: '20px',
  paddingRight: '21px',
  marginTop: '16px',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const Stack = styled('div')({});

export default function DanjiAroundDetail({ danji }: { danji?: GetDanjiDetailResponse }) {
  const {
    makeFalseAround,
    makeBindDanji,
    danjiAroundDetailDefault,
    makeDanjiAroundDetailDefault,
    danjiAddress,
    danjiPlace,
    danjiAroundLat,
    danjiAroundLng,
    makeDanjiAroundAddress,
    makeDanjiAroundPlace,
    makeDanjiAroundLatLng,
  } = useMobileDanjiInteraction();

  const [map, setMap] = useState<naver.maps.Map | null | undefined>(null);

  const sheet = useRef<HTMLDivElement>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<any>([]);
  const listRefs = useRef<any>([]);

  const [activeIndex, setActiveIndex] = useState<number>();

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDrag) return;

    if (isDrag && scrollRef.current && startX) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

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

  const onClickCategory = async (id: keyof BtnState, index: number) => {
    setActiveIndex(index);

    if (id === Object.keys(activeCategory)[0]) return;

    setActiveCategory(() => ({ [id]: true }));
    setCategoryList([]);
    setMarkers([]);
    setTableIndex(undefined);
    setAddressName('');
    setPlaceName('');
    setSelectedSubwayMarker('');
    makeDanjiAroundAddress('');
    makeDanjiAroundPlace('');
  };

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
    if (danjiAddress && danjiPlace) {
      setAddressName(danjiAddress);
      setPlaceName(danjiPlace);
      setIsClick(true);
    }
  }, [danjiAddress, danjiPlace]);

  useEffect(() => {
    if (listRefs?.current && typeof tableIndex === 'number') {
      if (tableIndex >= 0) {
        listRefs.current[tableIndex].scrollIntoView(true);
      }
    }
  }, [isClick, listRefs?.current, addressName, tableIndex]);

  useEffect(() => {
    if (placeName && listRefs?.current) {
      const firstIndex = convertedCategory.findIndex((item) => item.place_name === placeName);
      if (firstIndex >= 0) {
        listRefs.current[firstIndex].scrollIntoView(true);
        return;
      }
    }

    if (addressName && listRefs?.current) {
      const firstIndex = convertedCategory.findIndex((item) => item.address_name === addressName);
      if (firstIndex >= 0) {
        listRefs.current[firstIndex].scrollIntoView(true);
      }
    }
  }, [addressName, placeName, listRefs?.current, convertedCategory]);

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
    if (activeIndex) {
      const selectedElement = refs.current[activeIndex];

      if (scrollRef.current && selectedElement) {
        const { offsetLeft } = scrollRef.current;
        const { offsetLeft: childOffsetLeft, offsetWidth } = selectedElement;
        scrollRef.current.scrollLeft =
          childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;
      }
    }
  }, [activeIndex]);

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

  useEffect(
    () => () => {
      makeFalseAround();
      makeBindDanji(undefined);
      makeDanjiAroundDetailDefault('HP8');
      setIsClick(false);
      setTableIndex(undefined);
      setAddressName('');
      setPlaceName('');
      makeDanjiAroundAddress('');
      makeDanjiAroundPlace('');
      makeDanjiAroundLatLng(undefined, undefined);
      setSelectedSubwayMarker('');
    },
    [],
  );

  return (
    <div tw="flex flex-col w-full h-full">
      <NavigationHeader>
        <NavigationHeader.Title>교통 및 주변정보</NavigationHeader.Title>
        <Button
          variant="ghost"
          tw="p-0"
          onClick={() => {
            makeFalseAround();
            makeBindDanji(undefined);
          }}
        >
          <CloseIcon />
        </Button>
      </NavigationHeader>

      <div tw="relative flex-1 w-full">
        <DanjiAroundMapCard
          activeIndex={activeIndex}
          aroundList={convertedMarker}
          addressName={addressName}
          isCircle
          danji={danji}
          setM={setMap}
          handleAddressName={handleAddressName}
          handlePlaceName={handlePlaceName}
          handleSelectedSubwayMarker={handleSelectedSubwayMarker}
          selectedSubwayMarker={selectedSubwayMarker}
          placeName={placeName}
          defaultMapSize="100%"
          danjiAroundLat={danjiAroundLat}
          danjiAroundLng={danjiAroundLng}
        />
      </div>

      <Wrapper tw="w-full" style={{ zIndex: 131 }} ref={sheet}>
        <Stack
          id="negocio-footer"
          style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ButtonsWrraper
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '8px',
              paddingTop: '16px',
              paddingBottom: '16px',
              overflowX: 'scroll',
              zIndex: 130,
              WebkitOverflowScrolling: 'touch',
              paddingRight: '1px',
            }}
          >
            {buttonList.map((item, index) => (
              <Button
                variant="outlined"
                size="medium"
                key={item.id}
                id={item.id}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                tw="[border-radius: 22px] [scroll-snap-align: center] whitespace-nowrap"
                onClick={() => onClickCategory(item.id, index)}
                selected={activeCategory[item.id]}
              >
                {item.korTitle}
              </Button>
            ))}
          </ButtonsWrraper>
        </Stack>

        <BottomSheetContent>
          {catergoryList.length === 0 &&
            (nodata ? (
              <p
                tw="text-gray-700 text-b2 [line-height: 20px]"
                style={{ minHeight: '105px', maxHeight: '105px', zIndex: 131, textAlign: 'center' }}
              >
                다른 주변 정보를 확인해 보세요.
              </p>
            ) : (
              <p
                tw="text-gray-700 text-b2 [line-height: 20px]"
                style={{ minWidth: '100%', minHeight: '105px', maxHeight: '105px' }}
              />
            ))}
          {catergoryList && catergoryList.length > 0 && (
            <div
              className="danji-around-detail-list-wrraper"
              style={{
                minHeight: '105px',
                maxHeight: '105px',
                overflowY: 'auto',
              }}
            >
              {convertedCategory.map((item, index) => (
                <Stack
                  style={{
                    ...getStylingFuction(item.place_name, item.address_name, index),
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  id={item.id}
                  key={item.id}
                  ref={(element) => {
                    listRefs.current[index] = element;
                  }}
                  onClick={() => {
                    setAddressName(item.address_name);
                    setPlaceName(item.place_name);
                    setTableIndex(index);
                    handleSelectedSubwayMarker('');

                    if (typeof item.x === 'string' && typeof item.x === 'string') {
                      map?.morph({ lng: Number(item.x), lat: Number(item.y) }, 17);
                    } else {
                      map?.morph({ lng: Number(item.x[0]), lat: Number(item.y[0]) }, 17);
                    }
                  }}
                >
                  {activeCategory.SW8 && (
                    <ConvertArrayToSubwayComponent
                      categoryGroupName={item.category_name}
                      categoryGroupCode={item.category_group_code}
                    />
                  )}
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      letterSpacing: '-0.4px',
                      lineHeight: '20px',
                      marginLeft: '4px',
                    }}
                  >
                    {item.place_name}
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      letterSpacing: '-0.4px',
                      lineHeight: '20px',
                      marginLeft: 'auto',
                    }}
                  >
                    {getAverageDistance(item.distance)}m
                  </p>
                </Stack>
              ))}
            </div>
          )}
        </BottomSheetContent>
      </Wrapper>
    </div>
  );
}
