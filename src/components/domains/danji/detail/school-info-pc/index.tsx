import { memo, useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { SchoolType } from '@/constants/enums';

import { useFetchDanjiSchools } from '@/services/danji/useFetchDanjiSchools';

import { DanjiSchoolsResponse } from '@/services/danji/types';

import useSchoolInfoHandler from './hooks/useSchoolInfoHandler';

import SchoolTabs from './SchoolTabs';

import Nodata from './Nodata';

import ListItem from './ListItem';

import { Container, TitleWrraper, ListWrraper, NodataWrraper, Title } from './widget/SchoolInfoPcWidget';

import { CommonDanjiDetailProps } from '../types';

const MoreButton = dynamic(() => import('./MoreButton'), { ssr: false });

const DistrictButton = dynamic(() => import('./DistrictButton'), { ssr: false });

interface SchoolInfoProps extends CommonDanjiDetailProps {
  danjiSchools?: DanjiSchoolsResponse | undefined;
  preselectedSchoolType: number;
}

function SchoolInfo({ danji, danjiSchools, preselectedSchoolType }: SchoolInfoProps) {
  const {
    interactionState,
    interactionStore,

    selectedSchoolID,

    selectedSchoolType,
    setSelectedSchoolType,

    setSelctedIndex,

    isClickMore,

    handleChangeSelectedSchoolType,
    handleUpdateMoreButtonState,

    handleClickHakgudo,
    handleClickListItem,
  } = useSchoolInfoHandler({
    danji,
    preselectedSchoolType,
  });

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

  useEffect(() => {
    if (data?.list_middle_schools && data.list_middle_schools.length > 0) {
      setSelectedSchoolType(SchoolType.MiddleSchool);
      return;
    }

    if (data?.list_elementary_schools && data.list_elementary_schools.length > 0) {
      setSelectedSchoolType(SchoolType.ElementarySchool);
      return;
    }

    if (data?.list_high_schools && data.list_high_schools.length > 0) {
      setSelectedSchoolType(SchoolType.HighSchool);
      return;
    }

    setSelectedSchoolType(SchoolType.ElementarySchool);
  }, [setSelectedSchoolType, data?.list_middle_schools, data?.list_elementary_schools, data?.list_high_schools]);

  useEffect(() => {
    if (schoolList && schoolList.length > 0 && interactionState.selectedSchoolMarker) {
      const index = schoolList.findIndex(
        (item) => interactionState?.selectedSchoolMarker?.id === `schoolMarker:${item.school_id}`,
      );
      setSelctedIndex(index);
    }
  }, [interactionState.selectedSchoolMarker, schoolList, setSelctedIndex]);

  return (
    <Container>
      <TitleWrraper>
        <Title>학군</Title>
        <DistrictButton selected={interactionStore.isSchoolOn} handleClick={handleClickHakgudo} />
      </TitleWrraper>
      <SchoolTabs variant="contained" value={selectedSchoolType} tw="mt-2" onChange={handleChangeSelectedSchoolType}>
        <SchoolTabs.Tab value={SchoolType.ElementarySchool}>초등학교</SchoolTabs.Tab>
        <SchoolTabs.Tab value={SchoolType.MiddleSchool}>중학교</SchoolTabs.Tab>
        <SchoolTabs.Tab value={SchoolType.HighSchool}>고등학교</SchoolTabs.Tab>
        <SchoolTabs.Indicator />
      </SchoolTabs>
      {schoolList && schoolList.length === 0 && (
        <NodataWrraper>
          <Nodata message="주변에 학교가 없습니다." />
        </NodataWrraper>
      )}
      {schoolList && schoolList.length > 0 && (
        <ListWrraper>
          <ListItem isTitle />
          {schoolList.slice(0, isClickMore ? schoolList.length : 3).map((item) => (
            <ListItem
              key={item.school_id}
              item={item}
              handleClick={() => handleClickListItem(item.school_id)}
              selected={selectedSchoolID === item.school_id}
            />
          ))}
        </ListWrraper>
      )}
      {schoolList && schoolList.length > 3 ? (
        <MoreButton title={!isClickMore ? '더보기' : '접기'} handleClick={handleUpdateMoreButtonState} />
      ) : null}
    </Container>
  );
}

export default memo(SchoolInfo);
