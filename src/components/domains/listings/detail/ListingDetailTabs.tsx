import tw, { styled } from 'twin.macro';

import { Tabs } from '@/components/molecules';

import { ListingDetailResponse } from '@/services/listing/types';

import useCheckPlatform from '@/hooks/useCheckPlatform';

const Container = styled.div``;

const TabTitle = styled.span`
  ${tw`text-b2`}
`;

type ListingDetailTabsProps = {
  listingDetail?: ListingDetailResponse | null;
  tabIndex: number;
  handleTabItemClick: (i: number) => void;
};

export default function ListingDetailTabs({ listingDetail, tabIndex, handleTabItemClick }: ListingDetailTabsProps) {
  const { platform } = useCheckPlatform();

  return (
    <Container css={[platform === 'pc' ? tw`sticky z-40 pt-2 top-12` : tw`sticky top-12 pt-2 z-[109]`]}>
      <Tabs value={tabIndex} onChange={handleTabItemClick}>
        <Tabs.Tab value={0}>
          <TabTitle>거래정보</TabTitle>
        </Tabs.Tab>
        {!!listingDetail?.listing?.danji_id && (
          <Tabs.Tab value={1}>
            <TabTitle>단지정보</TabTitle>
          </Tabs.Tab>
        )}
        <Tabs.Tab value={2}>
          <TabTitle>Q&A</TabTitle>
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>
    </Container>
  );
}
