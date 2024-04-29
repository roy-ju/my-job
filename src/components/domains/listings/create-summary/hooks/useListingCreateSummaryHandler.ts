import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { v4 } from 'uuid';

import getFileFromUrl from '@/utils/getFileFromUrl';

import Routes from '@/router/routes';

import ErrorCodes from '@/constants/error_codes';

import { apiService } from '@/services';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useListingCreateSummaryHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const userAddressID = Number(router.query.userAddressID) ?? 0;

  const [listingID, setListingID] = useState<number>();

  const [isCreating, setIsCreating] = useState(false);

  const [successPopup, setSuccessPopup] = useState(false);

  const [errorPopup, setErrorPopup] = useState(false);

  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const handleClickCreate = useCallback(async () => {
    setIsCreating(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { listingPhotoUrls, danjiPhotoUrls, isOwner, ...fields } = params;

    const response = await apiService.listingCreate({
      ...fields,
      user_address_id: userAddressID,
    });

    if (response?.listing_id) {
      setListingID(response.listing_id);

      try {
        listingPhotoUrls?.map(async (item: string) => {
          getFileFromUrl(item, v4()).then((f) => apiService.uploadListingPhoto(response.listing_id, f));
        });

        danjiPhotoUrls?.map(async (item: string) => {
          getFileFromUrl(item, v4()).then((f) => apiService.uploadDanjiPhoto(response.listing_id, f));
        });
      } catch (e) {
        //
      }

      setIsCreating(false);
    }

    if (response?.error_code === ErrorCodes.DUPLICATED_LISTING) {
      setErrorPopup(true);

      return;
    }

    setSuccessPopup(true);
  }, [params, userAddressID]);

  const handleClickUpdate = useCallback(() => {
    const query = {
      params: router.query.params as string,
      ...(router.query.origin
        ? {
            origin: router.query.origin as string,
          }
        : {}),
      ...(router?.query?.userAddressID ? { userAddressID: router.query.userAddressID as string } : {}),
      // ...(router.query.danjiID
      //   ? {
      //       danjiID: router.query.danjiID as string,
      //     }
      //   : {}),
      isBack: 'true',
    };

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.ListingCreateSummary) {
          router.replace({
            pathname: `/${Routes.ListingCreateForm}/${depth2}`,
            query,
          });
        } else {
          router.replace({
            pathname: `/${depth1}/${Routes.ListingCreateForm}`,
            query,
          });
        }
      } else {
        router.replace({
          pathname: `/${Routes.ListingCreateForm}`,
          query,
        });
      }
    } else {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateForm}`,
        query,
      });
    }
  }, [platform, router]);

  const handleConfirmSuccessPopup = useCallback(() => {
    setSuccessPopup(false);

    const query = {
      listingID: `${listingID}`,
      ...(router.query.danjiID
        ? {
            danjiID: router.query.danjiID as string,
          }
        : {}),
      ...(router.query.origin
        ? {
            origin: router.query.origin as string,
          }
        : {}),
    };

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.ListingCreateSummary) {
          router.replace({
            pathname: `/${Routes.ListingDetail}/${depth2}`,
            query,
          });
        } else {
          router.replace({
            pathname: `/${depth1}/${Routes.ListingDetail}`,
            query,
          });
        }
      } else {
        router.replace({
          pathname: `/${Routes.ListingDetail}`,
          query,
        });
      }
    } else {
      router.replace(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
    }
  }, [listingID, platform, router]);

  const handleConfirmErrorPopup = useCallback(() => {
    setErrorPopup(false);

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.replace({
          pathname: `/${depth1}/${Routes.MyRegisteredListingList}`,
          query: { ...query, tab: '1' },
        });
      } else {
        router.replace({
          pathname: `/${Routes.MyRegisteredListingList}`,
          query: { ...query, tab: '1' },
        });
      }
    } else {
      router.replace(`/${Routes.EntryMobile}/${Routes.MyRegisteredListingList}?tab=1`);
    }
  }, [platform, router]);

  useEffect(() => {
    if (!router?.query?.params || !router?.query?.userAddressID) {
      if (platform === 'pc') {
        //
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
      }
    }
  }, [params, userAddressID, router, platform]);

  return {
    params,
    isCreating,
    handleClickCreate,
    handleClickUpdate,

    successPopup,
    handleConfirmSuccessPopup,
    errorPopup,
    handleConfirmErrorPopup,
  };
}
