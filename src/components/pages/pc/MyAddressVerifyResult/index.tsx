import { memo, useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useRouter as useNextRouter } from 'next/router';

import { Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { MyAddressVerifying, MyAddressVerifyResult } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import useAuth from '@/hooks/services/useAuth';

import verifyOwnership from '@/apis/my/verifyOwnership';

import { searchAddress } from '@/lib/kakao/search_address';

import ErrorCodes from '@/constants/error_codes';

import { VerifyStatus } from '@/constants/enums';

import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth: string;
}

type AddressData = {
  addressName?: string;
  categoryName?: string;
  id?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  roadAddressName?: string;
};

type AddressListItem = {
  address_detail?: string;
  full_road_name_address?: string;
  realestate_unique_number?: string;
};

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const { mutate } = useAuth();

  const [addressData, setAddressData] = useState<AddressData>();
  const [addressList, setAddressList] = useState<AddressListItem[]>();
  const [errorCode, setErrorCode] = useState<string>();
  const [selectedItemID, setSelectedItemID] = useState<string>();

  const [popup, setPopup] = useState<'alreadyExistAddress' | 'invalidAccess' | ''>('');

  const [dong, setDong] = useState<string>('');
  const [ho, setHo] = useState<string>('');

  const [verifyStatus, setVerifyStatus] = useState<number>(VerifyStatus.None);
  const [verifyCompletedSeconds, setVerifyCompletedSeconds] = useState<number>(2);

  const reset = useCallback(() => {
    setAddressData(undefined);
    setAddressList(undefined);
    setSelectedItemID(undefined);
    setDong('');
    setHo('');
    setVerifyStatus(VerifyStatus.None);
    setVerifyCompletedSeconds(2);
  }, []);

  const handleClickSystemErrorCTA = useCallback(() => {
    if (router?.query?.danjiID || router?.query?.suggestID) {
      router.pop();
    } else {
      nextRouter.replace(`/${Routes.My}?default=2`);
    }
  }, [nextRouter, router]);

  const handleClickInaccurateAddressDetailCTA = useCallback(() => {
    router.replace(Routes.MyAddress, {
      searchParams: {
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
      },
      state: {
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router]);

  const handleClickMultipleItem = useCallback(
    (id?: string) => {
      if (id === selectedItemID) {
        setSelectedItemID(undefined);
        return;
      }
      setSelectedItemID(id);
    },
    [selectedItemID],
  );

  const handleClosePopup = useCallback(
    (value: 'alreadyExistAddress' | 'invalidAccess') => {
      setPopup('');

      if (value === 'alreadyExistAddress') {
        router.replace(Routes.MyRegisteredHomes, {
          searchParams: {
            ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
          },
          state: {
            ...(router.query.origin
              ? {
                  origin: router.query.origin as string,
                }
              : {}),
          },
        });
      } else if (value === 'invalidAccess') {
        nextRouter.replace(`/`);
      }
    },
    [nextRouter, router],
  );

  const handleClickMultipleItemCTA = useCallback(
    async (id?: string) => {
      const selectedAddress = addressList?.filter((ele) => ele.realestate_unique_number === id)[0];

      if (selectedAddress && addressData?.roadAddressName) {
        const responseKakao = await searchAddress(addressData.roadAddressName);

        if (
          responseKakao &&
          responseKakao.documents[0].address?.b_code &&
          selectedAddress.realestate_unique_number &&
          selectedAddress.address_detail &&
          addressData.lat &&
          addressData.lng
        ) {
          const response = await verifyOwnership({
            realestate_unique_number: selectedAddress.realestate_unique_number,
            address_detail: selectedAddress.address_detail,
            bubjungdong_code: responseKakao.documents[0].address.b_code,
            jibun_address: responseKakao.documents[0].address.address_name,
            building_name: responseKakao.documents[0].road_address?.building_name ?? '',
            eubmyundong: responseKakao.documents[0].address.region_3depth_name,
            lat: addressData.lat,
            long: addressData.lng,
            li: '',
            road_name_address: addressData.roadAddressName,
            sido: responseKakao.documents[0].address.region_1depth_name,
            sigungu: responseKakao.documents[0].address.region_2depth_name,
          });

          if (response?.error_code === ErrorCodes.ALREADY_REGISTERED_ADDRESS) {
            setPopup('alreadyExistAddress');

            return;
          }

          if (
            response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI ||
            response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI2
          ) {
            setErrorCode(ErrorCodes.SYSTEM_ERROR_OUTERAPI.toString());
            reset();

            return;
          }

          if (response?.verified === true) {
            await setVerifyStatus(VerifyStatus.Success);
            setErrorCode('');
            setTimeout(() => {
              mutate();
              toast.success('우리집 등록이 완료 되었습니다!');

              router.replace(Routes.MyRegisteredHomes, {
                searchParams: {
                  ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
                  ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
                },
                state: {
                  ...(router.query.origin
                    ? {
                        origin: router.query.origin as string,
                      }
                    : {}),
                },
              });
            }, 1000);

            return;
          }

          if (response?.verified === false) {
            await mutate();

            setErrorCode('');

            router.replace(Routes.MyAddressAgreement, {
              searchParams: {
                ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
                ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
              },
              state: {
                addressData: router.query.addressData as string,
                addressDetail: selectedAddress.address_detail,
                userAddressID: `${response?.user_address_id}`,
                dong: dong ? `${(dong as string).replaceAll('동', '')}` : '',
                ho: ho ? `${(ho as string).replaceAll('호', '')}` : '',
                ...(router.query.origin
                  ? {
                      origin: router.query.origin as string,
                    }
                  : {}),
              },
            });
          }
        }
      }
    },
    [addressList, addressData, reset, mutate, router, dong, ho],
  );

  useEffect(() => {
    if (!router?.query?.addressData) {
      setPopup('invalidAccess');
      return;
    }

    if (router?.query?.addressData) {
      const addressD = JSON.parse(decodeURIComponent(router.query.addressData as string));
      setAddressData(addressD);
    }

    if (router?.query?.addressList) {
      const addressLi = JSON.parse(decodeURIComponent(router.query.addressList as string));
      setAddressList(addressLi);
    }

    if (router?.query?.errorCode) {
      setErrorCode(router.query.errorCode as string);
    }

    if (router?.query?.dong) {
      setDong(router.query.dong as string);
    }

    if (router?.query?.ho) {
      setHo(router.query.ho as string);
    }
  }, [router]);

  useEffect(() => {
    if (verifyStatus === VerifyStatus.Success) {
      if (verifyCompletedSeconds === 0) return;

      const interval = setInterval(() => {
        setVerifyCompletedSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [verifyStatus, verifyCompletedSeconds]);

  return (
    <Panel width={panelWidth}>
      {verifyStatus !== VerifyStatus.Success && (
        <MyAddressVerifyResult
          addressData={addressData}
          addressList={addressList}
          dong={dong}
          ho={ho}
          errorCode={errorCode}
          selectedItemID={selectedItemID}
          onClickSystemErrorCTA={handleClickSystemErrorCTA}
          onClickInaccurateAddressDetailCTA={handleClickInaccurateAddressDetailCTA}
          onClickMultipleItem={handleClickMultipleItem}
          onClickMultipleItemCTA={handleClickMultipleItemCTA}
        />
      )}

      {verifyStatus === VerifyStatus.Success && (
        <MyAddressVerifying verifyStatus={verifyStatus} verifyCompletedSeconds={verifyCompletedSeconds} />
      )}

      {popup === 'invalidAccess' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">유효하지 않은 접근입니다.</Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => handleClosePopup('invalidAccess')}>
                네고시오 홈으로 돌아가기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {popup === 'alreadyExistAddress' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SmallTitle tw="text-center">
                동일한 주소지로
                <br />
                우리집 등록이 되어있습니다.
              </Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => handleClosePopup('alreadyExistAddress')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
