import { useMemo } from 'react';

import { Separator } from '@/components/atoms';

import { Table } from '@/components/molecules';

import { ListingDetailResponse } from '@/services/listing/types';

import falsy from '@/utils/falsy';

import { BuyOrRent } from '@/constants/enums';

type ListingDetailInfoProps = {
  listingDetail?: ListingDetailResponse | null;
};

export default function ListingDetailInfo({ listingDetail }: ListingDetailInfoProps) {
  const etcOptions = useMemo(() => {
    if (listingDetail?.options?.length) return listingDetail?.options?.map((item) => item.name).join(',');
    return '';
  }, [listingDetail?.options]);

  return (
    <>
      {(listingDetail?.listing?.veranda_extended || listingDetail?.listing?.veranda_remodelling || etcOptions) && (
        <div>
          <Separator />
          <div tw="py-10 px-5">
            <div tw="font-bold mb-3">
              <h2>매물 상세정보</h2>
            </div>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Head>
                    베란다
                    <br />
                    확장 여부
                  </Table.Head>
                  <Table.Data>{listingDetail?.listing?.veranda_extended ? '확장' : '해당없음'}</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>올수리 여부</Table.Head>
                  <Table.Data>{listingDetail?.listing?.veranda_remodelling ? '2년 내 올수리' : '해당없음'}</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>기타 옵션</Table.Head>
                  <Table.Data>{etcOptions || '해당없음'}</Table.Data>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      )}

      {listingDetail?.listing?.buy_or_rent === BuyOrRent.Buy && (
        <div>
          <Separator />
          <div tw="py-10 px-5">
            <div tw="font-bold mb-3">
              <h2>관련 규제 정보</h2>
            </div>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Head>투기지역 여부</Table.Head>
                  <Table.Data>{falsy(listingDetail?.listing?.toogi_region, '해당없음')}</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>
                    토지거래 허가
                    <br />
                    구역 여부
                  </Table.Head>
                  <Table.Data>{listingDetail?.listing?.toji_trade_eligible ? '허가구역' : '해당없음'}</Table.Data>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      )}

      {listingDetail?.listing?.description && (
        <div>
          <Separator />
          <div tw="py-10 px-5">
            <div tw="font-bold mb-3">
              <h5>특이사항</h5>
            </div>
            <div tw="whitespace-pre-wrap break-all text-b2">{listingDetail?.listing?.description}</div>
          </div>
        </div>
      )}
    </>
  );
}
