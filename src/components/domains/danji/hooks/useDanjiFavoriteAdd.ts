import { useCallback } from 'react';

import { mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useRemoveSessionKey from '@/hooks/useRemoveSessionKey';

import Actions from '@/constants/actions';

import { apiService } from '@/services';

export default function useDanjiFavoriteAdd() {
  const { platform } = useCheckPlatform();

  const { removeSessionKey } = useRemoveSessionKey();

  const danjiFavoriteAdd = useCallback(async () => {
    if (typeof window !== 'undefined' && window.sessionStorage.getItem(Actions.Danji_Favorite.key)) {
      const danjiId = window.sessionStorage.getItem(Actions.Danji_Favorite.key);

      await apiService.danjiFavoriteAdd({ id: Number(danjiId) });

      if (platform === 'pc') {
        toast.success('관심단지로 추가되었습니다.', { toastId: 'toast-danji-favorite' });
        await otherMutate(() => true, undefined);
      }

      if (platform === 'mobile') {
        toast.success('관심단지로 추가되었습니다.', { toastId: 'toast-danji-favorite' });
        await otherMutate(() => true, undefined);
      }

      removeSessionKey(Actions.Danji_Favorite.key);
    }
  }, [platform, removeSessionKey]);

  return { danjiFavoriteAdd };
}
