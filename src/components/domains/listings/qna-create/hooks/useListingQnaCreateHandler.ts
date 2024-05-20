import { ChangeEventHandler, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useFetchQnaList from '@/services/qna/useFetchQnaList';

import { apiService } from '@/services';

export default function useListingQnaCreateHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const listingID = Number(router.query.listingID) ?? 0;

  const { mutate } = useFetchQnaList(listingID);

  const [isCreating, setIsCreating] = useState(false);

  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);

  const [value, setValue] = useState('');

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleCreateQna = useCallback(async () => {
    setIsCreating(true);

    await apiService.createQna({
      listing_id: Number(router.query.listingID),
      message: value,
    });

    await mutate();

    setIsCreating(false);

    toast.success('문의가 등록되었습니다.');

    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        router.replace({ pathname: `/${depth1}`, query: { ...query } });
      } else if (depth1 && !depth2) {
        router.replace({ pathname: `/` });
      }
    } else {
      handleClickBack();
    }
  }, [platform, router, mutate, value, handleClickBack]);

  const handleChangeValue = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    if (e.target.value.length > 200) {
      toast.error('더 이상 입력할 수 없습니다.', { toastId: 'maximum_length' });

      return;
    }
    setValue(e.target.value);
  }, []);

  const handleOpenPopup = () => {
    setIsOpenConfirmPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenConfirmPopup(false);
  };

  return {
    platform,
    value,
    isCreating,
    isOpenConfirmPopup,
    handleCreateQna,
    handleChangeValue,
    handleOpenPopup,
    handleClosePopup,
    handleClickBack,
  };
}
