/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useRouter as useNextRouter } from 'next/router';
import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaUpdate } from '@/apis/lawQna/lawQnaCrud';
import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { LegalCounselingWriting } from '@/components/templates';
import { useRouter } from '@/hooks/utils';

import { memo } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth: string;
  qnaID: number;
}

export default memo(({ depth, panelWidth, qnaID }: Props) => {
  const router = useRouter(depth);

  const { mutate } = useAPI_GetLawQna(null);

  const handleClickConfirm = async (text?: string, message?: string) => {
    if (!text || !message || !qnaID) return;

    const response = await lawQnaUpdate({ law_qna_id: qnaID, title: text, user_message: message });

    if (response === null) {
      toast.success('수정이 완료되었습니다.');
      mutate();
      router.popLast();
    }
  };

  const handleClickErrPopup = () => {
    router.popLast();
  };

  if (!qnaID)
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
    <Panel width={panelWidth}>
      <LegalCounselingWriting
        onClickConfirm={handleClickConfirm}
        preTitle={router?.query?.title as string}
        preContent={router?.query?.content as string}
      />
    </Panel>
  );
});
