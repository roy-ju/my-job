import { NavigationHeader, Tabs } from '@/components/molecules';

import TransactionHistoryList from './TransactionHistoryList';
import NoData from './Nodata';

interface Props {
  list: any[];
  onClickBack?: () => void;
}

export default function MobTransactionHistory({ list, onClickBack }: Props) {
  return (
    <div tw="w-full max-w-mobile mx-auto relative flex flex-col h-full bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>거래참여 이력</NavigationHeader.Title>
      </NavigationHeader>
      <Tabs>
        <Tabs.Tab value={0}>
          전체 <span tw="text-nego">0</span>
        </Tabs.Tab>
        <Tabs.Tab value={1}>참여중 거래</Tabs.Tab>
        <Tabs.Tab value={2}>지난 거래</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>
      <div tw="flex-1 min-h-0 overflow-auto pb-5">{list.length ? <TransactionHistoryList /> : <NoData />}</div>
    </div>
  );
}
