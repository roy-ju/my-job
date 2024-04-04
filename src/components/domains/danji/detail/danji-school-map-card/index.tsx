/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-nested-ternary */

import DeferredRender from '@/components/atoms/DeferredRender';

import { MobSchoolMarker } from '@/components/organisms';

import { NaverMapV1 } from '@/lib/navermapV1';

import CustomOverlayV1 from '@/lib/navermap/components/CustomOverlayV1';

import { SchoolType } from '@/constants/enums';

import {
  BottomSheetContent,
  SchoolInfoTableContainer,
  FirstSelectedStyle,
  FirstNoneSelectedStyle,
  NotFirstSelectedStyle,
  NotFirstNoneSelectedStyle,
} from './widget/DanjiSchoolMapCardWidget';

import {
  Container,
  SchoolInfoTableHeadWrraper,
  SelectButton,
  LoadingDiv,
  Message,
  DanjiAroundSchoolListWrraper,
  NameText,
  DistanceText,
  RowCenter,
} from './widget/DanjiSchoolMapCardTwinWidget';

import { MapMarkerShadow } from '../shared/widgets';

import MapMarkerSearch from '../shared/MapMarkerSearch';

import useDanjiSchoolMapCardMobile from './hooks/useDanjiSchoolMapCardMobile';

type DanjiSchoolMapCardProps = {
  lng?: number;
  lat?: number;
  danjiID?: number;
  rt?: number;
};

export default function DanjiSchoolMapCard({ lng, lat, danjiID, rt }: DanjiSchoolMapCardProps) {
  const {
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
  } = useDanjiSchoolMapCardMobile({
    lng,
    lat,
    danjiID,
    rt,
  });
  if (!lat || !lng) return null;

  return (
    <>
      <Container>
        <NaverMapV1
          center={center}
          onCreate={onCreate}
          onZoomChanged={onZoomChanged}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onClickMap={onClickMap}
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
              <MapMarkerSearch />
              <MapMarkerShadow />
            </CustomOverlayV1>
          </DeferredRender>
        </NaverMapV1>
      </Container>

      <SchoolInfoTableContainer ref={schoolRef}>
        <SchoolInfoTableHeadWrraper>
          <SelectButton
            onClick={() => onClickSchoolButton(SchoolType.ElementarySchool)}
            selected={schoolType ? schoolType.includes(SchoolType.ElementarySchool.toString()) : false}
          >
            초등학교
          </SelectButton>
          <SelectButton
            onClick={() => onClickSchoolButton(SchoolType.MiddleSchool)}
            selected={schoolType ? schoolType.includes(SchoolType.MiddleSchool.toString()) : false}
          >
            중학교
          </SelectButton>
          <SelectButton
            onClick={() => onClickSchoolButton(SchoolType.HighSchool)}
            selected={schoolType ? schoolType.includes(SchoolType.HighSchool.toString()) : false}
          >
            고등학교
          </SelectButton>
        </SchoolInfoTableHeadWrraper>
        <BottomSheetContent tw="[margin-bottom: 43px]">
          {isLoading && <LoadingDiv />}
          {!isLoading && list && list.length === 0 && schoolType && <Message>주변에 학교가 없습니다.</Message>}
          {!isLoading && !schoolType && <Message>학교타입을 선택해 주세요.</Message>}
          {list && list.length > 0 && (
            <DanjiAroundSchoolListWrraper className="danji-around-school-list-wrraper">
              {list.map((item, index) => (
                <RowCenter
                  id={item.school_id}
                  key={item.school_id}
                  ref={(element) => {
                    listRefs.current[index] = element;
                  }}
                  onClick={() => {
                    if (listRefs) {
                      listRefs.current[index].scrollIntoView(true);
                    }

                    handleClickSchoolListItem(item.school_id, item.lat, item.long);
                  }}
                  style={
                    index === 0
                      ? selectedSchoolId === item.school_id
                        ? FirstSelectedStyle
                        : FirstNoneSelectedStyle
                      : selectedSchoolId === item.school_id
                      ? NotFirstSelectedStyle
                      : NotFirstNoneSelectedStyle
                  }
                >
                  <NameText>{item.school_name}</NameText>
                  <DistanceText>{getDistance(item.distance_in_km)}</DistanceText>
                </RowCenter>
              ))}
            </DanjiAroundSchoolListWrraper>
          )}
        </BottomSheetContent>
      </SchoolInfoTableContainer>
    </>
  );
}
