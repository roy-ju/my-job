import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { NavigationHeader } from '@/components/molecules';

import DanjiInfo from '@/components/organisms/danji/DanjiInfo';

import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import useHandleClickBack from './listings-list/hooks/useHandleClickBack';

import useDropdownFilter from './listings-list/hooks/useDropdownFilter';

import useListItemHandler from './listings-list/hooks/useListItemHandler';

import useCtasHandler from './listings-list/hooks/useCtasHandler';

import Nodata from './listings-list/Nodata';

import ListHeader from './listings-list/ListHeader';

import List from './listings-list/List';

const Container = styled.div`
  ${tw`relative flex flex-col h-full `}
`;

const DanjiInfoWrraper = styled.div`
  ${tw`py-6`}
`;

const DanjiListingsWrraper = styled.div`
  ${tw`flex-1 py-6 overflow-y-auto`}
`;

const Seperator = styled.div`
  ${tw`h-2`}
`;

export default function DanjiListings() {
  const router = useRouter();

  const danjiID = router?.query?.danjiID ? Number(router.query.danjiID) : 0;

  const { dropdownValue, handleChangeDropdown } = useDropdownFilter();

  const { data: danjiData, isLoading } = useFetchDanjiDetail({ danjiID });

  const { data: danjiListingsList, setSize } = useFetchDanjiListingsList({
    danjiID: danjiData?.danji_id,
    realestateType: danjiData?.type,
    orderBy: dropdownValue === '최신순' ? 1 : 2,
    pageSize: 10,
  });

  const listingsList = useMemo(() => {
    if (!danjiListingsList) return [];

    return danjiListingsList
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [danjiListingsList]);

  const listingsListTotalCount = useMemo(
    () => (danjiListingsList ? (danjiListingsList[0] ? danjiListingsList[0].total_count : 0) : 0),
    [danjiListingsList],
  );

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const { renderBackButtonUi, handleClickBack } = useHandleClickBack();

  const { handleClickItem } = useListItemHandler();

  const { handleClickDanjiDetailButton } = useCtasHandler({ danjiID });

  if (isLoading || !danjiData) return null;

  if (danjiData?.error_code) return null;

  return (
    <Container>
      <NavigationHeader>
        {renderBackButtonUi && <NavigationHeader.BackButton onClick={handleClickBack} />}
        <NavigationHeader.Title>단지 내 매물 목록</NavigationHeader.Title>
      </NavigationHeader>
      <DanjiInfoWrraper>
        <DanjiInfo danji={danjiData} handleClick={handleClickDanjiDetailButton} />
      </DanjiInfoWrraper>
      <SeperatorV2 />
      <DanjiListingsWrraper>
        {listingsList && listingsList.length === 0 && <Nodata />}
        {listingsList && listingsList.length > 0 && (
          <>
            <ListHeader count={listingsListTotalCount} value={dropdownValue} handleChange={handleChangeDropdown} />
            <Seperator />
            <List list={listingsList} onNext={increamentPageNumber} handleClickItem={handleClickItem} />
          </>
        )}
      </DanjiListingsWrraper>
    </Container>
  );
}
