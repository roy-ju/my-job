import deleteMyAddress from '@/apis/my/deleteMyAddress';
import useAPI_GetMyAddressList from '@/apis/my/getMyAddressList';
import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { MyRegisteredHomes } from '@/components/templates';
import { useAuth } from '@/hooks/services';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type UserAddressIInfo = {
  id?: number;
  address?: string;
};

export default memo(() => {
  const router = useRouter();

  const { user, isLoading, mutate: authMutate } = useAuth();
  const { list, mutate } = useAPI_GetMyAddressList();

  const [showInActivePopup, setShowInActivePopup] = useState(false);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);

  const [userAddressInfo, setUserAddressInfo] = useState<UserAddressIInfo>();

  const handleOpenDeletePopup = useCallback((id?: number, address?: string) => {
    setUserAddressInfo({ id, address });
    setShowDeleteConfirmPopup(true);
  }, []);

  const handleCloseDeletePopup = useCallback(() => {
    setUserAddressInfo(undefined);
    setShowDeleteConfirmPopup(false);
  }, []);

  const handleDeleteAddress = useCallback(async () => {
    if (!userAddressInfo?.id) return;

    await deleteMyAddress({ user_address_id: userAddressInfo.id });

    if (list?.length === 1) {
      await router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
      await authMutate();
    }

    toast.success('등록한 우리집을 삭제했습니다.');
    setUserAddressInfo(undefined);
    await mutate();
  }, [userAddressInfo?.id, list?.length, setUserAddressInfo, mutate, authMutate, router]);

  const handleClickSendSMS = useCallback(
    (id: number, roadNameAddress?: string, addressDetail?: string) => {
      if (!id) return;

      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressAgreement}`,
          query: {
            userAddressID: `${id}`,
            resend: 'true',
            roadNameAddress: roadNameAddress || '',
            addressDetail: addressDetail || '',
          },
        },
        `/${Routes.EntryMobile}/${Routes.MyAddressAgreement}`,
      );
    },
    [router],
  );

  const handleClickAddMyAddress = useCallback(() => {
    router.replace(Routes.MyAddress);
  }, [router]);

  const handleClickHome = useCallback(() => {
    router.replace(Routes.My);
  }, [router]);

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
      }
    }
  }, [router]);

  useEffect(() => {
    if (typeof user?.hasAddress === 'boolean' && user?.hasAddress === false) {
      setShowInActivePopup(true);
    }
  }, [user, isLoading]);

  return (
    <>
      <MobAuthRequired ciRequired>
        <MobileContainer>
          {isLoading ? (
            <div tw="py-20">
              <Loading />
            </div>
          ) : (
            user?.hasAddress && (
              <MyRegisteredHomes
                list={list}
                onClickBack={handleClickBack}
                onClickSendSMS={handleClickSendSMS}
                onClickDeleteIcon={handleOpenDeletePopup}
                onClickAddMyAddress={handleClickAddMyAddress}
              />
            )
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
                <Popup.ActionButton onClick={handleClickHome}>마이페이지로 돌아가기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}

        {showDeleteConfirmPopup && userAddressInfo?.address && userAddressInfo?.id && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="py-6 gap-2">
                <Popup.Title>등록된 우리집을 삭제하시겠습니까?</Popup.Title>
                <div tw="flex gap-1 font-bold">
                  <Popup.Body tw="text-nego-1000 whitespace-nowrap">등록된 주소 :</Popup.Body>
                  <Popup.Body tw="text-nego-1000">{userAddressInfo.address}</Popup.Body>
                </div>
                <Popup.Body tw="text-justify">
                  기존에 추천, 혹은 등록된 매물은 계속 거래 가능합니다.
                  <br />
                  신규추천이나 매물등록을 위해서는 우리집등록을 다시 진행하셔야 합니다.
                </Popup.Body>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.CancelButton onClick={handleCloseDeletePopup}>취소</Popup.CancelButton>
                <Popup.ActionButton onClick={handleDeleteAddress}>확인</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </MobAuthRequired>
    </>
  );
});
