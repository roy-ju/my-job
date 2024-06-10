/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';

import { Button } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { getAverageDistance } from '@/utils/danjiAroundInfo';

import CloseIcon from '@/assets/icons/close_18.svg';

import Container from '@/components/atoms/Container';

import { DanjiDetailResponse } from '@/services/danji/types';

import {
  BottomSheetContent,
  Stack,
  DistanceText,
  ButtonWrraper,
  DetailCategoryButton,
  AroundDanjiDetailFooter,
  Wrapper,
  RelativeFlex,
  EmptyMessage,
  Message,
  ListContainer,
} from './widget/DanjiAroundDetailMobileWidget';

import { BtnState, categoryButtonList } from './types';

import useScrollTabs from './hooks/useScrollTabs';

import useDanjiAroundDetailMobileHandler from './hooks/useDanjiAroundDetailMobileHandler';

import DanjiAroundMapCard from '../danji-around-map-card';

import SubwayFormatUI from '../danji-around-map-card/SubwayFormatUI';

export default function DanjiAroundDetail({ danji }: { danji?: DanjiDetailResponse }) {
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

  const {
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
  } = useDanjiAroundDetailMobileHandler({ danji, danjiAddress, danjiPlace, danjiAroundDetailDefault });

  const { scrollRef, refs, listRefs, onDragStart, onDragEnd, onDragMove } = useScrollTabs({
    isClick,

    activeIndex,
    tableIndex,

    addressName,
    placeName,

    convertedCategory,
  });

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

  if (!danji) return null;

  return (
    <Container>
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

      <RelativeFlex>
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
      </RelativeFlex>

      <Wrapper ref={sheet}>
        <AroundDanjiDetailFooter id="negocio-footer">
          <ButtonWrraper
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {categoryButtonList.map((item, index) => (
              <DetailCategoryButton
                key={item.id}
                id={item.id}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                onClick={() => onClickCategory(item.id, index)}
                selected={activeCategory[item.id]}
              >
                {item.korTitle}
              </DetailCategoryButton>
            ))}
          </ButtonWrraper>
        </AroundDanjiDetailFooter>

        <BottomSheetContent>
          {catergoryList.length === 0 &&
            (nodata ? <Message>다른 주변 정보를 확인해 보세요.</Message> : <EmptyMessage />)}

          {catergoryList && catergoryList.length > 0 && (
            <ListContainer className="danji-around-detail-list-wrraper">
              {convertedCategory.map((item, index) => (
                <Stack
                  style={{
                    ...getStylingFuction(item.place_name, item.address_name, index),
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
                    <SubwayFormatUI
                      categoryGroupName={item.category_name}
                      categoryGroupCode={item.category_group_code}
                    />
                  )}
                  <DistanceText tw="ml-1">{item.place_name}</DistanceText>
                  <DistanceText tw="ml-auto">{getAverageDistance(item.distance)}m</DistanceText>
                </Stack>
              ))}
            </ListContainer>
          )}
        </BottomSheetContent>
      </Wrapper>
    </Container>
  );
}
