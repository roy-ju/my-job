import { useCallback, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import { VerifyStatus } from '@/constants/enums';

import Routes from '@/router/routes';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import { apiService } from '@/services';

import ErrorCodes from '@/constants/error_codes';

import { AddressListItem } from '@/services/sub-home/types';

import { searchAddress } from '@/lib/kakao/search_address';

export default function useVerifyingAddressHandler() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { mutate } = useAuth();

  const [verifyStatus, setVerifyStatus] = useState<number>(VerifyStatus.None);

  const [verifyingSeconds, setVerifyingSeconds] = useState<number>(30);

  const [verifyCompletedSeconds, setVerifyCompletedSeconds] = useState<number>(2);

  const [popup, setPopup] = useState<'alreadyExistAddress' | 'verifiedCountReachedLimit' | ''>('');

  const redirectSearchAddress = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.addressData;
      delete query.addressLine;
      delete query.dong;
      delete query.ho;
      delete query.errorCode;
      delete query.resultType;

      if (depth1 && depth2) {
        if (depth1 === Routes.MyAddressVerifying) {
          router.replace({
            pathname: `/${Routes.MyAddress}/${depth2}`,
            query: { ...query },
          });
        } else {
          router.replace({
            pathname: `/${depth1}/${Routes.MyAddress}`,
            query: { ...query },
          });
        }
      } else if (depth1 && !depth2) {
        router.replace({
          pathname: `/${Routes.MyAddress}`,
          query: { ...query },
        });
      }
      return;
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
    }
  }, [platform, router]);

  const redirectVerifyAddressResultTypeServiceErrorOrNotFoundAddress = useCallback(
    (errorcode: number) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        const convertedQuery = {
          ...query,
          ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
          ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
          ...(router?.query?.dong ? { dong: `${(router.query.dong as string).replaceAll('동', '')}` } : {}),
          ...(router?.query?.ho ? { ho: `${(router.query.ho as string).replaceAll('호', '')}` } : {}),
          resultType: errorcode === 1031 ? 'serviceError' : 'notFoundAddress',
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.MyAddressVerifying) {
            router.replace({ pathname: `/${Routes.MyAddressVerifyResult}/${depth2}`, query: convertedQuery });
          } else {
            router.replace({ pathname: `/${depth1}/${Routes.MyAddressVerifyResult}`, query: convertedQuery });
          }
        } else if (depth1 && !depth2) {
          router.replace({ pathname: `/${Routes.MyAddressVerifyResult}`, query: convertedQuery });
        }

        return;
      }

      if (platform === 'mobile') {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressVerifyResult}`,
          query: {
            ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
            ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
            ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
            ...(router?.query?.dong ? { dong: `${(router.query.dong as string).replaceAll('동', '')}` } : {}),
            ...(router?.query?.ho ? { ho: `${(router.query.ho as string).replaceAll('호', '')}` } : {}),
            errorCode: errorcode === 1031 ? 'serviceError' : 'notFoundAddress',
          },
        });
      }
    },
    [platform, router],
  );

  const redirectVerifyAddressResultTypeFindAddressOverTen = useCallback(
    (addressList: AddressListItem[]) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        const convertedQuery = {
          ...query,
          addressList: encodeURIComponent(JSON.stringify(addressList)),
          resultType: 'findAddressOverTen',
          ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
          ...(router?.query?.dong ? { dong: `${(router.query.dong as string).replaceAll('동', '')}` } : {}),
          ...(router?.query?.ho ? { ho: `${(router.query.ho as string).replaceAll('호', '')}` } : {}),
          ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.MyAddressVerifying) {
            router.replace({ pathname: `/${Routes.MyAddressVerifyResult}/${depth2}`, query: convertedQuery });
          } else {
            router.replace({ pathname: `/${depth1}/${Routes.MyAddressVerifyResult}`, query: convertedQuery });
          }
        } else if (depth1 && !depth2) {
          router.replace({ pathname: `/${Routes.MyAddressVerifyResult}`, query: convertedQuery });
        }
        return;
      }

      if (platform === 'mobile') {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressVerifyResult}`,
          query: {
            addressList: encodeURIComponent(JSON.stringify(addressList)),
            ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
            resultType: 'findAddressOverTen',
            ...(router?.query?.dong ? { dong: `${(router.query.dong as string).replaceAll('동', '')}` } : {}),
            ...(router?.query?.ho ? { ho: `${(router.query.ho as string).replaceAll('호', '')}` } : {}),
            ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
            ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
          },
        });
      }
    },
    [platform, router],
  );

  const verifedAddressCallbackIfSuccess = useCallback(async () => {
    if (platform === 'pc') {
      setVerifyStatus(VerifyStatus.Success);

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

  const verifyAddress = useCallback(async () => {
    if (!platform) return;

    const { addressData: inAddressData, dong, ho } = router.query;

    if (!inAddressData) {
      redirectSearchAddress();
      return;
    }

    const addressData = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;

    setVerifyStatus(VerifyStatus.Ing);

    const res = await apiService.myVerifyAddress({
      jibun_address: addressData.addressName,
      road_name_address: addressData.roadAddressName,
      dong: dong ? `${(dong as string).replaceAll('동', '')}` : '',
      ho: ho ? `${(ho as string).replaceAll('호', '')}` : '',
    });

    if (res?.error_code === ErrorCodes.CANNOT_VERIFIED_COUNT_REACHED_LIMIT) {
      setPopup('verifiedCountReachedLimit');
      return;
    }

    if (res?.error_code === ErrorCodes.ALREADY_REGISTERED_ADDRESS) {
      setPopup('alreadyExistAddress');
      return;
    }

    if (
      res?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI ||
      res?.error_code === ErrorCodes.INACCURATE_ADDRESS_DETAIL
    ) {
      redirectVerifyAddressResultTypeServiceErrorOrNotFoundAddress(res.error_code);
      return;
    }

    if (res?.address_list?.length && res.address_list.length > 1) {
      redirectVerifyAddressResultTypeFindAddressOverTen(res.address_list);
      return;
    }

    if (res?.address_list?.length === 1) {
      const verifiedAddress = res.address_list[0];
      const res2 = await searchAddress(addressData.roadAddressName);

      if (res2 && res2?.documents[0].address?.b_code) {
        const response = await apiService.myVerifyOwnership({
          realestate_unique_number: verifiedAddress.realestate_unique_number,
          address_detail: verifiedAddress.address_detail,
          bubjungdong_code: res2.documents[0].address.b_code,
          jibun_address: res2.documents[0].address.address_name,
          building_name: addressData.placeName,
          eubmyundong: res2.documents[0].address.region_3depth_name,
          lat: addressData.lat,
          long: addressData.lng,
          li: '',
          road_name_address: addressData.roadAddressName,
          sido: res2.documents[0].address.region_1depth_name,
          sigungu: res2.documents[0].address.region_2depth_name,
        });

        if (response?.error_code === ErrorCodes.ALREADY_REGISTERED_ADDRESS) {
          setPopup('alreadyExistAddress');
          return;
        }

        if (
          response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI ||
          response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI2
        ) {
          redirectVerifyAddressResultTypeServiceErrorOrNotFoundAddress(ErrorCodes.SYSTEM_ERROR_OUTERAPI);
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
    platform,
    router.query,
    redirectSearchAddress,
    redirectVerifyAddressResultTypeServiceErrorOrNotFoundAddress,
    redirectVerifyAddressResultTypeFindAddressOverTen,
    verifedAddressCallbackIfSuccess,
    verifedAddressCallbackIfFail,
  ]);

  const handleClosePopup = useCallback(() => {
    setPopup('');

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';

      const query = router.query;
      delete query.depth1;
      delete query.depth2;
      delete query.addressData;
      delete query.dong;
      delete query.ho;

      if (router?.query?.danjiID) {
        router.replace({ pathname: `/${depth1}`, query: { ...query } });
        return;
      }

      router.replace({ pathname: `/${Routes.My}`, query: { ...query } });
      return;
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  }, [platform, router]);

  useEffect(() => {
    if (verifyStatus === VerifyStatus.Ing) {
      if (verifyingSeconds === 0) return;

      const interval = setInterval(() => {
        setVerifyingSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [verifyStatus, verifyingSeconds]);

  useEffect(() => {
    if (verifyStatus === VerifyStatus.Success) {
      if (verifyCompletedSeconds === 0) return;

      const interval = setInterval(() => {
        setVerifyCompletedSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [verifyStatus, verifyCompletedSeconds]);

  useEffect(() => {
    if (platform) {
      verifyAddress();
    }
  }, [platform, router, verifyAddress]);

  return { verifyStatus, verifyingSeconds, verifyCompletedSeconds, popup, handleClosePopup };
}
