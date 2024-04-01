import { useMemo } from 'react';

import { BuyOrRent } from '@/constants/enums';

import Paths from '@/constants/paths';

import Buy_Special_Terms from '../constants/buySpecialTerms';

import Buy_Tabs from '../constants/buyTabs';

import Rent_Special_Terms from '../constants/rentSpecialTerms';

import Rent_Tabs from '../constants/rentTabs';

export default function useGetListAndInfo({ buyOrRent }: { buyOrRent: number }) {
  const notionInfo = useMemo(
    () =>
      buyOrRent === BuyOrRent.Buy
        ? { title: '매매 계약서 보는 법', url: Paths.BUY_TERMS_IN_NOTION }
        : { title: '전월세 계약서 보는 법', url: Paths.RENT_TERMS_IN_NOTION },
    [buyOrRent],
  );

  const categoryTabListOnlyTitle = useMemo(
    () => (buyOrRent === BuyOrRent.Buy ? Buy_Tabs.map((tab) => tab.title) : Rent_Tabs.map((tab) => tab.title)),
    [buyOrRent],
  );

  const categoryTablist = useMemo(() => (buyOrRent === BuyOrRent.Buy ? Buy_Tabs : Rent_Tabs), [buyOrRent]);

  const list = useMemo(() => (buyOrRent === BuyOrRent.Buy ? Buy_Special_Terms : Rent_Special_Terms), [buyOrRent]);

  return { notionInfo, categoryTabListOnlyTitle, categoryTablist, list };
}
