import { useState, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import { apiService } from '@/services';

import { VerifyStatus } from '@/constants/enums';

import Routes from '@/router/routes';

import ErrorCodes from '@/constants/error_codes';

import { AddressListItem } from '@/services/sub-home/types';

import { searchAddress } from '@/lib/kakao/search_address';

export type PopupProps =
  | 'startCreateDocumentPopup'
  | 'verifyAddressExceedMaxCountPopup'
  | 'remainingCountZeroPopup'
  | '';

export default function useVerifyingAddressHandler() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [verifyStatus, setVerifyStatus] = useState<number>(VerifyStatus.None);

  const [verifyingSeconds, setVerifyingSeconds] = useState<number>(30);

  const [popup, setPopup] = useState<PopupProps>('');

  const handleOpenPopup = useCallback((v: PopupProps) => {
    setPopup(v);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup('');
  }, []);

  const handleRedirectRealestateDocumentList = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.dong;
      delete query.ho;
      delete query.addressData;

      if (depth1 && depth2) {
        if (depth1 === Routes.RealestateDocumentAddressVerifying) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentList}/${depth2}`,
            query: {
              ...query,
            },
          });
        } else {
          router.replace({
            pathname: `/${depth1}/${Routes.RealestateDocumentList}`,
            query: {
              ...query,
            },
          });
        }
      } else if (depth1 && !depth2) {
        router.replace({
          pathname: `/${Routes.RealestateDocumentList}`,
          query: {
            ...query,
          },
        });
      }
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`);
    }
  }, [platform, router]);

  const handleConfirmStartCreateDocumentPopup = useCallback(async () => {
    handleClosePopup();
    toast.success('등기부 조회를 시작해요.');

    if (platform === 'pc') {
      handleRedirectRealestateDocumentList();
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`);
    }
  }, [handleClosePopup, handleRedirectRealestateDocumentList, platform, router]);

  const handleConfirmVerifyAddressExceedMaxCountPopup = useCallback(() => {
    handleClosePopup();

    if (platform === 'pc') {
      handleRedirectRealestateDocumentList();
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`);
    }
  }, [handleClosePopup, handleRedirectRealestateDocumentList, platform, router]);

  const redirectSearchAddress = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.addressData;
      delete query.dong;
      delete query.ho;

      if (depth1 && depth2) {
        if (depth1 === Routes.RealestateDocumentAddressVerifying) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentSearchAddress}/${depth2}`,
            query: { ...query },
          });
        } else {
          router.replace({
            pathname: `/${depth1}/${Routes.RealestateDocumentSearchAddress}`,
            query: { ...query },
          });
        }
      } else if (depth1 && !depth2) {
        router.replace({
          pathname: `/${Routes.RealestateDocumentSearchAddress}`,
          query: { ...query },
        });
      }
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentSearchAddress}`);
    }
  }, [platform, router]);

  const redirectVerifyAddressResultTypeServiceError = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.addressData;
      delete query.dong;
      delete query.ho;

      if (depth1 && depth2) {
        if (depth1 === Routes.RealestateDocumentAddressVerifying) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentAddressVerifyResult}/${depth2}`,
            query: { ...query, resultType: 'serviceError' },
          });
        } else {
          router.replace({
            pathname: `/${depth1}/${Routes.RealestateDocumentAddressVerifyResult}`,
            query: { ...query, resultType: 'serviceError' },
          });
        }
      } else if (depth1 && !depth2) {
        router.replace({
          pathname: `/${Routes.RealestateDocumentAddressVerifyResult}`,
          query: { ...query, resultType: 'serviceError' },
        });
      }
    }

    if (platform === 'mobile') {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentAddressVerifyResult}`,
        query: { resultType: 'serviceError' },
      });
    }
  }, [platform, router]);

  const redirectVerifyAddressResultTypeNotFoundAddress = useCallback(
    (remainingCount: string | number) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.RealestateDocumentAddressVerifying) {
            router.replace({
              pathname: `/${Routes.RealestateDocumentAddressVerifyResult}/${depth2}`,
              query: { ...query, resultType: 'notFoundAddress', remainingCount: `${remainingCount}` },
            });
          } else {
            router.replace({
              pathname: `/${depth1}/${Routes.RealestateDocumentAddressVerifyResult}`,
              query: { ...query, resultType: 'notFoundAddress', remainingCount: `${remainingCount}` },
            });
          }
        } else if (depth1 && !depth2) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentAddressVerifyResult}`,
            query: { ...query, resultType: 'notFoundAddress', remainingCount: `${remainingCount}` },
          });
        }
      }

      if (platform === 'mobile') {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentAddressVerifyResult}`,
          query: { ...router.query, resultType: 'notFoundAddress', remainingCount: `${remainingCount}` },
        });
      }
    },
    [platform, router],
  );

  const redirectVerifyAddressResultTypeFindAddressOverTen = useCallback(
    (item: AddressListItem[]) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.RealestateDocumentAddressVerifying) {
            router.replace({
              pathname: `/${Routes.RealestateDocumentAddressVerifyResult}/${depth2}`,
              query: {
                ...query,
                resultType: 'findAddressOverTen',
                addressList: encodeURIComponent(JSON.stringify(item)),
              },
            });
          } else {
            router.replace({
              pathname: `/${depth1}/${Routes.RealestateDocumentAddressVerifyResult}`,
              query: {
                ...query,
                resultType: 'findAddressOverTen',
                addressList: encodeURIComponent(JSON.stringify(item)),
              },
            });
          }
        } else if (depth1 && !depth2) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentAddressVerifyResult}`,
            query: {
              ...query,
              resultType: 'findAddressOverTen',
              addressList: encodeURIComponent(JSON.stringify(item)),
            },
          });
        }
      }

      if (platform === 'mobile') {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentAddressVerifyResult}`,
          query: {
            ...router.query,
            resultType: 'findAddressOverTen',
            addressList: encodeURIComponent(JSON.stringify(item)),
          },
        });
      }
    },
    [platform, router],
  );

  const verifyAddress = useCallback(async () => {
    const { addressData: inAddressData, dong, ho } = router.query;

    if (!inAddressData) {
      redirectSearchAddress();
      return;
    }

    const addressData = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;

    setVerifyStatus(VerifyStatus.Ing);

    const response = await apiService.subhomeVerifyAddress({
      jibun_address: addressData.addressName,
      road_name_address: addressData.roadAddressName,
      dong: dong ? `${(dong as string).replaceAll('동', '')}` : '',
      ho: ho ? `${(ho as string).replaceAll('호', '')}` : '',
    });

    if (response?.error_code === ErrorCodes.CANNOT_VERIFIED_COUNT_REACHED_LIMIT) {
      handleOpenPopup?.('verifyAddressExceedMaxCountPopup');
      return;
    }

    if (response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI) {
      redirectVerifyAddressResultTypeServiceError();
      return;
    }

    if (response?.error_code === ErrorCodes.INACCURATE_ADDRESS_DETAIL_2) {
      redirectVerifyAddressResultTypeNotFoundAddress(response?.fields?.remaining_count ?? 0);
      return;
    }

    if (response?.address_list?.length && response?.address_list?.length > 1) {
      redirectVerifyAddressResultTypeFindAddressOverTen(response.address_list);
      return;
    }

    if (response?.address_list?.length === 1) {
      const selectedAddress = response.address_list[0];

      const oResponse = await searchAddress(addressData.roadAddressName);

      if (oResponse && oResponse?.documents[0].address?.b_code) {
        const response2 = await apiService.subhomeRealestatedocumentGet({
          realestate_unique_number: selectedAddress.realestate_unique_number,
          address_detail: selectedAddress.address_detail,
          bubjungdong_code: oResponse.documents[0].address.b_code,
          jibun_address: oResponse.documents[0].address.address_name,
          building_name: addressData.placeName,
          eubmyundong: oResponse.documents[0].address.region_3depth_name,
          lat: addressData.lat,
          long: addressData.lng,
          li: '',
          road_name_address: addressData.roadAddressName,
          sido: oResponse.documents[0].address.region_1depth_name,
          sigungu: oResponse.documents[0].address.region_2depth_name,
        });

        if (response2?.error_code === ErrorCodes.MAXCOUNT_REALESTATE_DOCUMENT_GET) {
          handleOpenPopup?.('remainingCountZeroPopup');
          return;
        }

        if (response2 === null) {
          setTimeout(() => {
            handleOpenPopup?.('startCreateDocumentPopup');
          }, 200);
        }
      }
    }
  }, [
    handleOpenPopup,
    redirectSearchAddress,
    redirectVerifyAddressResultTypeFindAddressOverTen,
    redirectVerifyAddressResultTypeNotFoundAddress,
    redirectVerifyAddressResultTypeServiceError,
    router?.query,
  ]);

  useEffect(() => {
    if (platform) {
      verifyAddress();
    }
  }, [platform, router, verifyAddress]);

  useEffect(() => {
    if (verifyStatus === VerifyStatus.Ing) {
      if (verifyingSeconds === 0) {
        redirectVerifyAddressResultTypeServiceError();
        return;
      }

      const interval = setInterval(() => {
        setVerifyingSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [redirectVerifyAddressResultTypeServiceError, verifyStatus, verifyingSeconds]);

  return {
    popup,
    handleRedirectRealestateDocumentList,
    handleConfirmStartCreateDocumentPopup,
    handleConfirmVerifyAddressExceedMaxCountPopup,
  };
}
