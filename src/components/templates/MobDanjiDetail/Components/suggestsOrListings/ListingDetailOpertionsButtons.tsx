import { Button } from '@/components/atoms';

import NaverRealestateButton from './NaverRealestateButton';

type ListingDetailOpertionsButtonsProps = {
  danjiID: number;
  totalCount: number;
  handleListingListAll: () => void;
};

export default function ListingDetailOpertionsButtons({
  danjiID,
  totalCount,
  handleListingListAll,
}: ListingDetailOpertionsButtonsProps) {
  return (
    <div tw="flex flex-col gap-3 px-5 pb-10">
      <Button variant="outlined" size="medium" tw="w-full" onClick={handleListingListAll}>
        매물 전체보기 <span tw="font-bold">{totalCount}</span>
      </Button>

      <NaverRealestateButton danjiID={danjiID} />
    </div>
  );
}
