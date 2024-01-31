import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useAuth from '@/hooks/services/useAuth';

import useFetchServiceQnaList from '@/services/qna/useFetchServiceQnaList';

import { apiService } from '@/services';

export default function useQnaMain() {
  const router = useRouter();

  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { list, mutate: mutateQna } = useFetchServiceQnaList();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isQnaCreateOpen, setIsQnaCreateOpen] = useState(false);

  const [qnaText, setQnaText] = useState('');

  const [isToastShown, setIsToastShown] = useState(false);

  const headerTitle = useMemo(() => (isQnaCreateOpen ? '문의하기' : '서비스 문의'), [isQnaCreateOpen]);

  const loggedIn = useMemo(() => user !== null, [user]);

  useEffect(() => {
    if (!isToastShown && qnaText.length > 99) {
      toast.error('더 이상 입력할 수 없습니다.');
      setIsToastShown(true);
    }
  }, [isToastShown, qnaText.length]);

  const handleClickOpenPopup = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  const handleClickClosePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handleOpenQnaCreate = useCallback(() => {
    if (!user) {
      openAuthPopup('onlyLogin');
      handleUpdateReturnUrl();
      return;
    }

    setIsQnaCreateOpen(true);
  }, [handleUpdateReturnUrl, openAuthPopup, user]);

  const handleCloseQnaCreate = useCallback(() => {
    setIsQnaCreateOpen(false);
  }, []);

  const handleChangeQnaText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > 100) return;

    setQnaText(value);
  }, []);

  const handleCreateServiceQna = useCallback(async () => {
    setIsQnaCreateOpen(false);

    await apiService.serviceQnaCreate(qnaText);

    toast.success('문의가 등록되었습니다.');

    setQnaText('');

    setIsPopupOpen(false);

    mutateQna();
  }, [mutateQna, qnaText]);

  const handleClickBack = useCallback(() => router.back(), [router]);

  return {
    loggedIn,
    isQnaCreateOpen,
    qnaText,
    list,
    headerTitle,
    isPopupOpen,
    handleClickClosePopup,
    handleClickOpenPopup,
    handleChangeQnaText,
    handleCreateServiceQna,
    handleOpenQnaCreate,
    handleCloseQnaCreate,
    handleClickBack,
  };
}
