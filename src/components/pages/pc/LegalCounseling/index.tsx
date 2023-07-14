import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaDislike, lawQnaLike } from '@/apis/lawQna/lawQnaLike';
import { Panel } from '@/components/atoms';
import { LegalCounseling } from '@/components/templates';
import { useAuth } from '@/hooks/services';

import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { user } = useAuth();

  const router = useRouter(depth);

  const {
    data: qnaLawData,
    mutate: mutateQnaData,
    incrementalPageNumber,
  } = useAPI_GetLawQna(router?.query?.q ? (router.query.q as string) : null);

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

  const handleClickWritingPage = () => {
    router.push(Routes.LawQnaCreate, {
      searchParams: router?.query?.q ? { q: router.query.q as string } : undefined,
    });
  };

  const handleClickAllPage = () => {
    router.replaceCurrent(`${Routes.LawQna}`);
  };

  const handleClickLike = useCallback(
    async (liked?: boolean, qnaId?: number) => {
      if (!user) {
        router.replaceCurrent(Routes.Login, {
          persistParams: true,
          searchParams: { redirect: `${router.asPath}`, back: 'true' },
        });
        return;
      }

      if (typeof liked !== 'boolean' || typeof qnaId !== 'number') return;

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
    <Panel width={panelWidth}>
      <LegalCounseling
        qnaLawData={qnaLawData}
        onNext={incrementalPageNumber}
        onClickHome={handleClickHome}
        onClickLike={handleClickLike}
        onClickSearchPage={handleClickSearchPage}
        onClickQnaDetail={handleQnaDetail}
        onClickWritingPage={handleClickWritingPage}
        onClickAllPage={handleClickAllPage}
      />
    </Panel>
  );
});
