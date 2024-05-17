import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { MobileContainer } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { OwnerVerification as Template, OwnerVerificationComplete as CompleteTemplate } from '@/components/templates';

import Routes from '@/router/routes';

import ErrorCodes from '@/constants/error_codes';

import useFetchAgreementInfo from '@/services/my/useFetchMyAgreementInfo';

export default function OwnerVerification() {
  const router = useRouter();

  const loi = router.query.loi as string;

  const token = router.query.t as string;

  const { data, isLoading } = useFetchAgreementInfo(loi, token);

  const handleVerify = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/ov/ci?t=${router.query.t}&loi=${router.query.loi}`);
  }, [router]);

  const handleNavigateToPrivacyPolicy = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.PrivacyPolicy}`);
  }, [router]);

  return (
    <MobileContainer>
      {!data?.error_code && (
        <Template
          isLoading={!loi || isLoading}
          address={data?.full_road_name_address}
          requestorName={data?.requestor_name}
          statusText={data?.status_text}
          onClickVerify={handleVerify}
          onClickPrivacyPolicy={handleNavigateToPrivacyPolicy}
        />
      )}
      {data?.error_code === ErrorCodes.ALREADY_VERIFIED && <CompleteTemplate onClickHome={() => router.push('/m')} />}
      {data?.error_code === ErrorCodes.LISTING_DOES_NOT_EXIST && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>해당 매물 등록 신청은 종료되었어요.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => router.push(`/${Routes.EntryMobile}`)}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
}
