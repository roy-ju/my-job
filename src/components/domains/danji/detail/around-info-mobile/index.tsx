import dynamic from 'next/dynamic';

import { v4 as uuid4 } from 'uuid';

import Button from '@/components/atoms/Button';

import { getAverageDistance } from '@/utils/danjiAroundInfo';

import Nodata from './Nodata';

import SubwayFormatUI from '../danji-around-map-card/SubwayFormatUI';

import { CommonDanjiDetailProps } from '../types';

import {
  Container,
  ListContainer,
  DetailCategoryButton,
  DistanceText,
  ListItem,
  LoadingWrraper,
  MapWrraper,
  NameText,
  NodataWrraper,
  ScrollContainer,
  Title,
  TitleWrraper,
} from './widget/DanjiAroundInfoMobileWidget';

import useAroundInfoMobileHandler from './hooks/useAroundInfoMobileHandler';

import { categoryButtonList } from './types';

const DanjiAroundMapCard = dynamic(() => import('../danji-around-map-card'), { ssr: false });

export default function AroundInfo({ danji }: CommonDanjiDetailProps) {
  const {
    scrollRef,
    refs,

    onDragStart,
    onDragMove,
    onDragEnd,

    activeCategory,
    catergoryList,
    onClickCategory,

    handleClickBtn,

    nodata,

    convertedMarker,
    convertedCategory,

    handleClickListItem,
    handleClickMoreButton,

    isMoreClick,
    sliceNum,
  } = useAroundInfoMobileHandler({
    danji,
  });

  if (!danji) {
    return null;
  }

  return (
    <Container>
      <TitleWrraper>
        <Title>교통 및 주변정보</Title>
        <Button size="small" variant="outlined" onClick={() => handleClickBtn()}>
          지도에서 보기
        </Button>
      </TitleWrraper>

      <ScrollContainer
        role="presentation"
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
      </ScrollContainer>

      <MapWrraper>
        <DanjiAroundMapCard aroundList={convertedMarker} danji={danji} addressName="" />
      </MapWrraper>

      {catergoryList.length === 0 &&
        (nodata ? (
          <NodataWrraper style={{ minHeight: '9.5125rem' }}>
            <Nodata message="다른 주변 정보를 확인해 보세요." />
          </NodataWrraper>
        ) : (
          <LoadingWrraper />
        ))}

      {catergoryList && catergoryList.length > 0 && (
        <ListContainer>
          {convertedCategory.slice(0, sliceNum).map((item, index) => (
            <ListItem
              isFirst={index === 0}
              id={item.id}
              key={`${item.id}-${uuid4()}`}
              onClick={() => handleClickListItem(item.address_name, item.place_name, item.x, item.y)}
            >
              {activeCategory.SW8 && (
                <SubwayFormatUI categoryGroupName={item.category_name} categoryGroupCode={item.category_group_code} />
              )}
              <NameText>{item.place_name}</NameText>
              <DistanceText>{getAverageDistance(item.distance)}m</DistanceText>
            </ListItem>
          ))}
          {convertedCategory.length > 3 && (
            <Button size="medium" variant="outlined" tw="w-full mt-5" onClick={handleClickMoreButton}>
              {isMoreClick ? '접기' : '더보기'}
            </Button>
          )}
        </ListContainer>
      )}
    </Container>
  );
}
