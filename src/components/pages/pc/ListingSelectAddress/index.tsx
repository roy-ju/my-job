import { memo, useCallback, useRef, useState, useEffect } from 'react';

import { AuthRequired, Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { ListingCreateGuidePopup } from '@/components/organisms';

import { SelectAddressTemplate } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';

import useAuth from '@/hooks/services/useAuth';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const outsideRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuth();

  const [showGuidePopup, setShowGuidePopup] = useState(false);

  const [selectedUserAddressID, setSelectedUserAddressID] = useState<number>();

  const [showInActivePopup, setShowInActivePopup] = useState(false);

  const [isFetch, setIsFetch] = useState<boolean>(false);

  const { list } = useAPI_GetMyAddressList({
    activeOnly: true,
    danjiID: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    isFetch,
    exclude_duplicated_listing: true,
  });

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
        userAddressID: `${selectedUserAddressID}`,
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.redirect ? { danjiID: router.query.redirect as string } : {}),
      },
      state: {
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
      },
    });
  }, [router, selectedUserAddressID]);

  const handleClickHome = useCallback(() => {
    router.popAll();
  }, [router]);

  const handleCloseGuidePopup = useCallback(() => {
    setShowGuidePopup(false);
  }, []);

  const handleClickAddMyAddress = () => {
    router.replace(Routes.MyAddress, {
      searchParams: {
        origin: router.asPath,
        ...(router?.query?.danjiID ? { origin: router.asPath, danjiID: router.query.danjiID as string } : {}),
      },
    });
  };

  useEffect(() => {
    if (!user) {
      setShowInActivePopup(true);
      return;
    }

    if (user && !user.hasAddress && !user.hasNotVerifiedAddress) {
      setShowInActivePopup(true);
      return;
    }

    setIsFetch(true);
  }, [user]);

  useEffect(() => {
    if (list && list?.length > 0) {
      setShowGuidePopup(true);
    }
  }, [list]);

  return (
    <AuthRequired ciRequired>
      <Panel width={panelWidth}>
        {!showInActivePopup && (
          <SelectAddressTemplate
            type="listing"
            list={list}
            selectedUserAddressID={selectedUserAddressID}
            onClickNext={handleNext}
            onClickItem={handleClickItem}
            onClickAddMyAddress={handleClickAddMyAddress}
          />
        )}

        {showGuidePopup && (
          <OverlayPresenter>
            <ListingCreateGuidePopup
              ref={outsideRef}
              isPopupOpen={showGuidePopup}
              onClickClosePopup={handleCloseGuidePopup}
            />
          </OverlayPresenter>
        )}
      </Panel>

      {showInActivePopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">유효하지 않은 페이지입니다.</Popup.SubTitle>
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
