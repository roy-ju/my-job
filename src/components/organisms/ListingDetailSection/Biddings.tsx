import React from 'react';

import tw, { styled } from 'twin.macro';

import { Chip, Moment, Numeral, Button } from '@/components/atoms';

import { Table } from '@/components/molecules';

import useTooltip from '@/states/hooks/useTooltip';

import QuestionIcon from '@/assets/icons/question.svg';

const StyledTable = styled.table`
  ${tw`w-full table-fixed text-b2`}
  tbody[aria-label='biddingHeader'] tr {
    th,
    td {
      ${tw`text-gray-700`}
    }
  }

  tbody tr:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
  th,
  td {
    width: 30%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    ${tw`text-gray-1000`}
  }

  td {
    text-align: end;
  }

  td:not(:last-of-type) {
    width: 50%;
    max-width: 50%;
  }

  th {
    width: 30%;
    max-width: 30%;
  }
`;

interface BiddingItem {
  nickname: string;
  createdTime: string | null;
  price: number;
  monthlyRentFee: number;
  isMyBidding: boolean;
}

interface BiddingsProps {
  isOwner?: boolean;
  biddingsChatRoomCreated?: BiddingItem[] | null;
  biddingsChatRoomNotCreated?: BiddingItem[] | null;
  isMonthlyRent?: boolean;
}

export default function Biddings({
  isOwner = false,
  biddingsChatRoomCreated,
  biddingsChatRoomNotCreated,
  isMonthlyRent = false,
}: BiddingsProps) {
  const { openTooltip } = useTooltip();

  const renderMonthlyRentFee = (fee: number) => {
    if (!isMonthlyRent) return null;

    if (fee === 0) return ' / 0원';

    return (
      <span>
        {' '}
        / <Numeral koreanNumber>{fee}</Numeral>
      </span>
    );
  };

  if (!biddingsChatRoomCreated && !biddingsChatRoomNotCreated) {
    if (isOwner) {
      return (
        <div>
          <div tw="mb-3">
            <div tw="flex items-center gap-1">
              <div tw="font-bold">제안 현황</div>
              <Button variant="ghost" size="none" onClick={() => openTooltip('biddingParticipatingStatus')}>
                <QuestionIcon />
              </Button>
            </div>
          </div>
          <div tw="text-center text-gray-700 text-b2 py-8">
            매수인/임차인의 가격 제안을 기다려 보세요!
            <br />
            원하는 가격 제안이 들어오면 중개사님과 협의해 주세요.
          </div>
        </div>
      );
    }

    return (
      <div>
        <div tw="mb-3">
          <div tw="flex items-center gap-1">
            <div tw="font-bold">
              <h2>제안 현황</h2>
            </div>
            <Button variant="ghost" size="none" onClick={() => openTooltip('biddingParticipatingStatus')}>
              <QuestionIcon />
            </Button>
          </div>
        </div>
        <div tw="text-center text-gray-700 text-b2 py-8">
          <h4>
            생각해보는 금액을 제안해 보시고,
            <br />
            네고의 기회를 잡아보세요!
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div tw="mb-3">
        <div tw="flex items-center gap-1">
          <div tw="font-bold">
            <h2>제안 현황</h2>
          </div>
          <Button variant="ghost" size="none" onClick={() => openTooltip('biddingParticipatingStatus')}>
            <QuestionIcon />
          </Button>
        </div>
      </div>
      <div>
        <StyledTable>
          <Table.Body aria-label="biddingHeader">
            <Table.Row>
              <Table.Head>제안자</Table.Head>
              <Table.Data>제안금액</Table.Data>
              <Table.Data>제안일시</Table.Data>
            </Table.Row>
          </Table.Body>
          {biddingsChatRoomCreated && (
            <Table.Body css={[biddingsChatRoomNotCreated && tw`border-b border-b-nego-800`]}>
              {biddingsChatRoomCreated?.map((item) => (
                <Table.Row key={item.nickname + item.createdTime}>
                  <Table.Head>
                    {item.isMyBidding ? (
                      <span tw="font-bold text-nego-1000">나의 제안가</span>
                    ) : (
                      <span tw="whitespace-nowrap">
                        {item.nickname} <Chip tw="ml-1">네고중</Chip>
                      </span>
                    )}
                  </Table.Head>
                  <Table.Data>
                    <span tw="whitespace-nowrap" css={item.isMyBidding && tw`font-bold text-nego-1000`}>
                      {item.price ? (
                        <>
                          <Numeral koreanNumber>{item.price}</Numeral>
                          {renderMonthlyRentFee(item.monthlyRentFee)}
                        </>
                      ) : (
                        '비공개'
                      )}
                    </span>
                  </Table.Data>
                  <Table.Data>
                    <span css={item.isMyBidding && tw`font-bold text-nego-1000`}>
                      {item.createdTime ? <Moment format="relative">{item.createdTime}</Moment> : '-'}
                    </span>
                  </Table.Data>
                </Table.Row>
              ))}
            </Table.Body>
          )}
          {biddingsChatRoomNotCreated && (
            <Table.Body>
              {biddingsChatRoomNotCreated?.map((item) => (
                <Table.Row key={item.nickname}>
                  <Table.Head>
                    {item.isMyBidding ? (
                      <span tw="font-bold text-nego-1000">나의 제안가</span>
                    ) : (
                      <span>{item.nickname}</span>
                    )}
                  </Table.Head>
                  <Table.Data>
                    <span css={item.isMyBidding && tw`font-bold text-nego-1000`}>
                      {item.price ? (
                        <>
                          <Numeral koreanNumber>{item.price}</Numeral>
                          {renderMonthlyRentFee(item.monthlyRentFee)}
                        </>
                      ) : (
                        '비공개'
                      )}
                    </span>
                  </Table.Data>
                  <Table.Data>
                    <span css={item.isMyBidding && tw`font-bold text-nego-1000`}>
                      {item.createdTime ? <Moment format="relative">{item.createdTime}</Moment> : '-'}
                    </span>
                  </Table.Data>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </StyledTable>
      </div>
    </div>
  );
}
