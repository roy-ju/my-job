import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter as useNextRouter } from 'next/router';
import { mutate as otherMutate } from 'swr';
import { usePlatform } from '@/providers/PlatformProvider';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { DanjiOrRegionalType } from '@/constants/enums';
import { deleteSuggest } from '@/apis/suggest/deleteSuggest';
import { useAPI_GetDanjiSuggestList } from '@/apis/danji/danjiSuggestList';
import useMySuggestDetailStore from './useMySuggestDetailStore';

export default function useSummaryCTAHandler() {
  const platform = usePlatform();

  const value = useMySuggestDetailStore();

  const { mutate: listMutate } = useAPI_GetDanjiSuggestList({
    danjiId: value?.suggestDetailData?.danji_id,
    pageSize: 4,
  });

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  const [deletePopup, setDeletePopup] = useState(false);

  const renderDanjiShowUICondition = platform?.platform === 'mobile' ? true : router.query.entry === 'my';

  const openDeletePopup = () => {
    setDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setDeletePopup(false);
  };

  const handleClickDanjiDetail = () => {
    const danjiID = value?.suggestDetailData?.danji_id ?? 0;

    if (!danjiID) return;

    if (platform?.platform === 'pc') {
      router.replace(Routes.DanjiDetail, {
        searchParams: {
          danjiID: `${danjiID}`,
        },
      });
    } else {
      nextRouter.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}`);
    }
  };

  const handleClickSuggestUpdate = () => {
    const targetRoute =
      value?.suggestDetailData?.danji_or_regional === DanjiOrRegionalType.Danji
        ? Routes.DanjiRecommendationUpdate
        : Routes.SuggestRegionalFormUpdate;

    const danjiID = value?.suggestDetailData?.danji_id ?? 0;
    const suggestID = value?.suggestDetailData?.suggest_id ?? 0;

    if (platform?.platform === 'pc') {
      router.replace(Routes.RecommendationFormUpdate, {
        searchParams: {
          ...(danjiID ? { danjiID: `${danjiID}` } : {}),
          ...(suggestID ? { suggestID: `${suggestID}` } : {}),
          entry: 'mySuggestDetail',
        },
      });
    } else {
      nextRouter.push(`/${Routes.EntryMobile}/${targetRoute}?suggestID=${suggestID}`);
    }
  };

  const handleDelete = async () => {
    const suggestID = value?.suggestDetailData?.suggest_id;

    if (!suggestID) return;
    await deleteSuggest(suggestID);

    if (platform?.platform === 'pc') {
      await listMutate();
      await otherMutate('/my/dashboard/info');
    }

    closeDeletePopup();

    toast.success('추천 요청을 삭제했습니다.', { toastId: 'success_delete' });

    if (platform?.platform === 'pc') {
      router.replace(Routes.SuggestRequestedList, {
        state: {
          ...(value?.suggestDetailData?.danji_id ? { danjiID: `${value.suggestDetailData.danji_id}` } : {}),
        },
      });
    } else {
      nextRouter.back();
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
