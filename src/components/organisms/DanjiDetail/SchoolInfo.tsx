import { Button } from '@/components/atoms';
import { Tabs } from '@/components/molecules';
import NoDataTypeOne from './NoData';

export default function SchoolInfo() {
  return (
    <div tw="w-full pt-10 pb-10 px-5">
      <div tw="flex w-full justify-between items-center mb-2">
        <span tw="font-bold text-b1 [line-height: 1]">학군</span>
        <Button size="small" variant="outlined" selected>
          학구도
        </Button>
      </div>
      <Tabs variant="contained" value={1} tw="mt-2">
        <Tabs.Tab value={0}>초등학교</Tabs.Tab>
        <Tabs.Tab value={1}>중학교</Tabs.Tab>
        <Tabs.Tab value={2}>고등학교</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>
    </div>
  );
}
