import tw from 'twin.macro';

import NewTabs from '@/components/molecules/Tabs/NewTabs';

import { memo } from 'react';

type SuggestsOrListingsTabProps = {
  tab: number;
  suggestTotalCount?: number;
  listingTotalCount?: number;
  handleChangeTab?: (v: number) => void;
};

function SuggestsOrListingsTab({
  tab,
  suggestTotalCount,
  listingTotalCount,
  handleChangeTab,
}: SuggestsOrListingsTabProps) {
  return (
    <NewTabs variant="contained" value={tab} onChange={handleChangeTab}>
      <NewTabs.Tab value={1}>
        <span tw="text-b2 leading-4">
          구해요 <span css={[tab === 1 && tw`text-nego-1000`]}>{suggestTotalCount}</span>
        </span>
      </NewTabs.Tab>
      <NewTabs.Tab value={2}>
        <span tw="text-b2 leading-4">
          매물 <span css={[tab === 2 && tw`text-nego-1000`]}>{listingTotalCount}</span>
        </span>
      </NewTabs.Tab>
      <NewTabs.Indicator />
    </NewTabs>
  );
}

export default memo(SuggestsOrListingsTab);
