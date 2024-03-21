import { useRef, useState, useEffect } from 'react';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { MarginTopEight, MarginTopFourty, MarginTopTwenty } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import Tabs from './shared/Tabs';

import useHandleClickBack from './special-terms/hooks/useHandleClickBack';

import useBuyOrRentTabsHandler from './special-terms/hooks/useBuyOrRentTabsHandler';

import useCategoryTabs from './special-terms/hooks/useCategoryTabs';

import useGetListAndInfo from './special-terms/hooks/useGetListAndInfo';

import ShowTermsInNotion from './special-terms/ShowTermsInNotion';

import Titles from './special-terms/Titles';

import CategoryTabs from './special-terms/CategoryTabs';

import Lists from './special-terms/Lists';

import useChangeRenderTabs from './special-terms/hooks/useChangeRenderTabs';

import { TermsElementListItem } from './special-terms/types';

import { PrefixListElementItemId } from './special-terms/constants/element_id';

export default function SpecialTerms() {
  const ref = useRef<HTMLDivElement>(null);

  const [elementsList, setElementsList] = useState<TermsElementListItem[]>([]);

  const { handleClickBack } = useHandleClickBack();

  const {
    tab: category,
    tabIndex,
    handleChangeTab: handleChangeCategoryTab,
    handleChangeTabCallback,
  } = useCategoryTabs({ elementsList });

  const { tab: buyOrRent, handleChangeTab: handlChangeBuyOrRentTab } = useBuyOrRentTabsHandler({
    handleChangeTabCallback,
  });

  const { notionInfo, categoryTabListOnlyTitle, categoryTablist, list } = useGetListAndInfo({ buyOrRent });

  const { notIsSticky } = useChangeRenderTabs({ refObj: ref });

  useEffect(() => {
    categoryTablist?.forEach((i, idx) => {
      const item = document.getElementById(`${PrefixListElementItemId}-${i.title}`);

      if (item) {
        setElementsList((prev) => [...prev, { name: i.title, element: item, priority: idx + 1 }]);
      }
    });
  }, [categoryTablist]);

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>특약사항</NavigationHeader.Title>
      </NavigationHeader>
      <MarginTopEight />

      <Tabs
        type="specialTerms"
        value={buyOrRent}
        handleChange={handlChangeBuyOrRentTab}
        v1Title="매매 특약"
        v2Title="전월세 특약"
      />

      <FlexContents id="negocio-special-terms-scrollable-container" ref={ref}>
        <MarginTopTwenty />
        <ShowTermsInNotion title={notionInfo.title} url={notionInfo.url} />
        <MarginTopFourty />
        <Titles />

        <CategoryTabs
          notIsSticky={notIsSticky}
          list={categoryTabListOnlyTitle}
          tab={category}
          tabIndex={tabIndex}
          handleChangeTab={handleChangeCategoryTab}
        />

        <Lists categoryTablist={categoryTablist} list={list} />
      </FlexContents>
    </Container>
  );
}
