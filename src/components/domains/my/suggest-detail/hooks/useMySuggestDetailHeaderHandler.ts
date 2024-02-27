import { useState } from 'react';

import { useRouter } from 'next/router';

import { KeyedMutator, mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { MySuggestRecommendsResponse } from '@/services/my/types';

import { apiService } from '@/services';

import getPath from '@/utils/getPath';

import Routes from '@/router/routes';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import { SuggestDetailResponse } from '@/services/suggests/types';

export default function useMySuggestDetailHeaderHandler({
  suggestID,
  danjiID,
  mutate,
  mutateDetail,
}: {
  suggestID: number;
  danjiID: number;
  mutate: KeyedMutator<MySuggestRecommendsResponse[]>;
  mutateDetail: KeyedMutator<(SuggestDetailResponse & ErrorResponse) | null>;
}) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [deletePopup, setDeletePopup] = useState(false);

  const { mutate: listMutate } = useFetchDanjiSuggestsList({
    danjiID,
    pageSize: 4,
  });

  const handleStopSuggest = async () => {
    if (suggestID) {
      await apiService.mySuggestStop({ suggestID });
      await mutateDetail();
      await mutate();

      toast.success('요청이 중단되었습니다.', { toastId: 'success_stop' });
    }
  };

  const handleResumeSuggest = async () => {
    if (suggestID) {
      await apiService.mySuggsetResume({ suggestID });
      await mutateDetail();
      await mutate();

      toast.success('요청이 재개되었습니다.', { toastId: 'success_resume' });
    }
  };

  const handleOpenDeletePopup = () => {
    setDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopup(false);
  };

  const handleClickSuggestUpdate = () => {
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

  const handleDeleteMySuggest = async () => {
    if (!suggestID) return;

    await apiService.mySuggestDelete({ suggestID });

    if (platform === 'pc') {
      await listMutate();
      await otherMutate('/my/dashboard/info');
    }

    handleCloseDeletePopup();

    toast.success('요청이 취소되었습니다.', { toastId: 'success_delete' });

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.replace({
          pathname: `/${depth1}/${Routes.SuggestRequestedList}`,
          query: { ...query, ...(danjiID ? { danjiID: `${danjiID}` } : {}) },
        });
      } else if (depth1 && !depth2) {
        router.replace({
          pathname: `/${Routes.SuggestRequestedList}`,
          query: { ...query, ...(danjiID ? { danjiID: `${danjiID}` } : {}) },
        });
      }
    } else {
      router.back();
    }
  };

  return {
    deletePopup,

    handleClickSuggestUpdate,

    handleStopSuggest,
    handleResumeSuggest,

    handleOpenDeletePopup,
    handleCloseDeletePopup,

    handleDeleteMySuggest,
  };
}
