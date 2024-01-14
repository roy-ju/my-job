import { useState } from 'react';

import { useRouter } from 'next/router';

import { mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { apiService } from '@/services';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import getPath from '@/utils/getPath';

import Routes from '@/router/routes';

import useMySuggestDetailStore from './useMySuggestDetailStore';

export default function useSummaryCTAHandler({ depth }: { depth?: number }) {
  const { platform } = useCheckPlatform();

  const value = useMySuggestDetailStore();

  const { mutate: listMutate } = useFetchDanjiSuggestsList({
    danjiID: value?.suggestDetailData?.danji_id,
    pageSize: 4,
  });

  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const [deletePopup, setDeletePopup] = useState(false);

  const renderDanjiShowUICondition = platform === 'mobile' ? true : router.query.entry === 'my';

  const openDeletePopup = () => {
    setDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setDeletePopup(false);
  };

  const handleClickDanjiDetail = () => {
    const danjiID = value?.suggestDetailData?.danji_id ?? 0;

    if (!danjiID) return;

    if (platform === 'pc') {
      customRouter.replace(Routes.DanjiDetail, {
        searchParams: {
          danjiID: `${danjiID}`,
        },
      });
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}`);
    }
  };

  const handleClickSuggestUpdate = () => {
    const danjiID = value?.suggestDetailData?.danji_id ?? 0;

    const suggestID = value?.suggestDetailData?.suggest_id ?? 0;

    const depth1 = (router?.query?.depth1 as NegocioPath) ?? '';

    const depth2 = (router?.query?.depth2 as NegocioPath) ?? '';

    if (platform === 'pc') {
      const pathname = getPath({
        depth1,
        depth2,
        targetPath: Routes.SuggestFormUpdate as NegocioPath,
      });

      router.push({
        pathname,
        query: {
          entry: Routes.SuggestRequestedList,
          ...(danjiID ? { danjiID: `${danjiID}` } : {}),
          ...(suggestID ? { suggestID: `${suggestID}` } : {}),
        },
      });
    } else {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestFormUpdate}`,
        query: {
          entry: Routes.SuggestRequestedList,
          ...(danjiID ? { danjiID: `${danjiID}` } : {}),
          ...(suggestID ? { suggestID: `${suggestID}` } : {}),
        },
      });
    }
  };

  const handleDelete = async () => {
    const suggestID = value?.suggestDetailData?.suggest_id;

    if (!suggestID) return;

    await apiService.mySuggestDelete({ suggestID });

    if (platform === 'pc') {
      await listMutate();
      await otherMutate('/my/dashboard/info');
    }

    closeDeletePopup();

    toast.success('추천 요청을 삭제했습니다.', { toastId: 'success_delete' });

    if (platform === 'pc') {
      customRouter.replace(Routes.SuggestRequestedList, {
        state: {
          ...(value?.suggestDetailData?.danji_id ? { danjiID: `${value.suggestDetailData.danji_id}` } : {}),
        },
      });
    } else {
      router.back();
    }
  };
  return {
    deletePopup,
    renderDanjiShowUICondition,
    openDeletePopup,
    closeDeletePopup,
    handleDelete,
    handleClickDanjiDetail,
    handleClickSuggestUpdate,
  };
}
