import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';
import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingSelectAddress } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useState, useEffect } from 'react';

export default memo(() => {
  const router = useRouter();

  const { user, isLoading: userIsLoading } = useAuth();

  const [isFetch, setIsFetch] = useState<boolean>(false);

  const { list, isLoading } = useAPI_GetMyAddressList({ activeOnly: true, danjiID: undefined, isFetch });
  const [selectedUserAddressID, setSelectedUserAddressID] = useState<number>();
  const [showInActivePopup, setShowInActivePopup] = useState(false);

  const handleClickItem = useCallback(
    (id: number) => {
      if (selectedUserAddressID === id) {
        setSelectedUserAddressID(undefined);
        return;
      }
      setSelectedUserAddressID(id);
    },
    [selectedUserAddressID],
  );

  const handleNext = useCallback(() => {
    if (!selectedUserAddressID) return;

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateForm}`,
      query: {
        danjiID: router?.query?.danjiID ? (router.query.danjiID as string) : '',
        redirect: router?.query?.redirect ? (router.query.redirect as string) : '',
        userAddressID: `${selectedUserAddressID}`,
      },
    });
  }, [router, selectedUserAddressID]);

  const handleClickHome = useCallback(() => {
    router.push(`/${Routes.EntryMobile}`);
  }, [router]);

  const handleClickAddMyAddress = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
  }, [router]);

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  useEffect(() => {
    if (!userIsLoading && user && user?.hasAddress === false) {
      setShowInActivePopup(true);
    }
  }, [user, userIsLoading]);

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        {!showInActivePopup &&
          (isLoading ? (
            <div tw="py-20">
              <Loading />
            </div>
          ) : (
            <ListingSelectAddress
              list={list}
              onClickBack={handleClickBack}
              selectedUserAddressID={selectedUserAddressID}
              onClickNext={handleNext}
              onClickItem={handleClickItem}
              onClickAddMyAddress={handleClickAddMyAddress}
            />
          ))}

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
});
