import tw from 'twin.macro';

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
  NameText,
  NodataWrraper,
  ScrollContainer,
  Title,
  TitleWrraper,
} from './widget/DanjiAroundInfoPcWidget';

import useAroundInfoMobileHandler from './hooks/useAroundInfoPcHandler';

import { categoryButtonList } from './types';

export default function AroundInfo({ danji }: CommonDanjiDetailProps) {
  const {
    interactionState,

    scrollRef,
    listRefs,
    refs,

    onDragStart,
    onDragMove,
    onDragEnd,

    activeCategory,
    catergoryList,
    onClickCategory,

    handleClickBtn,

    nodata,

    convertedCategory,
    convertPlaceName,

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
        <Button size="small" variant="outlined" selected={interactionState.around} onClick={handleClickBtn}>
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
              id={item.id}
              key={`${item.id}-${uuid4()}`}
              ref={(element) => {
                listRefs.current[index] = element;
              }}
              css={[
                index === 0
                  ? tw`[border-top: 1px solid #F4F6FA] [border-bottom: 1px solid #F4F6FA] px-4 py-[3px]`
                  : tw`[border-bottom: 1px solid #F4F6FA] px-4 py-[3.5px]`,
                (interactionState.danjiAroundPlaceName
                  ? item.place_name === interactionState.danjiAroundPlaceName
                  : item.address_name === interactionState.selectedAroundMarker?.addressName ||
                    convertPlaceName({ category: item.category_group_code, name: item.place_name }) ===
                      convertPlaceName({
                        category: interactionState.selectedAroundMarker?.type,
                        name:
                          typeof interactionState.selectedAroundMarker?.place === 'string'
                            ? interactionState.selectedAroundMarker?.place
                            : interactionState?.selectedAroundMarker?.place
                            ? interactionState?.selectedAroundMarker?.place[0]
                            : '',
                      })) && tw`bg-[#F3F0FF]`,
              ]}
              onClick={() => handleClickListItem(item.id, item.place_name, item.address_name)}
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
