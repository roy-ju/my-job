import { Button, ButtonV2, Separator } from '@/components/atoms';

import FlexContents from '@/components/atoms/FlexContents';

import Container from '@/components/atoms/Container';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import { NavigationHeader } from '@/components/molecules';

import { ListingDetailSection } from '@/components/organisms';

import useListingCreateSummaryHandler from './create-summary/hooks/useListingCreateSummaryHandler';

import SuccessPopup from './create-summary/popups/SuccessPopup';

import ErrorPopup from './create-summary/popups/ErrorPopup';

export default function ListingCreateSummary() {
  const {
    params,
    isCreating,
    handleClickCreate,
    handleClickUpdate,

    successPopup,
    errorPopup,
    handleConfirmSuccessPopup,
    handleConfirmErrorPopup,
  } = useListingCreateSummaryHandler();

  return (
    <>
      <Container>
        <NavigationHeader>
          <NavigationHeader.Title>매물등록 신청 최종 확인</NavigationHeader.Title>
        </NavigationHeader>
        <FlexContents>
          <div tw="pt-6 pb-10 px-5">
            <div tw="text-h2 font-bold mb-1">매물등록 신청 준비가 끝났습니다.</div>
            <div tw="text-info text-gray-700">아래 내용을 확인하시고, 매물등록 신청 버튼을 누르면 완료됩니다.</div>
          </div>

          <Separator />
          <div tw="px-5 pt-10">
            <ListingDetailSection.Conditions
              listing={params}
              debtSuccessions={params?.debt_successions}
              collaterals={params?.collaterals}
            />
          </div>
          <div tw="py-10 flex items-center justify-center">
            <Button variant="ghost" size="none" tw="underline text-info" onClick={handleClickUpdate}>
              입력정보 수정/중개사 재선택
            </Button>
          </div>
        </FlexContents>

        <PersistentBottomBarV2>
          <ButtonV2 isLoading={isCreating} size="bigger" tw="w-full" onClick={handleClickCreate}>
            매물등록 신청
          </ButtonV2>
        </PersistentBottomBarV2>
      </Container>
      {successPopup && <SuccessPopup handleConfirm={handleConfirmSuccessPopup} />}
      {errorPopup && <ErrorPopup handleConfirm={handleConfirmErrorPopup} />}
    </>
  );
}
