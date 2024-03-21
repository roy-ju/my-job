import { useMemo } from 'react';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { MarginTopFourty, MarginTopTwenty } from '@/components/atoms/Margin';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { NavigationHeader } from '@/components/molecules';

import Paths from '@/constants/paths';

import { BuyOrRent } from '@/constants/enums';

import Tabs from './shared/Tabs';

import useBuyOrRentTabsHandler from './special-terms/hooks/useBuyOrRentTabsHandler';

import useHandleClickBack from './special-terms/hooks/useHandleClickBack';

import ShowTermsInNotion from './special-terms/ShowTermsInNotion';

import Titles from './special-terms/Titles';

import CategoryTabs from './special-terms/CategoryTabs';

import useCategoryTabs from './special-terms/hooks/useCategoryTabs';

import Buy_Tabs from './special-terms/constants/buyTabs';

import Rent_Tabs from './special-terms/constants/rentTabs';

import { ListTitle, ListItemWrraper } from './special-terms/widget/SpecialTermsWidget';

import Buy_Special_Terms from './special-terms/constants/buySpecialTerms';

import Rent_Special_Terms from './special-terms/constants/rentSpecialTerms';

import ListItem from './special-terms/ListItem';

export default function SpecialTerms() {
  const { handleClickBack } = useHandleClickBack();

  const { tab: buyOrRent, handleChangeTab: handlChangeBuyOrRentTab } = useBuyOrRentTabsHandler();

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

  const { tab: category, tabIndex, handleChangeTab: handleChangeCategoryTab } = useCategoryTabs();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>특약사항</NavigationHeader.Title>
      </NavigationHeader>

      <Tabs
        type="specialTerms"
        value={buyOrRent}
        handleChange={handlChangeBuyOrRentTab}
        v1Title="매매 특약"
        v2Title="전월세 특약"
      />

      <FlexContents id="negocio-special-terms-scrollable-container">
        <MarginTopTwenty />
        <ShowTermsInNotion title={notionInfo.title} url={notionInfo.url} />
        <MarginTopFourty />
        <Titles />
        <CategoryTabs
          list={categoryTabListOnlyTitle}
          tab={category}
          tabIndex={tabIndex}
          handleChangeTab={handleChangeCategoryTab}
        />
        {categoryTablist.map((tabList, index) => {
          console.log(index);
          return (
            <ListItemWrraper key={tabList.title}>
              <ListTitle>{tabList.subTitle}</ListTitle>
              {list
                .filter((listItem) => listItem.smallCategory === tabList.subTitle)
                .map((item) => (
                  <ListItem key={item.title} item={item} />
                ))}
              {categoryTablist.length !== index + 1 && (
                <>
                  <MarginTopTwenty />
                  <SeperatorV2 tw="[min-height: 12px]" />
                </>
              )}
            </ListItemWrraper>
          );
        })}
      </FlexContents>
    </Container>
  );
}
