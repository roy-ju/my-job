import React, { useCallback } from 'react';

import { useRouter } from 'next/router';

import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';

import { lawQnaDislike, lawQnaLike } from '@/apis/lawQna/lawQnaLike';

import { LegalCounseling } from '@/components/templates';

import useAuth from '@/hooks/services/useAuth';

import Routes from '@/router/routes';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

function LawQna() {
  const { user } = useAuth();

  const router = useRouter();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const {
    isLoading,
    data: qnaLawData,
    mutate: mutateQnaData,
    incrementalPageNumber,
  } = useAPI_GetLawQna(router?.query?.q ? (router.query.q as string) : null);

  const handleClickBack = () => {
    router.replace(`/${Routes.EntryMobile}`);
  };

  const handleClickAllPage = () => {
    router.replace(`/${Routes.EntryMobile}/${Routes.LawQna}`);
  };

  const handleClickHome = () => {
    router.push(`/${Routes.EntryMobile}`);
  };

  const handleClickSearchPage = () => {
    if (router?.query?.q) {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaSearch}?q=${router.query.q as string}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaSearch}`);
    }
  };

  const handleClickCreateButton = () => {
    if (!user) {
      const returnUrl = router.query.q
        ? `/${Routes.EntryMobile}/${Routes.LawQnaCreate}?q=${router.query.q}`
        : `/${Routes.EntryMobile}/${Routes.LawQnaCreate}`;

      handleUpdateReturnUrl(returnUrl);
      openAuthPopup('onlyLogin');
      return;
    }

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.LawQnaCreate}`,
      query: { ...(router.query.q ? { q: `${router.query.q}` } : {}) },
    });
  };

  const handleQnaDetail = (id?: number) => {
    if (typeof id !== 'number') return;

    if (router?.query?.q) {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaDetail}?qnaID=${id}&q=${router?.query?.q as string}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaDetail}?qnaID=${id}`);
    }
  };

  const handleClickLike = useCallback(
    async (liked?: boolean, qnaId?: number) => {
      if (!user) {
        handleUpdateReturnUrl();
        openAuthPopup('onlyLogin');
        return;
      }

      if (typeof liked !== 'boolean' || typeof qnaId !== 'number') {
        return;
      }

      if (liked) {
        await lawQnaDislike({ law_qna_id: qnaId });
        mutateQnaData();
      } else {
        await lawQnaLike({ law_qna_id: qnaId });
        mutateQnaData();
      }
    },
    [handleUpdateReturnUrl, mutateQnaData, openAuthPopup, user],
  );

  return (
    <LegalCounseling
      isLoading={isLoading}
      qnaLawData={qnaLawData}
      onNext={incrementalPageNumber}
      onClickBack={handleClickBack}
      onClickHome={handleClickHome}
      onClickLike={handleClickLike}
      onClickSearchPage={handleClickSearchPage}
      onClickQnaDetail={handleQnaDetail}
      onClickCreate={handleClickCreateButton}
      onClickAllPage={handleClickAllPage}
    />
  );
}

export default LawQna;
