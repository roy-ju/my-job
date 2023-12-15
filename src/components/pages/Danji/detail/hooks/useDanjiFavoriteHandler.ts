import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import { apiService } from '@/services';

import { DanjiDetailResponse } from '@/services/danji/types';

import Routes from '@/router/routes';
import { User } from '@/hooks/services/useAuth';

export default function useDanjiFavoriteHandler() {
  const router = useRouter();

  async function danjiFavoriteAddOptimistic(id?: number) {
    if (!id) return;

    await apiService.danjiFavoriteAdd({ id });

    const response = await apiService.fetchDanjiDetail({ id });

    return response as DanjiDetailResponse;
  }

  async function danjiFavoriteRemoveOptimistic(id?: number) {
    if (!id) return;

    await apiService.danjiFavoriteRemove({ id });

    const response = await apiService.fetchDanjiDetail({ id });

    return response as DanjiDetailResponse;
  }

  const onClickFavorite = useCallback(
    async (user: Nullable<User>, isAuthLoading: boolean, danji: DanjiDetailResponse) => {
      const { danji_id: id, is_favorite: isFavorite } = danji;

      if (!id || isAuthLoading) return;

      if (!user) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
          query: {
            redirect: router.asPath,
          },
        });
        return;
      }

      if (!user.isVerified) {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
          query: {
            redirect: router.asPath,
          },
        });
      }

      if (user && id) {
        if (!isFavorite) {
          await mutate(['/danji/detail', { danji_id: id }], danjiFavoriteAddOptimistic(id), {
            optimisticData: { ...danji, is_favorite: true },
            rollbackOnError: true,
          });

          toast.success('관심단지로 추가되었습니다.', { toastId: 'toast-danji-favorite' });
          return;
        }

        await mutate(['/danji/detail', { danji_id: id }], danjiFavoriteRemoveOptimistic(id), {
          optimisticData: { ...danji, is_favorite: false },
          rollbackOnError: true,
        });

        toast.success('관심단지가 해제되었습니다.', { toastId: 'toast-danji-favorite' });
      }
    },
    [router],
  );

  return { onClickFavorite };
}
