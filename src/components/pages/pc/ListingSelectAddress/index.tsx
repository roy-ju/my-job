import { AuthRequired, Panel } from '@/components/atoms';
import { SelectAddressTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useAuth } from '@/hooks/services';
import { ListingCreateGuidePopup } from '@/components/organisms';
import danjiUserAddressCheck from '@/apis/danji/danjiUserAddressCheck';

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
  const [showNoDanjiOwnerPopup, setShowNoDanjiOwnerPopup] = useState(false);
  const [showNoListingsPopup, setShowNoListingsPopup] = useState(false);

  const [isFetch, setIsFetch] = useState<boolean>(false);

  const { list } = useAPI_GetMyAddressList({
    activeOnly: true,
    danjiID: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    isFetch,
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
    });
  }, [router, selectedUserAddressID]);

  const handleClickHome = useCallback(() => {
    router.popAll();
  }, [router]);

  const handleCloseGuidePopup = useCallback(() => {
    setShowGuidePopup(false);
  }, []);

  const handleCloseNoDanjiOwnerPopup = useCallback(async () => {
    await router.pop();
    setShowNoDanjiOwnerPopup(false);
  }, [router]);

  const handleCloseNoListingsPopup = useCallback(async () => {
    await router.pop();
    setShowNoListingsPopup(false);
  }, [router]);

  const handleClickAddMyAddress = () => {
    router.replace(Routes.MyAddress, {
      searchParams: {
        origin: router.asPath,
        ...(router?.query?.danjiID ? { origin: router.asPath, danjiID: router.query.danjiID as string } : {}),
      },
    });
  };

  useEffect(() => {
    async function checkEligibleDanjiListingOwner(danjiID: number) {
      const res = await danjiUserAddressCheck({ danji_id: danjiID });

      if (res?.has_user_address === false) {
        setShowNoDanjiOwnerPopup(true);
        return;
      }

      if (res?.has_user_address === true && res?.can_create_listing === false) {
        setShowNoListingsPopup(true);
        return;
      }

      setIsFetch(true);
      setShowGuidePopup(true);
    }

    // 유저는 존재하는데 집주소 등록된게 없으면 직접적으로 url을 쳐서 들어온 케이스
    if (user && !router?.query?.danjiID && user?.hasAddress === false) {
      setShowInActivePopup(true);
      return;
    }

    // 유저는 존재하는데 집주소 등록된게 있고 단지 ID가 없을때 단지를 통해 들어온 케이스가 아닐때
    if (user && !router?.query?.danjiID && user?.hasAddress === true) {
      setIsFetch(true);
      setShowGuidePopup(true);
      return;
    }

    // 유저는 존재하는데 집주소 등록된게 있고 단지 ID가 있을때 단지를 통해 들어온 케이스 일떄
    if (router?.query?.danjiID && user) {
      const di = Number(router.query.danjiID);

      checkEligibleDanjiListingOwner(di);
    }
  }, [user, router]);

  return (
    <AuthRequired ciRequired>
      <Panel width={panelWidth}>
        {!showInActivePopup && !showNoDanjiOwnerPopup && !showNoListingsPopup && (
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

      {showNoDanjiOwnerPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">
                이 단지의 집주인만 매물등록이 가능합니다.
                <br />
                우리집을 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCloseNoDanjiOwnerPopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleClickAddMyAddress}>인증하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {showNoListingsPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">
                추가로 매물등록이 가능한 우리집 정보가 없습니다.
                <br />
                우리집을 추가 인증하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCloseNoListingsPopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleClickAddMyAddress}>인증하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </AuthRequired>
  );
});
