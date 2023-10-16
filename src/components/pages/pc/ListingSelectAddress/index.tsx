import { AuthRequired, Loading, Panel } from '@/components/atoms';
import { ListingSelectAddress } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useAuth } from '@/hooks/services';
import { ListingCreateGuidePopup } from '@/components/organisms';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const outsideRef = useRef<HTMLDivElement | null>(null);

  const { user, isLoading: userIsLoading } = useAuth();

  const { list, isLoading } = useAPI_GetMyAddressList(true);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
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

    router.replace(Routes.ListingCreateForm, {
      searchParams: {
        danjiID: router?.query?.danjiID ? (router.query.danjiID as string) : '',
        redirect: router?.query?.redirect ? (router.query.redirect as string) : '',
        userAddressID: `${selectedUserAddressID}`,
      },
    });
  }, [router, selectedUserAddressID]);

  const handleClickHome = useCallback(() => {
    router.popAll();
  }, [router]);

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handleClickAddMyAddress = () => {
    router.replace(Routes.MyAddress);
  };

  useEffect(() => {
    if (!userIsLoading && user && user?.hasAddress === false) {
      setShowInActivePopup(true);
    }
  }, [user, userIsLoading]);

  return (
    <AuthRequired ciRequired>
      <Panel width={panelWidth}>
        {!showInActivePopup &&
          (isLoading ? (
            <div tw="py-20">
              <Loading />
            </div>
          ) : (
            <ListingSelectAddress
              list={list}
              selectedUserAddressID={selectedUserAddressID}
              onClickNext={handleNext}
              onClickItem={handleClickItem}
              onClickAddMyAddress={handleClickAddMyAddress}
            />
          ))}

        {!showInActivePopup && isPopupOpen && (
          <OverlayPresenter>
            <ListingCreateGuidePopup ref={outsideRef} isPopupOpen={isPopupOpen} onClickClosePopup={handleClosePopup} />
          </OverlayPresenter>
        )}
      </Panel>

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
    </AuthRequired>
  );
});
