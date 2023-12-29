import { Button } from '@/components/atoms';

import { NaverDanjiResponse } from '@/services/danji/types';

import NaverMapButton from './NaverRealestateButton';

import useCheckSuggestsOrListings from './hooks/useCheckSuggestsOrListings';

type RegisterButtonsProps = {
  tab: number;
  danjiID: number;
  naverDanji?: NaverDanjiResponse;
  handleClickListingButton: () => void;
  handleClickSuggestButton: () => void;
};

export default function RegisterButtons({
  tab,
  danjiID,
  naverDanji,
  handleClickListingButton,
  handleClickSuggestButton,
}: RegisterButtonsProps) {
  const { type } = useCheckSuggestsOrListings({ tab });

  return (
    <div tw="w-full pt-5 px-5 flex flex-col gap-4">
      {type === 'suggest' ? (
        <Button tw="w-full" onClick={handleClickSuggestButton} size="bigger">
          구해요 등록
        </Button>
      ) : (
        <Button tw="w-full" onClick={handleClickListingButton} size="bigger">
          매물 등록
        </Button>
      )}

      <NaverMapButton danjiID={danjiID} naverDanji={naverDanji} />
    </div>
  );
}
