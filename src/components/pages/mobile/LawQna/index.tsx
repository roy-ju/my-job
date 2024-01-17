import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaDislike, lawQnaLike } from '@/apis/lawQna/lawQnaLike';
import { LegalCounseling } from '@/components/templates';
import useAuth from '@/hooks/services/useAuth';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

function LawQna() {
  const { user } = useAuth();

  const router = useRouter();

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

  const handleClickWritingPage = () => {
    if (router?.query?.q) {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaCreate}?q=${router.query.q as string}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQnaCreate}`);
    }
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
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
          query: {
            redirect: router.asPath,
          },
        });
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
    [mutateQnaData, router, user],
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
      onClickWritingPage={handleClickWritingPage}
      onClickAllPage={handleClickAllPage}
    />
  );
}

export default LawQna;
