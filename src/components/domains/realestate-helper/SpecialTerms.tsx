import { useRef, useState, useCallback } from 'react';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { MarginTopEight, MarginTopFourty, MarginTopTwenty } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import Tabs from './shared/Tabs';

import useHandleClickBack from './special-terms/hooks/useHandleClickBack';

import useBuyOrRentTabsHandler from './special-terms/hooks/useBuyOrRentTabsHandler';

import useGetListAndInfo from './special-terms/hooks/useGetListAndInfo';

import ShowTermsInNotion from './special-terms/ShowTermsInNotion';

import Titles from './special-terms/Titles';

import CategoryTabs from './special-terms/CategoryTabs';

import Lists from './special-terms/Lists';

import { SpecialTermsContainerElementId } from './special-terms/constants/element_id';

import VirtualDiv from './special-terms/VirtualDiv';

// import useChangeRenderTabs from './special-terms/hooks/useChangeRenderTabs';

export default function SpecialTerms() {
  const ref = useRef<HTMLDivElement>(null);

  const { handleClickBack } = useHandleClickBack();

  const [openTitle, setOpenTitle] = useState<string | null>(null);

  const handleChangeOpenTitle = useCallback((v: string | null) => {
    setOpenTitle(v);
  }, []);

  const { tab: buyOrRent, handleChangeTab: handleChangeBuyOrRentTab } = useBuyOrRentTabsHandler({
    containerRef: ref,
  });

  const { notionInfo, categoryTabListOnlyTitle, categoryTablist, list } = useGetListAndInfo({ buyOrRent });

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>계약서 및 특약사항</NavigationHeader.Title>
      </NavigationHeader>
      <MarginTopEight />

      <Tabs
        type="specialTerms"
        value={buyOrRent}
        handleChange={handleChangeBuyOrRentTab}
        v1Title="매매"
        v2Title="전월세"
      />

      <FlexContents id={SpecialTermsContainerElementId} ref={ref}>
        <MarginTopTwenty />
        <ShowTermsInNotion title={notionInfo.title} url={notionInfo.url} />
        <MarginTopFourty />
        <Titles />

        <CategoryTabs
          containerRef={ref}
          buyOrRent={buyOrRent}
          categoryTablist={categoryTablist}
          list={categoryTabListOnlyTitle}
        />

        <Lists
          categoryTablist={categoryTablist}
          list={list}
          openTitle={openTitle}
          handleChangeOpenTitle={handleChangeOpenTitle}
        />
        <VirtualDiv />
      </FlexContents>
    </Container>
  );
}
