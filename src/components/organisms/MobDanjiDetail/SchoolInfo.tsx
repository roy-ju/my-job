/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { styled } from 'twin.macro';

import { Button } from '@/components/atoms';

import SchoolTabs from '@/components/molecules/Tabs/SchoolTabs';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import checkStudentCount from '@/utils/checkStudentCount';

import getDistance from '@/utils/getDistance';

import { SchoolType } from '@/constants/enums';

import { useAPI_DanjiSchools } from '@/apis/danji/danjiSchools';

import { DanjiDetailResponse } from '@/services/danji/types';

import NoDataTypeOne from './NoData';

const Div = styled.div``;

export default function SchoolInfo({ danji }: { danji?: DanjiDetailResponse }) {
  const [selectedSchoolType, setSelectedSchoolType] = useState<number>();
  const [isClickMore, setIsClickMore] = useState<boolean>(false);

  const { makeTrueSchool, makeDanjiSchoolID } = useMobileDanjiInteraction();
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
    setSelectedSchoolType(val);
    setIsClickMore(false);
  }, []);

  const handleClickHakgudo = useCallback(
    async (id?: string) => {
      if (!danji) return;

      if (selectedSchoolType === SchoolType.ElementarySchool) {
        sessionStorage.setItem('danji-selected-school', '"1"');
      }

      if (selectedSchoolType === SchoolType.MiddleSchool) {
        sessionStorage.setItem('danji-selected-school', '"2"');
      }

      if (selectedSchoolType === SchoolType.HighSchool) {
        sessionStorage.setItem('danji-selected-school', '"3"');
      }

      await makeTrueSchool();

      if (id) {
        makeDanjiSchoolID(id);
      }
    },
    [danji, makeDanjiSchoolID, makeTrueSchool, selectedSchoolType],
  );

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

  if (!danji || !selectedSchoolType) return null;

  return (
    <div tw="w-full pt-10 pb-10 px-5 [min-height: 396px]">
      <div tw="flex w-full justify-between items-center mb-2">
        <span tw="font-bold text-b1 [line-height: 1]">학군</span>
        <Button size="small" variant="outlined" onClick={() => handleClickHakgudo()}>
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
            <div tw="flex-[2.5] min-w-[9.125rem] [font-size: 14px] [line-height: 22px] text-gray-700">학교명</div>
            <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">
              기관
            </div>
            <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">
              학급당
            </div>
            <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right] text-gray-700">
              거리
            </div>
          </div>

          {schoolList.slice(0, isClickMore ? schoolList.length : 3).map((item) => (
            <Div
              key={item.school_id}
              tw="flex py-2 [border-bottom: 1px solid #F4F6FA]"
              onClick={() => handleClickHakgudo(item.school_id)}
            >
              <div tw="flex-[2.5] min-w-[9.125rem] [font-size: 14px] [line-height: 22px]">{item.name || '-'}</div>
              <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
                {item.found_type || '-'}
              </div>
              <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
                {checkStudentCount(item.students_per_teacher_count)}
              </div>
              <div tw="flex-1 min-w-[4rem] [font-size: 14px] [line-height: 22px] [text-align: right]">
                {getDistance(item.distance_in_km)}
              </div>
            </Div>
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
