import { Tabs } from '@/components/molecules';

type RegisteredListingsTabProps = {
  value: number;
  myRegisteringListingCount: number;
  myActiveListingCount: number;
  myContractCompleteListingCount: number;
  myCancelledListingCount: number;
  handleChange: (newValue: number) => void;
};

export default function RegisteredListingsTab({
  value,
  myRegisteringListingCount,
  myActiveListingCount,
  myContractCompleteListingCount,
  myCancelledListingCount,
  handleChange,
}: RegisteredListingsTabProps) {
  return (
    <Tabs value={value} onChange={handleChange}>
      <Tabs.Tab value={1}>
        <span tw="text-b2">
          등록신청 <span tw="text-gray-1000 font-bold">{myRegisteringListingCount}</span>
        </span>
      </Tabs.Tab>
      <Tabs.Tab value={2}>
        <span tw="text-b2">
          거래중 <span tw="text-gray-1000 font-bold">{myActiveListingCount}</span>
        </span>
      </Tabs.Tab>
      <Tabs.Tab value={3}>
        <span tw="text-b2">
          거래성사 <span tw="text-gray-1000 font-bold">{myContractCompleteListingCount}</span>
        </span>
      </Tabs.Tab>
      <Tabs.Tab value={4}>
        <span tw="text-b2">
          지난거래 <span tw="text-gray-1000 font-bold">{myCancelledListingCount}</span>
        </span>
      </Tabs.Tab>
      <Tabs.Indicator />
    </Tabs>
  );
}
