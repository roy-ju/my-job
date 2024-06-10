import { memo, useCallback } from 'react';

import { Panel } from '@/components/atoms';

import { LegalCounseling } from '@/components/templates';

import useAuth from '@/hooks/services/useAuth';

import { useRouter } from '@/hooks/utils';

import useFetchLawQnaList from '@/services/law-qna/useFetchLawQnaList';

import Routes from '@/router/routes';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import { apiService } from '@/services';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { user } = useAuth();

  const router = useRouter(depth);

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const {
    data: qnaLawData,
    mutate: mutateQnaData,
    incrementalPageNumber,
  } = useFetchLawQnaList({ searchQuery: router?.query?.q ? (router.query.q as string) : null });

  const handleClickHome = () => {
    router.replace('');
  };

  const handleQnaDetail = (id?: number) => {
    if (typeof id !== 'number') return;

    router.push(Routes.LawQnaDetail, {
      searchParams: router?.query?.q ? { qnaID: `${id}`, q: router?.query?.q as string } : { qnaID: `${id}` },
    });
  };

  const handleClickSearchPage = () => {
    if (router?.query?.q) {
      router.push(`/${Routes.LawQnaSearch}`, {
        searchParams: { q: router.query.q as string },
      });
    } else {
      router.push(Routes.LawQnaSearch);
    }
  };

  const handleClickCreateButton = () => {
    if (!user) {
      const returnUrl = router.query.q
        ? `/${Routes.LawQna}/${Routes.LawQnaCreate}?q=${router.query.q}`
        : `/${Routes.LawQna}/${Routes.LawQnaCreate}`;

      openAuthPopup('onlyLogin');

      handleUpdateReturnUrl(returnUrl);
      return;
    }

    router.push(Routes.LawQnaCreate, {
      searchParams: { ...(router?.query?.q ? { q: router.query.q as string } : {}) },
    });
  };

  const handleClickAllPage = () => {
    router.replaceCurrent(`${Routes.LawQna}`);
  };

  const handleClickLike = useCallback(
    async (liked?: boolean, qnaId?: number) => {
      if (!user) {
        handleUpdateReturnUrl();
        openAuthPopup('onlyLogin');
        return;
      }

      if (typeof liked !== 'boolean' || typeof qnaId !== 'number') return;

      if (liked) {
        await apiService.lawQnaDislike({ law_qna_id: qnaId });
        mutateQnaData();
      } else {
        await apiService.lawQnaLike({ law_qna_id: qnaId });
        mutateQnaData();
      }
    },
    [handleUpdateReturnUrl, mutateQnaData, openAuthPopup, user],
  );

  return (
    <Panel width={panelWidth}>
      <LegalCounseling
        qnaLawData={qnaLawData}
        onNext={incrementalPageNumber}
        onClickHome={handleClickHome}
        onClickLike={handleClickLike}
        onClickSearchPage={handleClickSearchPage}
        onClickQnaDetail={handleQnaDetail}
        onClickCreate={handleClickCreateButton}
        onClickAllPage={handleClickAllPage}
      />
    </Panel>
  );
});
