import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { apiService } from '@/services';

import useAuth from '@/hooks/services/useAuth';

import Routes from '@/router/routes';

import ErrorCodes from '@/constants/error_codes';

import { AddressData } from '@/components/domains/realestate-helper/realestate-document-verify-result/types';

type PopupProps = 'inactive' | 'confirm' | 'invalidOwner' | 'sendCountReached' | '';

export default function useRegisterHomeAgreementHandler() {
  const { user } = useAuth();

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const roadNameAddress = (router?.query?.roadNameAddress as string) || '';

  const addressDetail = (router?.query?.addressDetail as string) || '';

  const isResend = !!router?.query?.resend;

  const [popup, setPopup] = useState<PopupProps>('');

  const [addressData, setAddressData] = useState<AddressData>();
  const [dong, setDong] = useState<string>('');
  const [ho, setHo] = useState<string>('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleOpenPopup = useCallback((v: PopupProps) => {
    setPopup(v);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup('');
  }, []);

  const handleChangeName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setName(e.target.value);
  }, []);

  const handleChangePhone = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPhone(e.target.value);
  }, []);

  const handleClickNameDeleteIcon = useCallback(() => {
    setName('');
  }, []);

  const handleClickPhoneDeleteIcon = useCallback(() => {
    setPhone('');
  }, []);

  const handleRedirectHome = useCallback(() => {
    if (platform === 'pc') {
      router.replace(`/`);
    } else if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
    }
  }, [platform, router]);

  const title = useMemo(() => {
    if (roadNameAddress) {
      return roadNameAddress;
    }

    if (addressData?.roadAddressName) {
      return addressData.roadAddressName;
    }

    return '';
  }, [roadNameAddress, addressData]);

  const subTitle = useMemo(() => {
    if (addressDetail) {
      return `${addressDetail}`;
    }
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
  }, [addressData, dong, ho, addressDetail]);

  const handleClickSendCountReachedPopupCta = useCallback(() => {
    handleClosePopup();

    if (platform === 'pc') {
      if (router?.query?.danjiID || router?.query?.suggestID) {
        const depth1 = router?.query?.depth1 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;
        delete query.addressData;
        delete query.addressLine;
        delete query.dong;
        delete query.ho;
        delete query.errorCodes;
        delete query.resultType;

        if (router?.query?.danjiID || router?.query?.suggestID) {
          router.replace({ pathname: `/${depth1}`, query: { ...query } });
          return;
        }

        router.replace({ pathname: `/${Routes.My}`, query: { ...query } });
      } else {
        router.replace(`/${Routes.My}?default=2`);
      }
    } else if (platform === 'mobile') {
      if (router?.query?.origin) {
        router.replace(router.query.origin as string);
        return;
      }

      router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  }, [handleClosePopup, platform, router]);

  const handleClickCTA = useCallback(async () => {
    if (!router?.query?.userAddressID) return;

    const response = await apiService.myAgreementPhone({
      name,
      phone,
      user_address_id: Number(router.query.userAddressID),
    });

    handleOpenPopup('confirm');

    if (response?.error_code === ErrorCodes.UNABLE_TO_VALIDATE_OWNER) {
      handleOpenPopup('invalidOwner');
    } else if (response?.error_code === ErrorCodes.SMS_COUNT_REACHED_LIMIT) {
      handleOpenPopup('sendCountReached');
    } else if (response === null) {
      toast.success('문자를 전송했습니다.');

      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;
        delete query.addressData;
        delete query.dong;
        delete query.ho;
        delete query.addressList;
        delete query.errorCode;
        delete query.resultType;

        const convertedQuery = {
          ...query,
          ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router.query.suggestID } : {}),
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.MyAddressAgreement) {
            router.replace({ pathname: `/${Routes.MyRegisteredHomes}/${depth2}`, query: convertedQuery });
          } else {
            router.replace({ pathname: `/${depth1}/${Routes.MyRegisteredHomes}`, query: convertedQuery });
          }
        } else if (depth1 && !depth2) {
          router.replace({ pathname: `/${Routes.MyRegisteredHomes}`, query: convertedQuery });
        }
      } else if (platform === 'mobile') {
        if (router?.query?.origin) {
          router.replace(router.query.origin as string);
          return;
        }

        router.replace(`/${Routes.EntryMobile}/${Routes.MyRegisteredHomes}`);
      }
    }
  }, [handleOpenPopup, name, phone, platform, router]);

  useEffect(() => {
    if (!router?.query?.userAddressID) {
      handleOpenPopup('inactive');
      return;
    }

    if (!router?.query?.addressData && (!router?.query?.roadNameAddress || !router?.query?.addressDetail)) {
      handleOpenPopup('inactive');
      return;
    }

    if (router?.query?.addressData) {
      const addressD = JSON.parse(decodeURIComponent(router.query.addressData as string));
      setAddressData(addressD);
    }

    if (router?.query?.dong) {
      setDong(router.query.dong as string);
    }

    if (router?.query?.ho) {
      setHo(router.query.ho as string);
    }
  }, [handleOpenPopup, router]);

  return {
    popup,
    title,
    subTitle,
    userName: user?.name ?? '',
    name,
    phone,
    isResend,
    handleClickCTA,
    handleClosePopup,
    handleChangeName,
    handleClickNameDeleteIcon,
    handleChangePhone,
    handleClickPhoneDeleteIcon,
    handleRedirectHome,
    handleClickSendCountReachedPopupCta,
  };
}
