import { Button, Numeral, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader, Table } from '@/components/molecules';
import tw, { styled } from 'twin.macro';

const StyledTable = styled.table`
  ${tw`w-full text-b2`}
  th {
    ${tw`py-1 text-gray-1000`}
  }
  td {
    ${tw`py-1 text-end`}
  }
`;

export interface ListingTargetPriceUpdateProps {
  beforePrice?: number;
  beforeMonthlyRentFee?: number;
  afterPrice?: number;
  afterMonthlyRentFee?: number;
  isUpdating?: boolean;
  onClickBack?: () => void;
  onClickCancel?: () => void;
  onClickSubmit?: () => void;
}

export default function ListingTargetPriceUpdate({
  beforePrice,
  beforeMonthlyRentFee,
  afterPrice,
  afterMonthlyRentFee,
  isUpdating,
  onClickBack,
  onClickCancel,
  onClickSubmit,
}: ListingTargetPriceUpdateProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>희망가 수정</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="py-7 px-5">
          <div tw="text-b1 font-bold mb-1">희망가 수정을 진행하겠습니까?</div>
          <div tw="text-b2 text-gray-700">중개사와 기존 제안자들에게 알림을 보냅니다.</div>
        </div>
        <Separator />
        <div tw="py-7 px-5">
          <div tw="text-b1 font-bold mb-4">수정 내용</div>
          <StyledTable>
            <Table.Body>
              <Table.Row>
                <Table.Head>변경 전 희망가</Table.Head>
                <Table.Data>
                  <Numeral koreanNumber>{beforePrice}</Numeral>
                  {Boolean(beforeMonthlyRentFee) && (
                    <span>
                      {' '}
                      / <Numeral koreanNumber>{beforeMonthlyRentFee}</Numeral>
                    </span>
                  )}
                </Table.Data>
              </Table.Row>
              <Table.Row>
                <Table.Head>변경 후 희망가</Table.Head>
                <Table.Data>
                  <Numeral koreanNumber>{afterPrice}</Numeral>
                  {Boolean(afterMonthlyRentFee) && (
                    <span>
                      {' '}
                      / <Numeral koreanNumber>{afterMonthlyRentFee}</Numeral>
                    </span>
                  )}
                </Table.Data>
              </Table.Row>
            </Table.Body>
          </StyledTable>
        </div>
      </div>
      <PersistentBottomBar>
        <div tw="flex gap-3">
          <Button variant="gray" size="bigger" tw="flex-1" onClick={onClickCancel}>
            취소
          </Button>
          <Button isLoading={isUpdating} size="bigger" tw="flex-1" onClick={onClickSubmit}>
            확인
          </Button>
        </div>
      </PersistentBottomBar>
    </div>
  );
}
