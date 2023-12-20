import { memo } from 'react';

import { Button } from '@/components/atoms';

import NaverMapButton from './NaverMapButton';

import useCheckSuggestsOrListings from '../../hooks/useCheckSuggestsOrListings';

type RegisterButtonsProps = {
  handleClickListingButton: () => void;
  handleClickSuggestButton: () => void;
};

function RegisterButtons({ handleClickListingButton, handleClickSuggestButton }: RegisterButtonsProps) {
  const { type } = useCheckSuggestsOrListings();

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

      <NaverMapButton />
    </div>
  );
}

export default memo(RegisterButtons);
