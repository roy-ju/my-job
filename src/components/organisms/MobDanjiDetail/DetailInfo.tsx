import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Table } from '@/components/molecules';

import { describeRealestateType } from '@/constants/enums';
import falsy from '@/utils/falsy';
import { formatUseAcceptedYear } from '@/utils/fotmat';
import { useMemo } from 'react';

import dynamic from 'next/dynamic';

const MapCardDanji = dynamic(() => import('@/components/templates/MobDanjiMap'), {
  loading: () => <div />,
  ssr: false,
});

export default function DetailInfo({ danji }: { danji?: GetDanjiDetailResponse }) {
  const isShowTableRow = useMemo(() => {
    if (!danji?.total_dong_count && (!danji?.total_saedae_count || danji.total_saedae_count === '0')) {
      return false;
    }
    return true;
  }, [danji]);

  if (!danji) {
    return null;
  }

  return (
    <div tw="px-5 pt-10 pb-10">
      <span tw="font-bold text-b1 [line-height: 1]">단지 기본정보</span>
      <div tw="[min-height: 16px]" />
      <MapCardDanji danji={danji} />
      <div tw="[min-height: 16px]" />
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Head>주소</Table.Head>
            <Table.Data>
              {(danji.road_name_address || danji.jibun_address) && (
                <span>{danji.road_name_address || danji.jibun_address}</span>
              )}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>건물 형태</Table.Head>
            <Table.Data>
              {describeRealestateType(danji.type)} <span tw="text-info text-gray-700">{danji.hall_type}</span>
            </Table.Data>
          </Table.Row>
          {isShowTableRow && (
            <Table.Row>
              <Table.Head>
                {danji.total_saedae_count &&
                  danji.total_saedae_count !== '0' &&
                  danji.total_dong_count &&
                  '세대 / 동수'}

                {danji.total_saedae_count && danji.total_saedae_count !== '0' && !danji.total_dong_count && '세대'}

                {(!danji.total_saedae_count || danji.total_saedae_count === '0') && danji.total_dong_count && '동수'}
              </Table.Head>
              <Table.Data>
                {danji.total_saedae_count &&
                  danji.total_saedae_count !== '0' &&
                  danji.total_dong_count &&
                  `${danji.total_saedae_count}세대 / ${danji.total_dong_count}동`}

                {danji.total_saedae_count &&
                  danji.total_saedae_count !== '0' &&
                  !danji.total_dong_count &&
                  `${danji.total_saedae_count}세대`}

                {(!danji.total_saedae_count || danji.total_saedae_count === '0') &&
                  danji.total_dong_count &&
                  `${danji.total_dong_count}동`}
              </Table.Data>
            </Table.Row>
          )}

          {danji.highest_floor && (
            <Table.Row>
              <Table.Head>층 수</Table.Head>
              <Table.Data>최고 {danji.highest_floor}층</Table.Data>
            </Table.Row>
          )}
          {danji.heat_type && (
            <Table.Row>
              <Table.Head>난방</Table.Head>
              <Table.Data>{danji.heat_type}</Table.Data>
            </Table.Row>
          )}
          {(danji.yongjuk_rate || danji.gunpae_rate) && (
            <Table.Row>
              <Table.Head>용적 / 건폐율</Table.Head>
              {danji.yongjuk_rate && danji.gunpae_rate && (
                <Table.Data>
                  {danji.yongjuk_rate}% / {danji.gunpae_rate}%
                </Table.Data>
              )}
              {danji.yongjuk_rate && !danji.gunpae_rate && <Table.Data>{danji.yongjuk_rate}%</Table.Data>}
              {!danji.yongjuk_rate && danji.gunpae_rate && <Table.Data>{danji.gunpae_rate}%</Table.Data>}
            </Table.Row>
          )}
          {danji.sigong_company && (
            <Table.Row>
              <Table.Head>건설사</Table.Head>
              <Table.Data>{danji.sigong_company}</Table.Data>
            </Table.Row>
          )}
          {danji.use_accepted_year && (
            <Table.Row>
              <Table.Head>사용승인일</Table.Head>
              <Table.Data>{`${formatUseAcceptedYear(danji.use_accepted_year)}`}</Table.Data>
            </Table.Row>
          )}
          {Number(danji.daeji_area) > 0 && (
            <Table.Row>
              <Table.Head>대지면적</Table.Head>
              <Table.Data>{`${Number(danji.daeji_area).toLocaleString()}㎡`}</Table.Data>
            </Table.Row>
          )}
          {Number(danji.architecture_area) > 0 && (
            <Table.Row>
              <Table.Head>건축면적</Table.Head>
              <Table.Data>{`${Number(danji.architecture_area).toLocaleString()}㎡`}</Table.Data>
            </Table.Row>
          )}
          {(danji?.parking_per_saedae || danji?.total_parking_count) && (
            <Table.Row>
              <Table.Head>총 / 세대당 주차대수</Table.Head>
              <Table.Data>
                {falsy(danji?.total_parking_count, '-')}대 / {falsy(danji?.parking_per_saedae, '-')}대
              </Table.Data>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
