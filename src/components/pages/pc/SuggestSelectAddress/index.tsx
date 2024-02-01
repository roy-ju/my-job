import { memo, useCallback, useEffect, useState } from 'react';

import { AuthRequired, Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { SelectAddressTemplate } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import { makeAddressDetail } from '@/utils/fotmat';

import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';

import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const [selectedUserAddressID, setSelectedUserAddressID] = useState<number>();

  const [selectedAddressDetail, setSelectedAddressDetail] = useState<string>();

  const [selectedFloor, setSelectedFloor] = useState<string>();

  const [showInActivePopup, setShowInActivePopup] = useState(false);

  const [isFetch, setIsFetch] = useState<boolean>(false);

  const { list } = useAPI_GetMyAddressList({
    activeOnly: true,
    danjiID: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    isFetch,
  });

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

    router.replace(Routes.SuggestListingForm, {
      searchParams: {
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
    router.popAll();
  }, [router]);

  const handleClickAddMyAddress = () => {
    router.replace(Routes.MyAddress, {
      searchParams: {
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
    <AuthRequired ciRequired>
      <Panel width={panelWidth}>
        {!showInActivePopup && (
          <SelectAddressTemplate
            type="suggest"
            list={list}
            selectedUserAddressID={selectedUserAddressID}
            onClickNext={handleNext}
            onClickItemSuggest={handleClickItem}
            onClickAddMyAddress={handleClickAddMyAddress}
          />
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
              <Popup.ActionButton onClick={handleInActivePopupCTA}>네고시오 홈으로 돌아가기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </AuthRequired>
  );
});
