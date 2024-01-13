import { memo, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { useFetchDanjiSchools } from '@/services/danji/useFetchDanjiSchools';

import { DanjiDetailResponse, DanjiSchoolsResponse } from '@/services/danji/types';

import { SchoolType } from '@/constants/enums';

import SchoolTabs from './SchoolTabs';

import NoData from './Nodata';

import ListItem from './ListItem';

const MoreButton = dynamic(() => import('./MoreButton'), { ssr: false });

const DistrictButton = dynamic(() => import('./DistrictButton'), { ssr: false });

type SchoolInfoProps = {
  danji: DanjiDetailResponse;
  danjiSchools?: DanjiSchoolsResponse | undefined;
  preselectedSchoolType: number;
};

function SchoolInfo({ danji, danjiSchools, preselectedSchoolType }: SchoolInfoProps) {
  const [selectedSchoolType, setSelectedSchoolType] = useState(preselectedSchoolType);

  const [isClickMore, setIsClickMore] = useState(false);

  const { makeTrueSchool, makeDanjiSchoolID } = useMobileDanjiInteraction();

  const { data } = useFetchDanjiSchools({
    danjiId: danji.danji_id,
    realestateType: danji.type,
    prefetchedData: danjiSchools,
  });

  const schoolList = useMemo(() => {
    if (selectedSchoolType === SchoolType.ElementarySchool) return data?.list_elementary_schools ?? [];

    if (selectedSchoolType === SchoolType.MiddleSchool) return data?.list_middle_schools ?? [];

    if (selectedSchoolType === SchoolType.HighSchool) return data?.list_high_schools ?? [];
  }, [data?.list_elementary_schools, data?.list_high_schools, data?.list_middle_schools, selectedSchoolType]);

  const onChangeSelectedSchoolType = (val: number) => {
    setSelectedSchoolType(val);
    setIsClickMore(false);
  };

  const handleClickHakgudo = async (id?: string) => {
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
  };

  return (
    <div tw="w-full pt-10 pb-10 px-5 [min-height: 396px]">
      <div tw="flex w-full justify-between items-center mb-2">
        <h2 tw="font-bold text-b1 [line-height: 1]">학군</h2>
        <DistrictButton handleClick={() => handleClickHakgudo()} />
      </div>

      <SchoolTabs variant="contained" value={selectedSchoolType} tw="mt-2" onChange={onChangeSelectedSchoolType}>
        <SchoolTabs.Tab value={SchoolType.ElementarySchool}>초등학교</SchoolTabs.Tab>
        <SchoolTabs.Tab value={SchoolType.MiddleSchool}>중학교</SchoolTabs.Tab>
        <SchoolTabs.Tab value={SchoolType.HighSchool}>고등학교</SchoolTabs.Tab>
        <SchoolTabs.Indicator />
      </SchoolTabs>

      {schoolList && schoolList.length === 0 && (
        <div tw="mt-11">
          <NoData message="주변에 학교가 없습니다." />
        </div>
      )}

      {schoolList && schoolList.length > 0 && (
        <ul tw="mt-6">
          <ListItem isTitle />
          {schoolList.slice(0, isClickMore ? schoolList.length : 3).map((item) => (
            <ListItem key={item.school_id} item={item} handleClick={() => handleClickHakgudo(item.school_id)} />
          ))}
        </ul>
      )}

      {schoolList && schoolList.length > 3 ? (
        <MoreButton
          title={!isClickMore ? '더보기' : '접기'}
          handleClick={() => {
            if (!isClickMore) {
              setIsClickMore(true);
            } else {
              setIsClickMore(false);
            }
          }}
        />
      ) : null}
    </div>
  );
}

export default memo(SchoolInfo);
