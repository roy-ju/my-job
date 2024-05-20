import { useCallback } from 'react';

import { KeyedMutator } from 'swr';

import { toast } from 'react-toastify';

import { apiService } from '@/services';

import { QnaListResponse } from '@/services/qna/types';

import Routes from '@/router/routes';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import { useRouter } from 'next/router';

import useAuth from '@/hooks/services/useAuth';
import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useQnasHandler({
  listingID,
  mutateQnas,
}: {
  listingID: number;
  mutateQnas: KeyedMutator<QnaListResponse[]>;
}) {
  const { platform } = useCheckPlatform();

  const { user } = useAuth();

  const router = useRouter();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const handleNavigateToCreateQnaPc = useCallback(() => {
    const id = listingID || (router?.query?.listingID as string);

    if (!user) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl(`/${Routes.ListingDetail}/${Routes.ListingQnaCreateForm}?listingID=${id}`);
      return;
    }

    if (user && !user.isVerified) {
      router.push(`/${Routes.VerifyCi}/${Routes.ListingDetail}?listingID=${id}`);
      handleUpdateReturnUrl(`/${Routes.ListingDetail}/${Routes.ListingQnaCreateForm}?listingID=${id}`);
      return;
    }

    router.push(`/${Routes.ListingDetail}/${Routes.ListingQnaCreateForm}?listingID=${id}`);
  }, [handleUpdateReturnUrl, listingID, router, openAuthPopup, user]);

  const handleNavigateToCreateQnaMobile = useCallback(() => {
    const id = listingID || (router?.query?.listingID as string);

    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl(`/${Routes.EntryMobile}/${Routes.ListingQnaCreateForm}?listingID=${id}`);
      return;
    }

    if (user && !user.isVerified) {
      router.push(`/${Routes.EntryMobile}/${Routes.VerifyCi}`);
      handleUpdateReturnUrl(`/${Routes.EntryMobile}/${Routes.ListingQnaCreateForm}?listingID=${id}`);
      return;
    }

    router.push(`/${Routes.EntryMobile}/${Routes.ListingQnaCreateForm}?listingID=${id}`);
  }, [
    user,
    router,
    listingID,
    inAppInfo.isInAppBrowser,
    handleOpenAppInstallPopup,
    handleUpdateReturnUrl,
    openAuthPopup,
  ]);

  const handleClickDeleteQna = useCallback(
    async (id: number) => {
      await apiService.deleteQna({ qna_id: id });

      toast.success('문의가 삭제되었습니다.');

      await mutateQnas();
    },
    [mutateQnas],
  );

  return {
    handleClickDeleteQna,
    handleNavigateToCreateQna: platform === 'pc' ? handleNavigateToCreateQnaPc : handleNavigateToCreateQnaMobile,
  };
}
