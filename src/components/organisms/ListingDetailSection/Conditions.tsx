import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { Moment, Numeral } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { BuyOrRentString } from '@/constants/strings';

export interface ConditionsProps {
  listing?: GetListingDetailResponse['listing'];
}

function getPaymentTimeType(value: number) {
  if (value === 1) return '이전';
  return '이후';
}

export default function Conditions({ listing }: ConditionsProps) {
  return (
    <div>
      <div tw="mb-3">
        <div tw="font-bold">거래조건</div>
      </div>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Head>거래종류</Table.Head>
            <Table.Data>{BuyOrRentString[listing?.buy_or_rent ?? 0]}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>희망가</Table.Head>
            <Table.Data>
              {listing?.buy_or_rent === BuyOrRent.Buy && <Numeral koreanNumber>{listing.trade_price}</Numeral>}
              {listing?.buy_or_rent === BuyOrRent.Jeonsae && <Numeral koreanNumber>{listing.deposit}</Numeral>}
              {listing?.buy_or_rent === BuyOrRent.Wolsae && (
                <span>
                  <Numeral koreanNumber>{listing.deposit}</Numeral>
                  {' / '}
                  <Numeral koreanNumber>{listing.monthly_rent_fee}</Numeral>
                </span>
              )}
            </Table.Data>
          </Table.Row>
        </Table.Body>
        <Table.Group defaultExpanded>
          <Table.GroupSummary>
            <span tw="text-gray-1000">채무승계금액</span>
          </Table.GroupSummary>
          <Table.GroupDetails>
            {listing?.move_in_date && (
              <Table.Row>
                <Table.Head>입주가능시기</Table.Head>
                <Table.Data>
                  <Moment format="yyyy.MM.DD">{listing?.move_in_date}</Moment>{' '}
                  {getPaymentTimeType(listing?.move_in_date_type ?? 1)}
                </Table.Data>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Head>특약조건</Table.Head>
              <Table.Data>{listing?.special_terms ? listing?.special_terms : '없음'}</Table.Data>
            </Table.Row>
          </Table.GroupDetails>
        </Table.Group>
        <Table.Group defaultExpanded>
          <Table.GroupSummary>
            <span tw="text-gray-1000">지급일정</span>
          </Table.GroupSummary>
          <Table.GroupDetails>
            <Table.Row>
              <Table.Head>계약금</Table.Head>
              <Table.Data>
                <Numeral koreanNumber>{listing?.contract_amount}</Numeral>
                {!listing?.contract_amount_negotiable && <span tw="ml-1 text-info text-gray-700">*협의불가</span>}
              </Table.Data>
            </Table.Row>
            {Boolean(listing?.interim_amount1) && (
              <Table.Row>
                <Table.Head>중도금 1</Table.Head>
                <Table.Data>
                  <Numeral koreanNumber>{listing?.interim_amount1}</Numeral>
                  {!listing?.interim_amount_negotiable1 && <span tw="ml-1 text-info text-gray-700">*협의불가</span>}
                  {listing?.interim_amount_payment_time1 && (
                    <span tw="text-info text-gray-700">
                      <br />
                      지급일: <Moment format="yyyy.MM.DD">{listing?.interim_amount_payment_time1}</Moment>{' '}
                      {getPaymentTimeType(listing?.interim_amount_payment_time1_type ?? 1)}
                    </span>
                  )}
                </Table.Data>
              </Table.Row>
            )}
            {Boolean(listing?.interim_amount2) && (
              <Table.Row>
                <Table.Head>중도금 2</Table.Head>
                <Table.Data>
                  <Numeral koreanNumber>{listing?.interim_amount2}</Numeral>
                  {!listing?.interim_amount_negotiable2 && <span tw="ml-1 text-info text-gray-700">*협의불가</span>}
                  {listing?.interim_amount_payment_time2 && (
                    <span tw="text-info text-gray-700">
                      <br />
                      지급일: <Moment format="yyyy.MM.DD">{listing?.interim_amount_payment_time2}</Moment>{' '}
                      {getPaymentTimeType(listing?.interim_amount_payment_time2_type ?? 1)}
                    </span>
                  )}
                </Table.Data>
              </Table.Row>
            )}
            {Boolean(listing?.interim_amount3) && (
              <Table.Row>
                <Table.Head>중도금 3</Table.Head>
                <Table.Data>
                  <Numeral koreanNumber>{listing?.interim_amount3}</Numeral>
                  {!listing?.interim_amount_negotiable3 && <span tw="ml-1 text-info text-gray-700">*협의불가</span>}
                  {listing?.interim_amount_payment_time3 && (
                    <span tw="text-info text-gray-700">
                      <br />
                      지급일: <Moment format="yyyy.MM.DD">{listing?.interim_amount_payment_time3}</Moment>{' '}
                      {getPaymentTimeType(listing?.interim_amount_payment_time3_type ?? 1)}
                    </span>
                  )}
                </Table.Data>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Head>잔금</Table.Head>
              <Table.Data>
                <Numeral koreanNumber>{listing?.remaining_amount}</Numeral>
                {listing?.remaining_amount_payment_time && (
                  <span tw="text-info text-gray-700">
                    <br />
                    지급일: <Moment format="yyyy.MM.DD">{listing?.remaining_amount_payment_time}</Moment>{' '}
                    {getPaymentTimeType(listing?.remaining_amount_payment_time_type ?? 1)}
                  </span>
                )}
              </Table.Data>
            </Table.Row>
          </Table.GroupDetails>
        </Table.Group>
        <Table.Group defaultExpanded>
          <Table.GroupSummary>
            <span tw="text-gray-1000">세부정보</span>
          </Table.GroupSummary>
          <Table.GroupDetails>
            {listing?.move_in_date && (
              <Table.Row>
                <Table.Head>입주가능시기</Table.Head>
                <Table.Data>
                  <Moment format="yyyy.MM.DD">{listing?.move_in_date}</Moment>{' '}
                  {getPaymentTimeType(listing?.move_in_date_type ?? 1)}
                </Table.Data>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Head>특약조건</Table.Head>
              <Table.Data>{listing?.special_terms ? listing?.special_terms : '없음'}</Table.Data>
            </Table.Row>
          </Table.GroupDetails>
        </Table.Group>
      </Table>
    </div>
  );
}
