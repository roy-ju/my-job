import { memo, useCallback } from 'react';

import { Button } from '@/components/atoms';

import NaverMapButton from './NaverMapButton';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

type ListingDetailOpertionsButtonsProps = {
  naverRealestateUrl: string;
  listingTotalCount: number;
  handleClickViewAll: (danjiID: number) => void;
  handleOpenNaverRealestate: (url?: string | undefined) => void;
};

function ListingDetailOpertionsButtons({
  naverRealestateUrl,
  listingTotalCount,
  handleClickViewAll,
  handleOpenNaverRealestate,
}: ListingDetailOpertionsButtonsProps) {
  const store = useDanjiDetailStore();

  const danjiID = store?.danji.danji_id ?? 0;

  const renderConditionNaverButton = !!naverRealestateUrl;

  const onClickViewAll = () => {
    handleClickViewAll(danjiID);
  };

  const onClickNaverRealestateButton = useCallback(() => {
    handleOpenNaverRealestate(naverRealestateUrl);
  }, [handleOpenNaverRealestate, naverRealestateUrl]);

  return (
    <div tw="flex flex-col gap-3 px-5 pb-10">
      <Button variant="outlined" size="medium" tw="w-full" onClick={onClickViewAll}>
        매물 전체보기 {!!listingTotalCount && <span tw="font-bold">{listingTotalCount}</span>}
      </Button>

      <NaverMapButton
        renderConditionNaverButton={renderConditionNaverButton}
        openNaverRealestate={onClickNaverRealestateButton}
      />
    </div>
  );
}

export default memo(ListingDetailOpertionsButtons);
