import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { MobHog as MobHogTemplate } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useState, useEffect } from 'react';
import { OverlayPresenter, Popup } from '@/components/molecules';

export default function MobHog() {
  const router = useRouter();

  const { user, isLoading: userIsLoading } = useAuth();

  const [showInActivePopup, setShowInActivePopup] = useState(false);

  const onClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const onClickListingCreate = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`);
  }, [router]);

  const handleClickHome = useCallback(() => {
    router.push(`/${Routes.EntryMobile}`);
  }, [router]);

  useEffect(() => {
    if (!userIsLoading && user && user?.hasAddress === false) {
      setShowInActivePopup(true);
    }
  }, [user, userIsLoading]);

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        {!showInActivePopup && <MobHogTemplate onClickBack={onClickBack} onClickListingCreate={onClickListingCreate} />}

        {showInActivePopup && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="py-6">
                <Popup.SubTitle tw="text-center">
                  현재 로그인 계정으로는
                  <br />
                  접근이 불가능한 페이지입니다.
                </Popup.SubTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.ActionButton onClick={handleClickHome}>네고시오 홈으로 돌아가기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </MobileContainer>
    </MobAuthRequired>
  );
}
