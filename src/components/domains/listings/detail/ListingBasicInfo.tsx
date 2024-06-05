import tw, { styled } from 'twin.macro';

import { Numeral } from '@/components/atoms';

import { Table } from '@/components/molecules';

import { ListingDetailResponse } from '@/services/listing/types';

import { RealestateTypeString } from '@/constants/strings';

import falsy from '@/utils/falsy';

type ListingBasicInfoProps = {
  listingDetail?: ListingDetailResponse | null;
};

const Container = styled.div`
  ${tw`px-5 py-10`}
`;

const Title = styled.div`
  ${tw`mb-3 font-bold`}
`;

export default function ListingBasicInfo({ listingDetail }: ListingBasicInfoProps) {
  return (
    <Container>
      <Title>
        <h2>매물 기본정보</h2>
      </Title>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Head>매물번호</Table.Head>
            <Table.Data>{listingDetail?.listing?.trade_id}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>부동산 종류</Table.Head>
            <Table.Data>{RealestateTypeString[listingDetail?.listing?.realestate_type ?? 0]}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>면적</Table.Head>
            <Table.Data>
              공급 {listingDetail?.listing?.gonggeup_area}㎡ / 전용 {listingDetail?.listing?.jeonyong_area}㎡
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>방향</Table.Head>
            <Table.Data>
              {listingDetail?.listing?.direction} <span tw="text-info text-gray-700">거실기준</span>
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>복층여부</Table.Head>
            <Table.Data>{listingDetail?.listing?.storey}</Table.Data>
          </Table.Row>
        </Table.Body>
        <Table.Body>
          <Table.Row>
            <Table.Head>방 / 욕실</Table.Head>
            <Table.Data>
              {falsy(listingDetail?.listing?.room_count, '-')}개 / {falsy(listingDetail?.listing?.bathroom_count, '-')}
              개
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>해당 층 / 총 층</Table.Head>
            <Table.Data>
              {falsy(listingDetail?.listing?.floor_description, '-')} /{' '}
              {falsy(listingDetail?.listing?.total_floor, '-')}층
            </Table.Data>
          </Table.Row>
          {(listingDetail?.parking_per_saedae || listingDetail?.total_parking_count) && (
            <Table.Row>
              <Table.Head>총 / 세대당 주차대수</Table.Head>
              <Table.Data>
                {falsy(listingDetail?.total_parking_count, '-')}대 / {falsy(listingDetail?.parking_per_saedae, '-')}대
              </Table.Data>
            </Table.Row>
          )}
          <Table.Row>
            <Table.Head>관리비</Table.Head>
            <Table.Data>
              {listingDetail?.listing?.administrative_fee ? (
                <>
                  <Numeral koreanNumber thousandsSeparated>
                    {listingDetail?.listing?.administrative_fee}
                  </Numeral>{' '}
                  원
                </>
              ) : (
                '0 원'
              )}
            </Table.Data>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}
