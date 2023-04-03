import { NavigationHeader, Tabs } from '@/components/molecules';
import DetailHistory from './DetailHistory';
import TransactionHistoryList from './TransactionHistoryList';
import NoData from './Nodata';

export default function TransactionHistory({ type }: { type: '기본' | '데이터없음' | '상세' }) {
  const UI = {
    기본: (
      <div tw="relative flex flex-col h-full">
        <NavigationHeader>
          <NavigationHeader.Title>거래참여 이력</NavigationHeader.Title>
        </NavigationHeader>
        <Tabs>
          <Tabs.Tab value={0}>
            전체 <span tw="text-nego">7</span>
          </Tabs.Tab>
          <Tabs.Tab value={1}>참여중 거래</Tabs.Tab>
          <Tabs.Tab value={2}>지난 거래</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>
        <TransactionHistoryList />
      </div>
    ),
    데이터없음: (
      <div tw="relative flex flex-col h-full">
        <NavigationHeader>
          <NavigationHeader.Title>거래참여 이력</NavigationHeader.Title>
        </NavigationHeader>
        <Tabs>
          <Tabs.Tab value={0}>
            전체 <span tw="text-nego">7</span>
          </Tabs.Tab>
          <Tabs.Tab value={1}>참여중 거래</Tabs.Tab>
          <Tabs.Tab value={2}>지난 거래</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>
        <NoData />
      </div>
    ),
    상세: (
      <div tw="relative flex flex-col h-full">
        <NavigationHeader>
          <NavigationHeader.Title>거래참여 이력</NavigationHeader.Title>
        </NavigationHeader>
        <DetailHistory />
      </div>
    ),
  };

  return UI[type];
}
