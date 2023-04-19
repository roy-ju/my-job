/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiSchools } from '@/apis/danji/danjiSchools';
import { Button } from '@/components/atoms';
import SchoolTabs from '@/components/molecules/Tabs/SchoolTabs';

import { SchoolType } from '@/constants/enums';
import { useEffect, useMemo, useState, useCallback } from 'react';
// import NoDataTypeOne from './NoData';

export default function SchoolInfo({ danji }: { danji?: GetDanjiDetailResponse }) {
  const [selectedSchoolType, setSelectedSchoolType] = useState<number>();

  const [selectedHakgudo, setSelectedHakgudo] = useState<boolean>(false);

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

  const onChangeSelectedSchoolType = (val: number) => {
    setSelectedSchoolType(val);
  };

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
        <Button
          size="small"
          variant="outlined"
          selected={selectedHakgudo}
          onClick={() => setSelectedHakgudo((prev) => !prev)}
        >
          학구도
        </Button>
      </div>
      <div className="hi">
        <SchoolTabs variant="contained" value={selectedSchoolType} tw="mt-2" onChange={onChangeSelectedSchoolType}>
          <SchoolTabs.Tab value={SchoolType.ElementarySchool}>초등학교</SchoolTabs.Tab>
          <SchoolTabs.Tab value={SchoolType.MiddleSchool}>중학교</SchoolTabs.Tab>
          <SchoolTabs.Tab value={SchoolType.HighSchool}>고등학교</SchoolTabs.Tab>
          <SchoolTabs.Indicator />
        </SchoolTabs>
      </div>
    </div>
  );
}
