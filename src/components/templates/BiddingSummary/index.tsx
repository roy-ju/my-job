import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader, Table } from '@/components/molecules';

interface Props {
  isCreatingBidding?: boolean;

  price?: number;
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

export default function BiddingSummary({ isCreatingBidding, onClickBack, onClickNext }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>가격제안</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="px-5">
          <div tw="text-b1 font-bold">나의 상세조건</div>
          <div tw="py-4">
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Head>가격</Table.Head>
                  <Table.Data>99억 9,999만</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>중도금</Table.Head>
                  <Table.Data>최대 1억 2,000만 원까지 지급 가능</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>잔금</Table.Head>
                  <Table.Data>잔금 지급 가능한 날: 2022년 03월 03일</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>기타 선택</Table.Head>
                  <Table.Data>#실거주 예정</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>추가 조건</Table.Head>
                  <Table.Data>올수리 예정입니다, 실거주 목적입니다.</Table.Data>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      <PersistentBottomBar>
        <Button isLoading={isCreatingBidding} tw="w-full" size="bigger" onClick={onClickNext}>
          완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
