import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { lawQnaUpdate } from '@/apis/lawQna/lawQnaCrud';

import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { LegalCounselingWriting } from '@/components/templates';
import ErrorCodes from '@/constants/error_codes';
import Routes from '@/router/routes';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function LawQnaUpdate() {
  const router = useRouter();

  const qnaID = router?.query?.qnaID;

  const { mutate } = useAPI_GetLawQna(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleClickConfirm = async (text?: string, message?: string) => {
    if (!text || !message || !qnaID) return;

    setIsLoading(true);

    const response = await lawQnaUpdate({ law_qna_id: Number(qnaID), title: text, user_message: message });

    if (response === null) {
      toast.success('수정이 완료되었습니다.');
      mutate();
      router.back();
    } else if (response.error_code === ErrorCodes.NOTEXIST_LAWQNA) {
      setError(true);
    }
  };

  const handleClickErrPopup = () => {
    mutate();

    if (router?.query?.q) {
      router.replace(`/${Routes.EntryMobile}/${Routes.LawQna}?q=${router.query.q as string}`);
    } else {
      router.replace(`/${Routes.EntryMobile}/${Routes.LawQna}`);
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
    <MobAuthRequired>
      <MobileContainer>
        <LegalCounselingWriting
          onClickBack={() => router.back()}
          onClickConfirm={handleClickConfirm}
          preTitle={router?.query?.title as string}
          preContent={router?.query?.content as string}
          isLoading={isLoading}
        />
      </MobileContainer>
    </MobAuthRequired>
  );
}

export default LawQnaUpdate;
