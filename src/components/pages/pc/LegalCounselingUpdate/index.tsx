import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaUpdate } from '@/apis/lawQna/lawQnaCrud';
import { AuthRequired, Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { LegalCounselingWriting } from '@/components/templates';
import ErrorCodes from '@/constants/error_codes';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useRouter as useNextRouter } from 'next/router';

import { memo, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth: string;
  qnaID: number;
}

export default memo(({ depth, panelWidth, qnaID }: Props) => {
  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const { mutate } = useAPI_GetLawQna(router?.query?.q ? (router.query.q as string) : null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleClickConfirm = async (text?: string, message?: string) => {
    if (!text || !message || !qnaID) return;

    setIsLoading(true);

    const response = await lawQnaUpdate({ law_qna_id: qnaID, title: text, user_message: message });

    if (response === null) {
      toast.success('수정이 완료되었습니다.');
      mutate();

      if (router?.query?.q) {
        nextRouter.replace(`/${Routes.LawQna}?q=${router.query.q as string}`);
      } else {
        nextRouter.replace(`/${Routes.LawQna}`);
      }
    } else if (response.error_code === ErrorCodes.NOTEXIST_LAWQNA) {
      setError(true);
    }
  };

  const handleClickErrPopup = () => {
    mutate();

    if (router?.query?.q) {
      nextRouter.replace(`/${Routes.LawQna}?q=${router.query.q as string}`);
    } else {
      nextRouter.replace(`/${Routes.LawQna}`);
    }
  };

  if (!qnaID || error)
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-6">
            <Popup.SmallTitle tw="text-center">
              이미 삭제된 게시물 입니다.
              <br />
              다른 게시물을 선택해 주세요.
            </Popup.SmallTitle>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={handleClickErrPopup}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <LegalCounselingWriting
          onClickConfirm={handleClickConfirm}
          preTitle={router?.query?.title as string}
          preContent={router?.query?.content as string}
          isLoading={isLoading}
        />
      </Panel>
    </AuthRequired>
  );
});
