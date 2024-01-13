/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';

import tw from 'twin.macro';

import { useRecoilValue } from 'recoil';

import { Button } from '@/components/atoms';

import SchoolTabs from '@/components/molecules/Tabs/SchoolTabs';

import useDanjiInteraction from '@/states/hooks/useDanjiInteraction';

import danjiInteractionAtom from '@/states/atom/danjiInteraction';

import { DanjiDetailResponse } from '@/services/danji/types';

import checkStudentCount from '@/utils/checkStudentCount';

import getDistance from '@/utils/getDistance';

import { useAPI_DanjiSchools } from '@/apis/danji/danjiSchools';

import { SchoolType } from '@/constants/enums';

import NoDataTypeOne from './NoData';

export default function SchoolInfo({ danji }: { danji?: DanjiDetailResponse }) {
  const interactionStore = useDanjiInteraction({ danjiData: danji });

  const interactionState = useRecoilValue(danjiInteractionAtom);

  const [selectedSchoolID, setSelectedSchoolID] = useState<string>();

  const [selectedIndex, setSelctedIndex] = useState<number>();
  const [selectedSchoolType, setSelectedSchoolType] = useState<number>();
  const [disabled, setDiasbled] = useState<boolean>(false);
  const [processingMap, setProcessingMap] = useState<boolean>(false);

  const [isClickMore, setIsClickMore] = useState<boolean>(false);

  const {
    isLoading: danjiSchoolsIsLoading,
    listElementarySchools,
    listMiddleSchools,
    listHighSchools,
  } = useAPI_DanjiSchools({ danjiId: danji?.danji_id, realestateType: danji?.type });

  const schoolList = useMemo(() => {
    if (!danjiSchoolsIsLoading) {
      if (selectedSchoolType === SchoolType.ElementarySchool) return listElementarySchools;
      if (selectedSchoolType === SchoolType.MiddleSchool) return listMiddleSchools;
      if (selectedSchoolType === SchoolType.HighSchool) return listHighSchools;
    }
  }, [danjiSchoolsIsLoading, selectedSchoolType, listElementarySchools, listMiddleSchools, listHighSchools]);

  const onChangeSelectedSchoolType = useCallback((val: number) => {
    setSelectedSchoolID('');
    setSelectedSchoolType(val);
    setIsClickMore(false);
  }, []);

  const handleSchoolClick = useCallback(async () => {
    if (disabled) return;

    setSelectedSchoolID('');
    setDiasbled(true);

    try {
      if (interactionState.school) {
        interactionStore.makeSchoolOff();
      } else {
        await interactionStore.makeSchoolOn();
        interactionStore.makeAroundOff();
        interactionStore.makeAroundMarkerDefault();
        interactionStore.makeSelectedAroundDefault();
        interactionStore.makeDanjiAroundPlaceName('');
      }
    } catch (error) {
      //
    }

    setDiasbled(false);
  }, [disabled, interactionState.school, interactionStore]);

  const handleSchoolItem = async (id: string) => {
    if (processingMap) return;

    setProcessingMap(true);

    try {
      if (!interactionState.school) {
        await interactionStore.makeSchoolOn(() =>
          setTimeout(() => interactionStore.makeSelectedSchool(`schoolMarker:${id}`), 200),
        );

        interactionStore.makeAroundOff();
        interactionStore.makeAroundMarkerDefault();
        interactionStore.makeSelectedAroundDefault();
        interactionStore.makeDanjiAroundPlaceName('');
      } else {
        setTimeout(() => interactionStore.makeSelectedSchool(`schoolMarker:${id}`), 200);
      }
    } catch (error) {
      //
    }

    setProcessingMap(false);
  };

  useEffect(() => {
    if (listMiddleSchools.length > 0) {
      setSelectedSchoolType(SchoolType.MiddleSchool);
      return;
    }

    if (listElementarySchools.length > 0) {
      setSelectedSchoolType(SchoolType.ElementarySchool);
      return;
    }

    if (listHighSchools.length > 0) {
      setSelectedSchoolType(SchoolType.HighSchool);
      return;
    }

    setSelectedSchoolType(SchoolType.ElementarySchool);
  }, [listElementarySchools.length, listHighSchools.length, listMiddleSchools.length]);

  useEffect(() => {
    if (interactionState.selectedSchoolMarker) {
      if (interactionState.selectedSchoolMarker.type === 'elementary') {
        setSelectedSchoolType(SchoolType.ElementarySchool);
      }
      if (interactionState.selectedSchoolMarker.type === 'middle') {
        setSelectedSchoolType(SchoolType.MiddleSchool);
      }
      if (interactionState.selectedSchoolMarker.type === 'high') {
        setSelectedSchoolType(SchoolType.HighSchool);
      }
    }
  }, [interactionState.selectedSchoolMarker]);

  useEffect(() => {
    if (schoolList && schoolList.length > 0 && interactionState.selectedSchoolMarker) {
      const index = schoolList.findIndex(
        (item) => interactionState?.selectedSchoolMarker?.id === `schoolMarker:${item.school_id}`,
      );
      setSelctedIndex(index);
    }
  }, [interactionState.selectedSchoolMarker, schoolList]);

  useEffect(() => {
    if (typeof selectedIndex === 'number' && selectedIndex > 2) {
      setIsClickMore(true);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!interactionState.school) {
      setSelectedSchoolID('');
    }
  }, [interactionState.school]);

  if (!danji || !selectedSchoolType) return null;

  return (
    <div tw="w-full pt-10 pb-10 px-5 [min-height: 396px]">
      <div tw="flex w-full justify-between items-center mb-2">
        <h2 tw="font-bold text-b1">학군</h2>
        <Button
          size="small"
          variant="outlined"
          selected={interactionStore.isSchoolOn}
          disabled={disabled}
          onClick={handleSchoolClick}
        >
          학구도
        </Button>
      </div>
      <SchoolTabs variant="contained" value={selectedSchoolType} tw="mt-2" onChange={onChangeSelectedSchoolType}>
        <SchoolTabs.Tab value={SchoolType.ElementarySchool}>초등학교</SchoolTabs.Tab>
        <SchoolTabs.Tab value={SchoolType.MiddleSchool}>중학교</SchoolTabs.Tab>
        <SchoolTabs.Tab value={SchoolType.HighSchool}>고등학교</SchoolTabs.Tab>
        <SchoolTabs.Indicator />
      </SchoolTabs>

      {!danjiSchoolsIsLoading && schoolList && schoolList.length === 0 && (
        <div tw="mt-11">
          <NoDataTypeOne message="주변에 학교가 없습니다." />
        </div>
      )}

      {!danjiSchoolsIsLoading && schoolList && schoolList.length > 0 && (
        <div tw="mt-6">
          <div tw="flex pb-2 [border-bottom: 1px solid #E9ECEF]">
            <div tw="w-[9.125rem] [font-size: 14px] [line-height: 22px] text-gray-700">학교명</div>
            <div tw="w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">기관</div>
            <div tw="w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">학급당</div>
            <div tw="w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">거리</div>
          </div>
          {schoolList.slice(0, isClickMore ? schoolList.length : 3).map((item) => (
            <div
              key={item.school_id}
              tw="flex py-2 [border-bottom: 1px solid #F4F6FA] cursor-pointer"
              css={[selectedSchoolID === item.school_id && tw`bg-[#F3F0FF]`]}
              onClick={() => {
                setSelectedSchoolID(item.school_id);
                handleSchoolItem(item.school_id);
              }}
            >
              <div tw="w-[9.125rem] [font-size: 14px] [line-height: 22px]">{item.name || '-'}</div>
              <div tw="w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
                {item.found_type || '-'}
              </div>
              <div tw="w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
                {checkStudentCount(item.students_per_teacher_count)}
              </div>
              <div tw="w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
                {getDistance(item.distance_in_km)}
              </div>
            </div>
          ))}
        </div>
      )}

      {schoolList && schoolList.length > 3 ? (
        !isClickMore ? (
          <Button size="medium" variant="outlined" tw="mt-5 w-full" onClick={() => setIsClickMore(true)}>
            더보기
          </Button>
        ) : (
          <Button size="medium" variant="outlined" tw="mt-5 w-full" onClick={() => setIsClickMore(false)}>
            접기
          </Button>
        )
      ) : null}
    </div>
  );
}
