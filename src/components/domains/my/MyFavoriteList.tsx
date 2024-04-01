import Container from '@/components/atoms/Container';

import Loading from '@/components/atoms/Loading';

import { NavigationHeader, NoDataUI } from '@/components/molecules';

import useFetchMyFavoriteDanjis from '@/services/my/useFetchMyFavoriteDanjis';

import useFetchMyFavoriteListings from '@/services/my/useFetchMyFavoriteListings';

import FavoriteListTabs from './favorite-list/FavoriteListTabs';

import ListingsList from './favorite-list/ListingsList';

import DanjisList from './favorite-list/DanjisList';

import useListingSortingType from './favorite-list/hooks/useListingSortingType';

import useActiveTab from './favorite-list/hooks/useActiveTab';

import convertedDanjiList from './favorite-list/utils/convertedDanjiList';

import convertedListingsList from './favorite-list/utils/convertedListingsList';

import useListItemHandler from './favorite-list/hooks/useListItemHandler';

export default function MyFavoriteList() {
  const { listingSortingType, convertListingSortingType, handleChangeListingSortingType } = useListingSortingType();

  const { activeTab, handleChangeTab } = useActiveTab();

  const {
    count: myFavoriteDanjisCount,
    data: myFavoriteDanjis,
    incrementalPageNumber: myFavoriteDanjisIncrementalPageNumber,
    mutate: mutateMyFavoriteDanjis,
    isLoading: isMyFavoriteDanjisLoading,
  } = useFetchMyFavoriteDanjis();

  const {
    count: myFavoriteListingsCount,
    data: myFavoriteListings,
    incrementalPageNumber: myFavoritelistingsIncrementalPageNumber,
    mutate: mutateMyFavoriteListings,
    isLoading: isMyFavoriteListingLoading,
  } = useFetchMyFavoriteListings(convertListingSortingType());

  const {
    handleToggleDanjiLike,
    handleToggleListingLike,
    handleClickFavoriteDanjiItem,
    handleClickFavoriteListingItem,
  } = useListItemHandler({ mutateMyFavoriteListings, mutateMyFavoriteDanjis });

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.Title>관심 목록</NavigationHeader.Title>
      </NavigationHeader>

      {isMyFavoriteDanjisLoading || isMyFavoriteListingLoading ? (
        <Loading />
      ) : (
        <>
          <FavoriteListTabs
            value={activeTab}
            handleChange={handleChangeTab}
            myFavoriteDanjisCount={myFavoriteDanjisCount ?? 0}
            myFavoriteListingsCount={myFavoriteListingsCount ?? 0}
          />

          {activeTab === 0 && convertedListingsList(myFavoriteListings).length > 0 && (
            <ListingsList
              dropdownValue={listingSortingType}
              dropdownHandler={handleChangeListingSortingType}
              listingsList={convertedListingsList(myFavoriteListings)}
              onNextListing={myFavoritelistingsIncrementalPageNumber}
              handleToggleListingItem={handleToggleListingLike}
              handleClickListingItem={handleClickFavoriteListingItem}
            />
          )}

          {activeTab === 1 && convertedDanjiList(myFavoriteDanjis).length > 0 && (
            <DanjisList
              danjiList={convertedDanjiList(myFavoriteDanjis)}
              onNextDanji={myFavoriteDanjisIncrementalPageNumber}
              handleToggleDanjiItem={handleToggleDanjiLike}
              handleClickDanjiItem={handleClickFavoriteDanjiItem}
            />
          )}

          {activeTab === 0 && convertedListingsList(myFavoriteListings).length === 0 && (
            <NoDataUI
              title="관심 매물이 없습니다."
              body={
                <>
                  네고시오에서 진행되고 있는 거래를 찾아
                  <br />
                  온라인으로 바로 네고를 시작해보세요
                </>
              }
            />
          )}

          {activeTab === 1 && convertedDanjiList(myFavoriteDanjis).length === 0 && (
            <NoDataUI
              title="관심 단지가 없습니다."
              body={
                <>
                  네고시오에서 진행되고 있는 거래를 찾아
                  <br />
                  온라인으로 바로 네고를 시작해보세요
                </>
              }
            />
          )}
        </>
      )}
    </Container>
  );
}
