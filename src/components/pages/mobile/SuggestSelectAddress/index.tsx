import { memo, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { MobAuthRequired, MobileContainer } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { makeAddressDetail } from '@/utils/fotmat';

import useFetchMyAddressList from '@/services/my/useFetchMyAddressList';

import Routes from '@/router/routes';

import SelectAddress from '@/components/domains/listings/SelectAddress';

export default memo(() => {
  const router = useRouter();

  const [selectedUserAddressID, setSelectedUserAddressID] = useState<number>();

  const [selectedAddressDetail, setSelectedAddressDetail] = useState<string>();

  const [selectedFloor, setSelectedFloor] = useState<string>();

  const [showInActivePopup, setShowInActivePopup] = useState(false);

  const [isFetch, setIsFetch] = useState<boolean>(false);

  const { list } = useFetchMyAddressList({
    activeOnly: true,
    danjiID: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    isFetch,
  });

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

  const handleClickItem = useCallback(
    (id: number, ra = '', dn = '', dong = '', ho = '', floor = '') => {
      const ad = ra
        ? makeAddressDetail({ danjiName: dn, dong, ho })
        : `${ra} ${makeAddressDetail({ danjiName: dn, dong, ho })}`;

      if (selectedUserAddressID === id) {
        setSelectedUserAddressID(undefined);
        setSelectedAddressDetail('');
        setSelectedFloor('');
        return;
      }

      setSelectedUserAddressID(id);
      setSelectedAddressDetail(ad);
      setSelectedFloor(floor);
    },
    [selectedUserAddressID],
  );

  const handleNext = useCallback(() => {
    if (!selectedUserAddressID || !selectedAddressDetail) return;

    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestListingForm}`,
      query: {
        addressDetail: `${selectedAddressDetail}`,
        userAddressID: `${selectedUserAddressID}`,
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
        ...(selectedFloor ? { floor: `${selectedFloor}` } : {}),
      },
    });
  }, [router, selectedUserAddressID, selectedAddressDetail, selectedFloor]);

  const handleInActivePopupCTA = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}`);
  }, [router]);

  const handleClickAddMyAddress = () => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      query: {
        origin: router.asPath,
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
      },
    });
  };

  useEffect(() => {
    // 이정도 inactive한 컨디션은 둔다.
    if (!router?.query?.danjiID) {
      setShowInActivePopup(true);
      return;
    }

    setIsFetch(true);
  }, [router]);

  // 이정도 혹시나 모를 경우를 대비해서 Auth로 감싼다.

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        {!showInActivePopup && (
          <SelectAddress
            type="suggest"
            list={list}
            selectedUserAddressID={selectedUserAddressID}
            onClickNext={handleNext}
            onClickItemSuggest={handleClickItem}
            onClickAddMyAddress={handleClickAddMyAddress}
            onClickBack={handleClickBack}
          />
        )}
      </MobileContainer>

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
              <Popup.ActionButton onClick={handleInActivePopupCTA}>네고시오 홈으로 돌아가기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobAuthRequired>
  );
});
