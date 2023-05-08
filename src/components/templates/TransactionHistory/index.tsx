import { NavigationHeader, Tabs } from '@/components/molecules';
import TransactionHistoryList from './TransactionHistoryList';
import NoData from './Nodata';

interface Props {
  list: any[];
  onClickBack?: () => void;
}

export default function TransactionHistory({ list, onClickBack }: Props) {
  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
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
      {list.length ? <TransactionHistoryList /> : <NoData />}
    </div>
  );
}
