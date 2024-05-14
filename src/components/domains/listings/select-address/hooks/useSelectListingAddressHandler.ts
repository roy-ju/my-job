import { useCallback, useRef, useState, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import useFetchMyAddressList from '@/services/my/useFetchMyAddressList';

import useAuth from '@/hooks/services/useAuth';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useSelectListingAddressHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const outsideRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuth();

  const [showGuidePopup, setShowGuidePopup] = useState(false);

  const [selectedUserAddressID, setSelectedUserAddressID] = useState<number>();

  const [showInActivePopup, setShowInActivePopup] = useState(false);

  const [isFetch, setIsFetch] = useState<boolean>(false);

  const renderBackButton = useMemo(() => platform !== 'pc', [platform]);

  const handleClickBack = useCallback(() => {
    if (router?.query?.origin) {
      router.replace(router.query.origin as string);
      return;
    }

    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  const { list } = useFetchMyAddressList({
    activeOnly: true,
    danjiID: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    isFetch,
    exclude_duplicated_listing: true,
  });

  const handleClickItem = useCallback(
    (id: number) => {
      if (selectedUserAddressID === id) {
        setSelectedUserAddressID(undefined);
        return;
      }
      setSelectedUserAddressID(id);
    },
    [selectedUserAddressID],
  );

  const handleNext = useCallback(() => {
    if (!selectedUserAddressID) return;

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      const convertedQuery = {
        ...query,
        userAddressID: `${selectedUserAddressID}`,
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.redirect ? { danjiID: router.query.redirect as string } : {}),
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
      };

      if (depth1 && depth2) {
        if (depth1 === Routes.ListingSelectAddress) {
          router.replace({ pathname: `/${Routes.ListingCreateForm}/${depth2}`, query: convertedQuery });
        } else {
          router.replace({ pathname: `/${depth1}/${Routes.ListingCreateForm}`, query: convertedQuery });
        }
      } else {
        router.replace({ pathname: `/${Routes.ListingCreateForm}`, query: convertedQuery });
      }
    } else {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateForm}`,
        query: {
          ...(router?.query?.origin ? { origin: router?.query?.origin } : {}),
          ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
          userAddressID: `${selectedUserAddressID}`,
        },
      });
    }
  }, [platform, router, selectedUserAddressID]);

  const handleCloseGuidePopup = useCallback(() => {
    setShowGuidePopup(false);
  }, []);

  const handleClickAddMyAddress = () => {
    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      const convertedQuery = {
        ...query,
        origin: router.asPath,
        ...(router?.query?.danjiID ? { origin: router.asPath, danjiID: router.query.danjiID as string } : {}),
      };

      if (depth1 && depth2) {
        if (depth1 === Routes.ListingSelectAddress) {
          router.replace({ pathname: `/${Routes.MyAddress}/${depth2}`, query: convertedQuery });
        } else {
          router.replace({ pathname: `/${depth1}/${Routes.MyAddress}`, query: convertedQuery });
        }
      } else {
        router.replace({ pathname: `/${Routes.MyAddress}`, query: convertedQuery });
      }
    } else {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
        query: {
          ...(router?.query?.origin ? { origin: router?.query?.origin } : {}),
          ...(router?.query?.danjiID ? { danjiID: router?.query?.danjiID } : {}),
        },
      });
    }
  };

  useEffect(() => {
    if (!user) {
      setShowInActivePopup(true);
      return;
    }

    if (user && !user.hasAddress && !user.hasNotVerifiedAddress) {
      setShowInActivePopup(true);
      return;
    }

    setIsFetch(true);
  }, [user]);

  useEffect(() => {
    if (list && list?.length > 0) {
      setShowGuidePopup(true);
    }
  }, [list]);

  return {
    outsideRef,
    showGuidePopup,
    showInActivePopup,
    list,
    selectedUserAddressID,
    renderBackButton,
    handleClickBack,
    handleCloseGuidePopup,
    handleClickAddMyAddress,
    handleNext,
    handleClickItem,
  };
}
