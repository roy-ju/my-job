import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
// import { Button } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { describeRealestateType } from '@/constants/enums';
import { formatUseAcceptedYear } from '@/utils/fotmat';
// import { useState } from 'react';

export default function DetailInfo({ danji }: { danji?: GetDanjiDetailResponse }) {
  // const [open, setOpen] = useState(false);

  if (!danji) return null;

  return (
    <div tw="px-5 pt-10 pb-10">
      <span tw="font-bold text-b1 [line-height: 1]">단지 기본정보</span>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Head tw="w-[25%]">주소</Table.Head>
            <Table.Data tw="w-[75%]">
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
          <Table.Row>
            <Table.Head>
              {danji.total_saedae_count && danji.total_dong_count && '세대 / 동수'}
              {danji.total_saedae_count && !danji.total_dong_count && '세대'}
              {!danji.total_saedae_count && danji.total_dong_count && '동수'}
            </Table.Head>
            <Table.Data>
              {danji.total_saedae_count &&
                danji.total_dong_count &&
                `${danji.total_saedae_count}세대 / ${danji.total_dong_count}동`}
              {danji.total_saedae_count && !danji.total_dong_count && `${danji.total_saedae_count}세대`}
              {!danji.total_saedae_count && danji.total_dong_count && `${danji.total_dong_count}동`}
            </Table.Data>
          </Table.Row>
          {/* {open && ( */}
          <>
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
                    용적률 {danji.yongjuk_rate}% / 건폐율 {danji.gunpae_rate}%
                  </Table.Data>
                )}
                {danji.yongjuk_rate && !danji.gunpae_rate && <Table.Data>용적률 {danji.yongjuk_rate}</Table.Data>}
                {!danji.yongjuk_rate && danji.gunpae_rate && <Table.Data>건폐율 {danji.gunpae_rate}</Table.Data>}
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
            {(danji.daeji_area || danji.architecture_area) && (
              <Table.Row>
                <Table.Head>면적</Table.Head>
                {danji.daeji_area && danji.architecture_area && (
                  <Table.Data>
                    {`대지 ${Number(danji.daeji_area).toLocaleString()}㎡ /
                      건축 ${Number(danji.architecture_area).toLocaleString()}㎡`}
                  </Table.Data>
                )}
                {danji.daeji_area && !danji.architecture_area && (
                  <Table.Data>{`대지 ${Number(danji.daeji_area).toLocaleString()}㎡`}</Table.Data>
                )}
                {!danji.daeji_area && danji.architecture_area && (
                  <Table.Data>{`건축 ${Number(danji.architecture_area).toLocaleString()}㎡`}</Table.Data>
                )}
              </Table.Row>
            )}
          </>
          {/* )} */}
        </Table.Body>
      </Table>
      {/* <Button
        variant="outlined"
        tw="w-full mt-5"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {open ? '접어두기' : '더보기'}
      </Button> */}
    </div>
  );
}
