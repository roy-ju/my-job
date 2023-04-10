import { Tabs } from '@/components/molecules';
import { MobGlobalHeader } from '@/components/organisms/MobGlobalHeader';
import TransactionHistoryList from './TransactionHistoryList';
import NoData from './Nodata';

interface Props {
  list: any[];
}

export default function MobTransactionHistory({ list }: Props) {
  return (
    <div tw="w-full max-w-mobile mx-auto relative flex flex-col h-full bg-white">
      <MobGlobalHeader title="거래참여 이력" />
      <div tw="w-full max-w-full min-h-[4rem]" />
      <Tabs>
        <Tabs.Tab value={0}>
          전체 <span tw="text-nego">0</span>
        </Tabs.Tab>
        <Tabs.Tab value={1}>참여중 거래</Tabs.Tab>
        <Tabs.Tab value={2}>지난 거래</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>

      {list.length ? (
        <div tw="overflow-y-auto">
          <TransactionHistoryList />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
