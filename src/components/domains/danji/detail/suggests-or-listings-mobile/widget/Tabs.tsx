import NewTabs from '@/components/molecules/Tabs/NewTabs';

import TotalCount from './TotalCount';

type TabsProps = {
  tab: number;
  listingCount: number;
  suggestCount: number;
  handleChangeTab: (value: number) => void;
};

export default function Tabs({ tab, listingCount, suggestCount, handleChangeTab }: TabsProps) {
  return (
    <div>
      <NewTabs variant="contained" value={tab} onChange={handleChangeTab}>
        <NewTabs.Tab value={1}>
          <span tw="text-b2 leading-4">
            구해요 <TotalCount colorChange={tab === 1} count={suggestCount} />
          </span>
        </NewTabs.Tab>
        <NewTabs.Tab value={2}>
          <span tw="text-b2 leading-4">
            매물 <TotalCount colorChange={tab === 2} count={listingCount} />
          </span>
        </NewTabs.Tab>
        <NewTabs.Indicator />
      </NewTabs>
    </div>
  );
}
