import { memo, useMemo } from 'react';

import dynamic from 'next/dynamic';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { SchoolType } from '@/constants/enums';

import { useFetchDanjiSchools } from '@/services/danji/useFetchDanjiSchools';

import { DanjiSchoolsResponse } from '@/services/danji/types';

import useSchoolInfoHandler from './hooks/useSchoolInfoHandler';

import SchoolTabs from './SchoolTabs';

import Nodata from './Nodata';

import ListItem from './ListItem';

import { Container, TitleWrraper, ListWrraper, NodataWrraper, Title } from './widget/SchoolInfoMobileWidget';

import { CommonDanjiDetailProps } from '../types';

const MoreButton = dynamic(() => import('./MoreButton'), { ssr: false });

const DistrictButton = dynamic(() => import('./DistrictButton'), { ssr: false });

interface SchoolInfoProps extends CommonDanjiDetailProps {
  danjiSchools?: DanjiSchoolsResponse | undefined;
  preselectedSchoolType: number;
}

function SchoolInfo({ danji, danjiSchools, preselectedSchoolType }: SchoolInfoProps) {
  const { selectedSchoolType, isClickMore, handleChangeSelectedSchoolType, handleUpdateMoreButtonState } =
    useSchoolInfoHandler({
      preselectedSchoolType,
    });

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
    <Container>
      <TitleWrraper>
        <Title>학군</Title>
        <DistrictButton handleClick={() => handleClickHakgudo()} />
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
            <ListItem key={item.school_id} item={item} handleClick={() => handleClickHakgudo(item.school_id)} />
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
