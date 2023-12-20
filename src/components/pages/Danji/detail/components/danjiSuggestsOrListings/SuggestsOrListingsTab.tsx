import tw from 'twin.macro';

import NewTabs from '@/components/molecules/Tabs/NewTabs';

import useDanjiSuggestsOrListingsStore from '../../hooks/useDanjiSuggestsOrListingsStore';

import useDanjiSuggestsOrListingsDispatch from '../../hooks/useDanjiSuggestsOrListingsDispatch';

import { getTotalCount } from '../../utils';

function SuggestsOrListingsTab() {
  const store = useDanjiSuggestsOrListingsStore();

  const dispatch = useDanjiSuggestsOrListingsDispatch();

  const listingTotalCount = getTotalCount(store.listingsList.totalCount);

  const suggestTotalCount = getTotalCount(store.suggestsList.totalCount);

  const tab = store?.tab;

  const handleChangeTab = (v: number) => {
    if (v === 1 || v === 2) {
      dispatch?.({ type: 'set_tab', payLoad: v });
    }
  };

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

export default SuggestsOrListingsTab;
