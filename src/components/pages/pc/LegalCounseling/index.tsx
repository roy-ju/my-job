/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useRouter as useNextRouter } from 'next/router';
import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaDislike, lawQnaLike } from '@/apis/lawQna/lawQnaLike';
import { Panel } from '@/components/atoms';
import { LegalCounseling } from '@/components/templates';
import { useAuth } from '@/hooks/services';

import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

import { useRouter as useNextRouter } from 'next/router';

import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { user } = useAuth();

  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const {
    data: qnaLawData,
    mutate: mutateQnaData,
    incrementalPageNumber,
  } = useAPI_GetLawQna(router?.query?.search ? (router.query.search as string) : null);

  const handleClickBack = () => {
    router.replace('');
  };

  const handleClickHome = () => {
    router.replace('');
  };

  const handleQnaDetail = () => {};

  const handleClickSearchPage = () => {
    router.push(Routes.LawQnaSearch);
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
        onClickBack={handleClickBack}
        onClickHome={handleClickHome}
        onClickLike={handleClickLike}
        onClickSearchPage={handleClickSearchPage}
      />
    </Panel>
  );
});
