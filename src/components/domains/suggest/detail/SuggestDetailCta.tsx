import { ButtonV2 } from '@/components/atoms';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import { SuggestDetailResponse } from '@/services/suggests/types';

import NeedVerifyAddressPopup from './popups/NeedVerifyAddressPopup';

import useSuggestDetailCtaHandler from './hooks/useSuggestDetailCtaHandler';

type SuggestDetailCtaProps = {
  data: SuggestDetailResponse & ErrorResponse;
};

export default function SuggestDetailCta({ data }: SuggestDetailCtaProps) {
  const { disabledCTA, needVerifyAddressPopup, handleClickCancel, handleClickConfirm } = useSuggestDetailCtaHandler({
    data,
  });

  if (data && data?.my_suggest) return null;

  if (data && data?.suggest_complete_status) return null;

  return (
    <>
      <PersistentBottomBarV2>
        <ButtonV2 size="bigger" tw="w-full" disabled={disabledCTA} onClick={handleClickConfirm}>
          내 매물 추천하기
        </ButtonV2>
      </PersistentBottomBarV2>

      {needVerifyAddressPopup && (
        <NeedVerifyAddressPopup handleClickConfirm={handleClickConfirm} handleClickCancel={handleClickCancel} />
      )}
    </>
  );
}
