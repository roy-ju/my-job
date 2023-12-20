import { memo } from 'react';

import { Button } from '@/components/atoms';

import NaverMapButton from './NaverMapButton';

type ListingDetailOpertionsButtonsProps = {
  listingTotalCount: number;
  handleClickListingsButton: () => void;
};

function ListingDetailOpertionsButtons({
  listingTotalCount,
  handleClickListingsButton,
}: ListingDetailOpertionsButtonsProps) {
  return (
    <div tw="flex flex-col gap-3 px-5 pb-10">
      <Button variant="outlined" size="medium" tw="w-full" onClick={handleClickListingsButton}>
        매물 전체보기 {!!listingTotalCount && <span tw="font-bold">{listingTotalCount}</span>}
      </Button>

      <NaverMapButton />
    </div>
  );
}

export default memo(ListingDetailOpertionsButtons);
