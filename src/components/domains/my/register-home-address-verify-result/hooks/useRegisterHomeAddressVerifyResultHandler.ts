import { useState, useMemo, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import {
  AddressData,
  AddressListItem,
} from '@/components/domains/realestate-helper/realestate-document-verify-result/types';

import useAuth from '@/hooks/services/useAuth';

import ErrorCodes from '@/constants/error_codes';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { searchAddress } from '@/lib/kakao/search_address';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import { VerifyStatus } from '@/constants/enums';

import { toast } from 'react-toastify';
import { PopupProps } from './usePopupsHandler';

export default function useRegisterHomeAddressVerifyResultHandler({
  type,
  handleUpdateType,
  handleOpenPopup,
}: {
  type: '' | 'findAddressOverTen' | 'notFoundAddress' | 'serviceError';
  handleUpdateType: (v: '' | 'findAddressOverTen' | 'notFoundAddress' | 'serviceError') => void;
  handleOpenPopup: (v: PopupProps) => void;
}) {
  const [ownerShipLoading, setOwnerShipLoading] = useState(false);

  const { mutate } = useAuth();

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [addressData, setAddressData] = useState<AddressData>();

  const [addressList, setAddressList] = useState<AddressListItem[]>();

  const [dong, setDong] = useState<string>('');

  const [ho, setHo] = useState<string>('');

  const [selectedItemID, setSelectedItemID] = useState<string>();

  const [verifyStatus, setVerifyStatus] = useState<number>(VerifyStatus.None);
  const [verifyCompletedSeconds, setVerifyCompletedSeconds] = useState<number>(2);

  const subTitle = useMemo(() => {
    if (addressData?.placeName && dong && ho) {
      return `${addressData.placeName} ${dong}동 ${ho}호`;
    }

    if (addressData?.placeName && !dong && ho) {
      return `${addressData.placeName} ${ho}호`;
    }

    if (addressData?.placeName && dong && !ho) {
      return `${addressData.placeName} ${dong}동`;
    }

    if (addressData?.placeName && !dong && !ho) {
      return `${addressData.placeName}`;
    }

    if (!addressData?.placeName && dong && ho) {
      return `${dong}동 ${ho}호`;
    }

    if (!addressData?.placeName && dong && !ho) {
      return `${dong}동 `;
    }

    if (!addressData?.placeName && !dong && ho) {
      return `${ho}호`;
    }

    return '';
  }, [addressData, dong, ho]);

  const selectedAddress = useMemo(
    () => addressList?.filter((ele) => ele.realestate_unique_number === selectedItemID)[0],
    [addressList, selectedItemID],
  );

  const handleClickListItem = useCallback(
    (id?: string) => {
      if (id === selectedItemID) {
        setSelectedItemID(undefined);
        return;
      }
      setSelectedItemID(id);
    },
    [selectedItemID],
  );

  const handleClickCtasIfServiceErrorOrNotFoundAddress = useCallback(async () => {
    if (type === 'notFoundAddress') {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;
        delete query.addressData;
        delete query.addressList;
        delete query.dong;
        delete query.ho;
        delete query.errorCode;
        delete query.resultType;

        if (depth1 && depth2) {
          if (depth1 === Routes.MyAddressVerifyResult) {
            router.replace({ pathname: `/${Routes.MyAddress}/${depth2}`, query: { ...query } });
          } else {
            router.replace({ pathname: `/${depth1}/${Routes.MyAddress}`, query: { ...query } });
          }
        } else if (depth1 && !depth2) {
          router.replace({ pathname: `/${Routes.MyAddress}`, query: { ...query } });
        }

        return;
      }

      if (platform === 'mobile') {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
          query: {
            ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
            ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
          },
        });
      }

      return;
    }

    if (type === 'serviceError') {
      if (platform === 'pc') {
        if (router?.query?.danjiID || router?.query?.suggestID) {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth2 ?? '';
          const query = router.query;

          delete query.depth1;
          delete query.depth2;
          delete query.addressData;
          delete query.addressList;
          delete query.dong;
          delete query.ho;
          delete query.errorCode;
          delete query.resultType;

          if (depth1 && depth2) {
            if (depth1 === Routes.MyAddressVerifyResult) {
              router.replace({ pathname: `/${depth2}`, query: { ...query } });
            } else {
              router.replace({ pathname: `/${depth1}`, query: { ...query } });
            }
          } else if (depth1 && !depth2) {
            router.replace(`/`);
          }
        } else {
          router.replace(`/${Routes.My}?default=2`);
        }
        return;
      }

      if (platform === 'mobile') {
        if (router?.query?.origin) {
          router.replace(router.query.origin as string);
          return;
        }

        router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
      }
    }
  }, [platform, router, type]);

  const verifedAddressCallbackIfSuccess = useCallback(async () => {
    if (platform === 'pc') {
      await setVerifyStatus(VerifyStatus.Success);

      mutate(false);

      toast.success('우리집 등록이 완료 되었습니다!');

      setTimeout(() => {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;
        delete query.addressData;
        delete query.addressList;
        delete query.dong;
        delete query.ho;
        delete query.errorCode;
        delete query.resultType;

        const convertedQuery = {
          ...query,
          ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.MyAddressVerifying) {
            router.replace({ pathname: `/${Routes.MyRegisteredHomes}/${depth2}`, query: convertedQuery });
          } else {
            router.replace({ pathname: `/${depth1}/${Routes.MyRegisteredHomes}`, query: convertedQuery });
          }
        } else if (depth1 && !depth2) {
          router.replace({ pathname: `/${Routes.MyRegisteredHomes}`, query: convertedQuery });
        }
      }, 1000);

      return;
    }

    if (platform === 'mobile') {
      await setVerifyStatus(VerifyStatus.Success);

      setTimeout(() => {
        mutate(false);

        toast.success('우리집 등록이 완료 되었습니다!');

        router.replace(`/${Routes.EntryMobile}/${Routes.MyRegisteredHomes}`);
      }, 1000);
    }
  }, [mutate, platform, router]);

  const verifedAddressCallbackIfFail = useCallback(
    async (id: number) => {
      if (platform === 'pc') {
        mutate();

        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;
        delete query.addressList;
        delete query.errorCode;
        delete query.resultType;

        const convertedQuery = {
          ...query,
          userAddressID: `${id}`,
          ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.MyAddressVerifying) {
            router.replace({ pathname: `/${Routes.MyAddressAgreement}/${depth2}`, query: convertedQuery });
          } else {
            router.replace({ pathname: `/${depth1}/${Routes.MyAddressAgreement}`, query: convertedQuery });
          }
        } else if (depth1 && !depth2) {
          router.replace({ pathname: `/${Routes.MyAddressAgreement}`, query: convertedQuery });
        }
      }

      if (platform === 'mobile') {
        await mutate();

        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressAgreement}`,
          query: {
            userAddressID: `${id}`,
            ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
            ...(router?.query?.dong ? { dong: `${(router.query.dong as string).replaceAll('동', '')}` } : {}),
            ...(router?.query?.ho ? { ho: `${(router.query.ho as string).replaceAll('호', '')}` } : {}),
            ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
            ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
          },
        });
      }
    },
    [mutate, platform, router],
  );

  const handleClickCtsaIfFindAddressOverTen = useCallback(async () => {
    if (selectedAddress && addressData?.roadAddressName) {
      const kakaoResponse = await searchAddress(addressData.roadAddressName);

      if (
        kakaoResponse &&
        kakaoResponse.documents[0].address?.b_code &&
        selectedAddress.realestate_unique_number &&
        addressData?.lat &&
        addressData?.lng
      ) {
        setOwnerShipLoading(true);

        const response = await apiService.myVerifyOwnership({
          realestate_unique_number: selectedAddress.realestate_unique_number,
          address_detail: selectedAddress?.address_detail ?? '',
          bubjungdong_code: kakaoResponse.documents[0].address.b_code,
          jibun_address: kakaoResponse.documents[0].address.address_name,
          building_name: kakaoResponse.documents[0].road_address?.building_name ?? '',
          eubmyundong: kakaoResponse.documents[0].address.region_3depth_name,
          lat: addressData.lat,
          long: addressData.lng,
          li: '',
          road_name_address: addressData.roadAddressName,
          sido: kakaoResponse.documents[0].address.region_1depth_name,
          sigungu: kakaoResponse.documents[0].address.region_2depth_name,
        });

        setOwnerShipLoading(false);

        if (response?.error_code === ErrorCodes.ALREADY_REGISTERED_ADDRESS) {
          handleOpenPopup('alreadyExistAddress');

          return;
        }

        if (
          response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI ||
          response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI2
        ) {
          handleUpdateType('serviceError');
          return;
        }

        if (response?.verified === true) {
          verifedAddressCallbackIfSuccess();
          return;
        }

        if (response?.verified === false) {
          verifedAddressCallbackIfFail(response.user_address_id);
        }
      }
    }
  }, [
    addressData,
    handleOpenPopup,
    handleUpdateType,
    selectedAddress,
    verifedAddressCallbackIfFail,
    verifedAddressCallbackIfSuccess,
  ]);

  useEffect(() => {
    if (!router?.query?.addressData) {
      handleOpenPopup('invalidAccess');
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

    if (router?.query?.dong) {
      setDong(router.query.dong as string);
    }

    if (router?.query?.ho) {
      setHo(router.query.ho as string);
    }
  }, [handleOpenPopup, router]);

  useEffect(() => {
    if (verifyStatus === VerifyStatus.Success) {
      if (verifyCompletedSeconds === 0) return;

      const interval = setInterval(() => {
        setVerifyCompletedSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [verifyStatus, verifyCompletedSeconds]);

  return {
    ownerShipLoading,
    verifyStatus,
    verifyCompletedSeconds,
    title: addressData?.roadAddressName ?? '',
    subTitle,
    addressList,
    selectedItemID,
    handleClickListItem,
    handleClickCtasIfServiceErrorOrNotFoundAddress,
    handleClickCtsaIfFindAddressOverTen,
  };
}
