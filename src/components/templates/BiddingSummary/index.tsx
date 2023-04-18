import { Button, Moment, Numeral, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader, Table } from '@/components/molecules';
import { ListingSummaryCard } from '@/components/organisms';
import { BuyOrRent } from '@/constants/enums';
import { useMemo } from 'react';
import tw, { styled } from 'twin.macro';

interface Props {
  isCreatingBidding?: boolean;

  listingTitle?: string;
  address?: string;
  area?: string;
  floorDescription?: string;
  floor?: string;
  direction?: string;
  listingImagePath?: string;

  listingPrice?: number;
  listingMonthlyRentFee?: number;
  listingBuyOrRent?: number;

  acceptingTargetPrice?: boolean;

  price?: number;
  monthlyRentFee?: number;
  contractAmount?: number;
  interimAmount?: number;
  remainingAmountDate?: string;
  remainingAmountDateType?: number;
  moveInDate?: string;
  moveInDateType?: number;
  etcs?: string;
  description?: string;

  onClickBack?: () => void;
  onClickNext?: () => void;
}

const StyledTable = styled.table`
  ${tw`w-full table-fixed text-b2`}
  th {
    ${tw`text-gray-1000 w-[20%] py-1`}
  }
  td {
    ${tw`py-1 text-end w-[80%]`}
  }
`;

function getDateTypeString(value: number) {
  if (value === 1) return '이전';
  return '이후';
}

export default function BiddingSummary({
  listingTitle = '',
  address = '',
  area = '',
  floorDescription = '',
  floor = '',
  direction = '',
  listingImagePath,

  listingBuyOrRent,
  listingPrice = 0,
  listingMonthlyRentFee = 0,
  price = 0,
  monthlyRentFee = 0,
  interimAmount = 0,
  remainingAmountDate,
  remainingAmountDateType = 1,
  moveInDate,
  moveInDateType = 1,
  etcs,
  description,
  acceptingTargetPrice = false,
  isCreatingBidding,
  onClickBack,
  onClickNext,
}: Props) {
  const etcsString = useMemo(() => {
    const arr = etcs?.split(',') ?? [];
    const tagged = arr.map((item) => `#${item}`);
    return tagged.join(' ');
  }, [etcs]);

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>가격제안</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="px-5 pt-7">
          <ListingSummaryCard
            listingTitle={listingTitle}
            address={address}
            area={area}
            floorDescription={floorDescription}
            listingImagePath={listingImagePath}
            floor={floor}
            direction={direction}
          />
        </div>
        <div tw="flex py-7">
          <div tw="flex-1 text-center">
            <div tw="text-info text-gray-700">집주인 희망가</div>
            <div tw="text-b1 font-bold">
              {listingBuyOrRent === BuyOrRent.Wolsae ? (
                <span>
                  <Numeral koreanNumber>{listingPrice}</Numeral> /{' '}
                  <Numeral koreanNumber>{listingMonthlyRentFee}</Numeral>
                </span>
              ) : (
                <span>
                  <Numeral koreanNumber>{listingPrice}</Numeral>
                </span>
              )}
            </div>
          </div>
          <div tw="flex-1 text-center">
            <div tw="text-info text-gray-700">나의 제안가</div>
            <div tw="text-b1 font-bold text-nego-1000">
              {acceptingTargetPrice ? (
                <div>
                  {listingBuyOrRent === BuyOrRent.Wolsae ? (
                    <span>
                      <Numeral koreanNumber>{listingPrice}</Numeral> /{' '}
                      <Numeral koreanNumber>{listingMonthlyRentFee}</Numeral>
                    </span>
                  ) : (
                    <span>
                      <Numeral koreanNumber>{listingPrice}</Numeral>
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  {listingBuyOrRent === BuyOrRent.Wolsae ? (
                    <span>
                      <Numeral koreanNumber>{price}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
                    </span>
                  ) : (
                    <span>
                      <Numeral koreanNumber>{price}</Numeral>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {!acceptingTargetPrice && (
          <div>
            <Separator />
            <div tw="px-5 py-7">
              <div tw="text-b1 font-bold">나의 상세조건</div>
              <div tw="py-4">
                <StyledTable>
                  <Table.Body>
                    {Boolean(price) && (
                      <Table.Row>
                        <Table.Head>가격</Table.Head>
                        <Table.Data>
                          {listingBuyOrRent === BuyOrRent.Wolsae ? (
                            <span>
                              <Numeral koreanNumber>{price}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
                            </span>
                          ) : (
                            <span>
                              <Numeral koreanNumber>{price}</Numeral>
                            </span>
                          )}
                        </Table.Data>
                      </Table.Row>
                    )}
                    {Boolean(interimAmount) && (
                      <Table.Row>
                        <Table.Head>중도금</Table.Head>
                        <Table.Data>
                          최대 <Numeral koreanNumber>{interimAmount}</Numeral> 원까지 지급 가능
                        </Table.Data>
                      </Table.Row>
                    )}
                    {Boolean(remainingAmountDate) && (
                      <Table.Row>
                        <Table.Head>잔금</Table.Head>
                        <Table.Data>
                          잔금 지급 가능한 날: <Moment format="yyyy년 MM월 DD일">{remainingAmountDate}</Moment>{' '}
                          {getDateTypeString(remainingAmountDateType)}
                        </Table.Data>
                      </Table.Row>
                    )}
                    {Boolean(moveInDate) && (
                      <Table.Row>
                        <Table.Head>잔금</Table.Head>
                        <Table.Data>
                          입주 가능한 날: <Moment format="yyyy년 MM월 DD일">{moveInDate}</Moment>{' '}
                          {getDateTypeString(moveInDateType)}
                        </Table.Data>
                      </Table.Row>
                    )}
                    {Boolean(etcs) && (
                      <Table.Row>
                        <Table.Head>기타 선택</Table.Head>
                        <Table.Data>{etcsString}</Table.Data>
                      </Table.Row>
                    )}
                    {Boolean(description) && (
                      <Table.Row>
                        <Table.Head>추가 조건</Table.Head>
                        <Table.Data>{description}</Table.Data>
                      </Table.Row>
                    )}
                  </Table.Body>
                </StyledTable>
              </div>
            </div>
          </div>
        )}
      </div>
      <PersistentBottomBar>
        <Button isLoading={isCreatingBidding} tw="w-full" size="bigger" onClick={onClickNext}>
          완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
