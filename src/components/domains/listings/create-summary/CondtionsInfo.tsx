import { Moment, Numeral, Button } from '@/components/atoms';

import { Table } from '@/components/molecules';

import useTooltip from '@/states/hooks/useTooltip';

import { BuyOrRent } from '@/constants/enums';

import { BuyOrRentString, TimeTypeString } from '@/constants/strings';

import { ListingDetailResponse } from '@/services/listing/types';

import QuestionIcon from '@/assets/icons/question.svg';

export interface ConditionsInfoProps {
  listing?: ListingDetailResponse['listing'];
  debtSuccessions?: ListingDetailResponse['debt_successions'];
  collaterals?: ListingDetailResponse['collaterals'];
}

export default function ConditionsInfo({ listing, debtSuccessions, collaterals }: ConditionsInfoProps) {
  const { openTooltip } = useTooltip();

  return (
    <div>
      <div tw="mb-3">
        <div tw="font-bold">
          <h2>거래조건</h2>
        </div>
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

        {Boolean(debtSuccessions?.length) && (
          <Table.Group defaultExpanded>
            <Table.GroupSummary>
              <div tw="flex items-center gap-1">
                <span tw="text-gray-1000">채무승계금액</span>
                <Button variant="ghost" size="none" onClick={() => openTooltip('listingDetailDebtSuccessions')}>
                  <QuestionIcon />
                </Button>
              </div>
            </Table.GroupSummary>
            <Table.GroupDetails>
              {debtSuccessions?.map((item) => (
                <Table.Row key={item.id ?? item.name + item.amount}>
                  <Table.Head>{item.name}</Table.Head>
                  <Table.Data>
                    <Numeral koreanNumber>{item.amount}</Numeral>
                  </Table.Data>
                </Table.Row>
              ))}
            </Table.GroupDetails>
          </Table.Group>
        )}

        {Boolean(collaterals?.length) && (
          <Table.Group defaultExpanded>
            <Table.GroupSummary>
              <div tw="flex items-center gap-1">
                <span tw="text-gray-1000">선순위 담보권</span>
                <Button variant="ghost" size="none" onClick={() => openTooltip('listingDetailCollaterals')}>
                  <QuestionIcon />
                </Button>
              </div>
            </Table.GroupSummary>
            <Table.GroupDetails>
              {collaterals?.map((item) => (
                <Table.Row key={item.id ?? item.name + item.amount}>
                  <Table.Head>{item.name}</Table.Head>
                  <Table.Data>
                    <Numeral koreanNumber>{item.amount}</Numeral>
                  </Table.Data>
                </Table.Row>
              ))}
            </Table.GroupDetails>
          </Table.Group>
        )}

        <Table.Group defaultExpanded>
          <Table.GroupSummary>
            <span tw="text-gray-1000">세부정보</span>
          </Table.GroupSummary>
          <Table.GroupDetails>
            {!listing?.rent_end_date ? (
              <Table.Row>
                <Table.Head>입주가능시기</Table.Head>
                {listing?.move_in_date ? (
                  <Table.Data>
                    <Moment format="yyyy.MM.DD">{listing?.move_in_date}</Moment>{' '}
                    {TimeTypeString[listing?.move_in_date_type ?? 1]}
                  </Table.Data>
                ) : (
                  <Table.Data>즉시입주가능</Table.Data>
                )}
              </Table.Row>
            ) : (
              <Table.Row>
                <Table.Head>임대차계약종료일</Table.Head>
                <Table.Data>
                  <Moment format="yyyy.MM.DD">{listing?.rent_end_date}</Moment>{' '}
                </Table.Data>
              </Table.Row>
            )}
            {listing?.buy_or_rent !== BuyOrRent.Buy && (
              <Table.Row>
                <Table.Head>전세자금대출</Table.Head>
                <Table.Data>{listing?.jeonsae_loan ? '가능' : '불가능'}</Table.Data>
              </Table.Row>
            )}
            {listing?.buy_or_rent !== BuyOrRent.Buy && (
              <Table.Row>
                <Table.Head>임대기간</Table.Head>
                <Table.Data>
                  {Boolean(listing?.rent_contract_term_year) && `${listing?.rent_contract_term_year}년`}
                  {Boolean(listing?.rent_contract_term_month) && `${listing?.rent_contract_term_month}개월`}
                </Table.Data>
              </Table.Row>
            )}
            {listing?.buy_or_rent !== BuyOrRent.Buy && (
              <Table.Row>
                <Table.Head>임대할 부분</Table.Head>
                <Table.Data>{!listing?.rent_area ? '전체' : listing?.rent_area}</Table.Data>
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
