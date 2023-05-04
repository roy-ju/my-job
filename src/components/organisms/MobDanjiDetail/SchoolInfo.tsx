/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiSchools } from '@/apis/danji/danjiSchools';
import { Button } from '@/components/atoms';
import SchoolTabs from '@/components/molecules/Tabs/SchoolTabs';

import { SchoolType } from '@/constants/enums';
import { useDanjiMapButtonStore } from '@/states/mob/danjiMapButtonStore';

import checkStudentCount from '@/utils/checkStudentCount';
import getDistance from '@/utils/getDistance';
import { useCallback, useEffect, useMemo, useState } from 'react';
import NoDataTypeOne from './NoData';

export default function SchoolInfo({ danji }: { danji?: GetDanjiDetailResponse }) {
  const [selectedSchoolType, setSelectedSchoolType] = useState<number>();
  const [isClickMore, setIsClickMore] = useState<boolean>(false);
  const { makeTrueSchool } = useDanjiMapButtonStore();
  const {
    isLoading: danjiSchoolsIsLoading,
    listElementarySchools,
    listMiddleSchools,
    listHighSchools,
  } = useAPI_DanjiSchools({ pnu: danji?.pnu, realestateType: danji?.type });

  const schoolList = useMemo(() => {
    if (!danjiSchoolsIsLoading) {
      if (selectedSchoolType === SchoolType.ElementarySchool) return listElementarySchools;
      if (selectedSchoolType === SchoolType.MiddleSchool) return listMiddleSchools;
      if (selectedSchoolType === SchoolType.HighSchool) return listHighSchools;
    }
  }, [danjiSchoolsIsLoading, selectedSchoolType, listElementarySchools, listMiddleSchools, listHighSchools]);

  const onChangeSelectedSchoolType = useCallback((val: number) => {
    setSelectedSchoolType(val);
  }, []);

  const handleClickHakgudo = useCallback(() => {
    makeTrueSchool();
  }, [makeTrueSchool]);

  useEffect(() => {
    if (listElementarySchools.length > 0) {
      setSelectedSchoolType(SchoolType.ElementarySchool);
      return;
    }
    if (listMiddleSchools.length > 0) {
      setSelectedSchoolType(SchoolType.MiddleSchool);
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
    <div tw="w-full pt-10 pb-10 px-5">
      <div tw="flex w-full justify-between items-center mb-2">
        <span tw="font-bold text-b1 [line-height: 1]">학군</span>
        <Button size="small" variant="outlined" onClick={handleClickHakgudo}>
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
        <div tw="mt-4">
          <div tw="flex py-2.5 [border-top: 1px solid #E9ECEF] [border-bottom: 1px solid #E9ECEF]">
            <div tw="w-[9.125rem] [font-size: 14px] [line-height: 1.6]">학교명</div>
            <div tw="w-[4rem] [font-size: 14px] [line-height: 1.6] [text-align: right]">기관</div>
            <div tw="w-[4rem] [font-size: 14px] [line-height: 1.6] [text-align: right]">학급당</div>
            <div tw="w-[4rem] [font-size: 14px] [line-height: 1.6] [text-align: right]">거리</div>
          </div>
          {schoolList.slice(0, isClickMore ? schoolList.length : 3).map((item) => (
            <div key={item.school_id} tw="flex py-2.5 [border-bottom: 1px solid #F4F6FA]">
              <div tw="w-[9.125rem] [font-size: 14px] [line-height: 1.6]">{item.name || '-'}</div>
              <div tw="w-[4rem] [font-size: 14px] [line-height: 1.6] [text-align: right]">{item.found_type || '-'}</div>
              <div tw="w-[4rem] [font-size: 14px] [line-height: 1.6] [text-align: right]">
                {checkStudentCount(item.students_per_teacher_count)}
              </div>
              <div tw="w-[4rem] [font-size: 14px] [line-height: 1.6] [text-align: right]">
                {getDistance(item.distance_in_km)}
              </div>
            </div>
          ))}
        </div>
      )}

      {schoolList && schoolList.length > 3 ? (
        !isClickMore ? (
          <Button variant="outlined" tw="mt-3 w-full" onClick={() => setIsClickMore(true)}>
            더보기
          </Button>
        ) : (
          <Button variant="outlined" tw="mt-3 w-full" onClick={() => setIsClickMore(false)}>
            접기
          </Button>
        )
      ) : null}
    </div>
  );
}
