import { useState, useEffect, useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { searchAddress } from '@/lib/kakao/search_address';

import { apiService } from '@/services';

import ErrorCodes from '@/constants/error_codes';

import { AddressData, AddressListItem } from '../types';

import { PopupProps } from './usePopupsHandler';

export default function useVerfiyAddressResultHandler({
  handleOpenPopup,
}: {
  handleOpenPopup: (v: PopupProps) => void;
}) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [addressData, setAddressData] = useState<AddressData>();

  const [addressList, setAddressList] = useState<AddressListItem[]>();

  const [dong, setDong] = useState<string>('');

  const [ho, setHo] = useState<string>('');

  const [selectedItemID, setSelectedItemID] = useState<string>();

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

  const redirectSearchAddress = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.addressData;
      delete query.addressLine;
      delete query.resultType;
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

  const handleClickCtsaIfFindAddressOverTen = useCallback(async () => {
    if (selectedAddress && addressData?.roadAddressName) {
      const kakaoResponse = await searchAddress(addressData.roadAddressName);

      if (
        kakaoResponse &&
        kakaoResponse.documents[0].address?.b_code &&
        selectedAddress.realestate_unique_number &&
        selectedAddress.address_detail &&
        addressData.lat &&
        addressData.lng
      ) {
        const response = await apiService.subhomeRealestatedocumentGet({
          realestate_unique_number: selectedAddress.realestate_unique_number,
          address_detail: selectedAddress.address_detail,
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

        if (response?.error_code === ErrorCodes.MAXCOUNT_REALESTATE_DOCUMENT_GET) {
          handleOpenPopup?.('remainingCountZeroPopup');
          return;
        }

        if (response === null) {
          setTimeout(() => {
            handleOpenPopup?.('startCreateDocumentPopup');
          }, 200);
        }
      }
    }
  }, [addressData, handleOpenPopup, selectedAddress]);

  // useEffect(() => {
  //   if (!router?.query?.addressData) {
  //     redirectSearchAddress();
  //     return;
  //   }

  //   if (router?.query?.addressData) {
  //     const addressD = JSON.parse(decodeURIComponent(router.query.addressData as string));
  //     setAddressData(addressD);
  //   }

  //   if (router?.query?.addressList) {
  //     const addressLi = JSON.parse(decodeURIComponent(router.query.addressList as string));
  //     setAddressList(addressLi);
  //   }

  //   if (router?.query?.dong) {
  //     setDong(router.query.dong as string);
  //   }

  //   if (router?.query?.ho) {
  //     setHo(router.query.ho as string);
  //   }
  // }, [router, redirectSearchAddress]);

  return {
    title: addressData?.roadAddressName ?? '',
    subTitle,
    addressList,
    selectedItemID,
    handleClickListItem,
    handleClickCtsaIfFindAddressOverTen,
  };
}
