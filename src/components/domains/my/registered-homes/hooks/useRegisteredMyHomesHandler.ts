import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import { MyAddressListItem } from '@/services/my/types';

import { makeAddressDetail } from '@/utils/fotmat';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import useFetchMyAddressList from '@/services/my/useFetchMyAddressList';

import { PopupProps, UserAddressIInfo } from '../types';

export default function useRegisteredMyHomesHandler() {
  const router = useRouter();

  const { user, isLoading, mutate: authMutate } = useAuth();

  const { platform } = useCheckPlatform();

  const { list, mutate } = useFetchMyAddressList({ activeOnly: false, danjiID: null, isFetch: true });

  const [userAddressInfo, setUserAddressInfo] = useState<UserAddressIInfo>();

  const [popup, setPopup] = useState<PopupProps>('');

  const handleOpenConfirmDeletePopup = useCallback((item: MyAddressListItem) => {
    const fullAddressDetail = `${item.road_name_address}. ${makeAddressDetail({
      danjiName: item.danji_name,
      dong: item.dong,
      ho: item.ho,
    })}`;

    setUserAddressInfo({ id: item.id, address: fullAddressDetail });
    setPopup('deleteConfirm');
  }, []);

  const handleCloseConfirmDeletePopup = useCallback(() => {
    setUserAddressInfo(undefined);
    setPopup('');
  }, []);

  const handleSendSms = useCallback(
    (id: number, roadNameAddress?: string, addressDetail?: string) => {
      if (!id) return;

      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;
        delete query.depth1;
        delete query.depth2;

        const convertedQuery = {
          ...query,
          userAddressID: `${id}`,
          resend: 'true',
          roadNameAddress: roadNameAddress || '',
          addressDetail: addressDetail || '',
          origin: router.asPath,
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.MyRegisteredHomes) {
            router.push({
              pathname: `/${Routes.MyAddressAgreement}/${depth2}`,
              query: convertedQuery,
            });
          } else {
            router.push({ pathname: `/${depth1}/${Routes.MyAddressAgreement}`, query: convertedQuery });
          }
        } else if (depth1 && !depth2) {
          router.push({ pathname: `/${Routes.MyAddressAgreement}`, query: convertedQuery });
        }
      } else if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressAgreement}`,
          query: {
            userAddressID: `${id}`,
            resend: 'true',
            roadNameAddress: roadNameAddress || '',
            addressDetail: addressDetail || '',
            origin: router.asPath,
          },
        });
      }
    },
    [router, platform],
  );

  const handleRegisterMyAddress = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;
      delete query.depth1;
      delete query.depth2;

      const convertedQuery = {
        ...query,
        origin: router.asPath,
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
      };

      if (depth1 && depth2) {
        if (depth1 === Routes.MyRegisteredHomes) {
          router.push({
            pathname: `/${Routes.MyAddress}/${depth2}`,
            query: convertedQuery,
          });
        } else {
          router.push({ pathname: `/${depth1}/${Routes.MyAddress}`, query: convertedQuery });
        }
      } else if (depth1 && !depth2) {
        router.push({ pathname: `/${Routes.MyAddress}`, query: convertedQuery });
      }
    } else if (platform === 'mobile') {
      router.push({ pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`, query: { origin: router.asPath } });
    }
  }, [platform, router]);

  const handleDeleteMyAddress = useCallback(async () => {
    if (!userAddressInfo?.id) return;

    await apiService.deleteMyAddress({ user_address_id: userAddressInfo.id });

    if (list?.length === 1) {
      if (platform === 'pc') {
        await router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
      } else if (platform === 'mobile') {
        await router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
      }

      await authMutate();
    }

    toast.success('등록한 우리집을 삭제했습니다.');
    setUserAddressInfo(undefined);
    await mutate();
  }, [userAddressInfo, list?.length, mutate, platform, authMutate, router]);

  const handleClickMyPage = useCallback(() => {
    if (platform === 'pc') {
      const query = router.query;
      delete query.depth1;
      delete query.depth2;

      router.replace({
        pathname: `/${Routes.My}`,
        query: { ...query, default: router?.query?.default ? router.query.default : '2' },
      });
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  }, [platform, router]);

  useEffect(() => {
    if (user) {
      const { hasAddress, hasNotVerifiedAddress } = user;

      if (hasAddress === false && hasNotVerifiedAddress === false) {
        setPopup('inActivePopup');
      }
    }
  }, [user, isLoading]);

  return {
    list,
    popup,
    userAddressInfo,
    handleOpenConfirmDeletePopup,
    handleSendSms,
    handleRegisterMyAddress,
    handleClickMyPage,
    handleDeleteMyAddress,
    handleCloseConfirmDeletePopup,
  };
}
