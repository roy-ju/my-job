/* eslint-disable @typescript-eslint/no-unused-vars */
import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import useAPI_GetLawQnaDetail from '@/apis/lawQna/getLawQnaDetail';
import { lawQnaDislike, lawQnaLike } from '@/apis/lawQna/lawQnaLike';
import lawQnaView from '@/apis/lawQna/lawQnaView';
import { Panel } from '@/components/atoms';
import { LegalCounselingDetail } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { getBrowser, getDevice } from '@/utils/misc';
import { memo, useCallback, useEffect } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
  qnaID?: number;
  ipAddress?: string;
}

export default memo(({ depth, panelWidth, qnaID, ipAddress }: Props) => {
  const { user } = useAuth();

  const router = useRouter(depth);

  const { mutate: mutateQnaData } = useAPI_GetLawQna(router?.query?.search ? (router.query.search as string) : null);

  const { data: lawQnaDetailData, mutate: lawQnaDetailDataMutate } = useAPI_GetLawQnaDetail(
    router?.query?.qnaID ? Number(router?.query?.qnaID) : undefined,
  );

  const handleClickBack = () => {
    router.popLast();
  };

  const handleClickDetail = (id?: number) => {
    if (!id) return;

    router.replaceCurrent(Routes.LawQnaDetail, { searchParams: { qnaID: `${id}` } });
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
        lawQnaDetailDataMutate();
        mutateQnaData();
      } else {
        await lawQnaLike({ law_qna_id: qnaId });
        lawQnaDetailDataMutate();
        mutateQnaData();
      }
    },
    [lawQnaDetailDataMutate, mutateQnaData, router, user],
  );

  useEffect(() => {
    async function view(id: number) {
      await lawQnaView({ ip_address: ipAddress || '', law_qna_id: id, device: getDevice(), browser: getBrowser() });
    }

    if (lawQnaDetailData && typeof window !== 'undefined') {
      view(lawQnaDetailData.id);
    }
  }, [ipAddress, lawQnaDetailData]);

  if (!qnaID) return null;

  return (
    <Panel width={panelWidth}>
      <LegalCounselingDetail
        lawQnaDetailData={lawQnaDetailData}
        onClickBack={handleClickBack}
        onClickDetail={handleClickDetail}
        onClickLike={handleClickLike}
      />
    </Panel>
  );
});
