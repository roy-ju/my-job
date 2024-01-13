import useAPI_GetServiceQnaList from '@/apis/serviceqna/getServiceQnaList';
import { MobileContainer } from '@/components/atoms';
import { Qna as QnaTemplate } from '@/components/templates';
import useAuth from '@/hooks/services/useAuth';
import { useRouter } from 'next/router';
import { useState, ChangeEvent } from 'react';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { toast } from 'react-toastify';
import createServiceQna from '@/apis/serviceqna/createServiceQna';

export default function MobMyQnaWrraper() {
  const router = useRouter();
  const { user } = useAuth();
  const { list, mutate: mutateQna } = useAPI_GetServiceQnaList();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isQna, setIsQna] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const [qnaText, setQnaText] = useState('');
  const headerTitle = isQna ? '문의하기' : '서비스 문의';

  if (!isToastShown && qnaText.length > 99) {
    toast.error('더 이상 입력할 수 없습니다.');
    setIsToastShown(true);
  }

  const handleClickSubmitQna = async () => {
    setIsQna(false);
    await createServiceQna(qnaText);
    toast.success('문의가 등록되었습니다.');
    setQnaText('');
    setIsPopupOpen(false);
    mutateQna();
  };

  const handleClickActiveQna = () => {
    setIsQna(true);
  };
  const handleClickInActiveQna = () => {
    setIsQna(false);
  };

  const handleChangeQnaText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 100) return;
    setQnaText(value);
  };
  const handleClickOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClickClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <MobileContainer>
      <QnaTemplate
        loggedIn={user !== null}
        list={list}
        isQna={isQna}
        qnaText={qnaText}
        headerTitle={headerTitle}
        handleChangeQnaText={handleChangeQnaText}
        handleClickActiveQna={handleClickActiveQna}
        handleClickInActiveQna={handleClickInActiveQna}
        handleClickOpenPopup={handleClickOpenPopup}
        onClickBack={() => router.back()}
      />
      {isPopupOpen && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>
                작성하신 내용은 수정할 수 없습니다.
                <br />위 내용으로 문의하시겠습니까?
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleClickClosePopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleClickSubmitQna}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
}
