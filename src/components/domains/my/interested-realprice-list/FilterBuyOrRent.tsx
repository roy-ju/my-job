import { Tabs } from '@/components/molecules';

type FilterBuyOrRentProps = {
  value: number;
  handleChange: (newValue: number) => void;
};

export default function FilterBuyOrRent({ value, handleChange }: FilterBuyOrRentProps) {
  return (
    <Tabs variant="contained" value={value} onChange={handleChange}>
      <Tabs.Tab value={0}>전체</Tabs.Tab>
      <Tabs.Tab value={1}>매매</Tabs.Tab>
      <Tabs.Tab value={2}>전월세</Tabs.Tab>
      <Tabs.Indicator />
    </Tabs>
  );
}
