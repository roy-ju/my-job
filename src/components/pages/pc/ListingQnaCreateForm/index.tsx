import { ChangeEventHandler, memo, useCallback, useState } from 'react';

import { toast } from 'react-toastify';

import { AuthRequired, Panel } from '@/components/atoms';

import { ListingQnaCreateForm } from '@/components/templates';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { useRouter } from '@/hooks/utils';

import { apiService } from '@/services';

import useFetchQnaList from '@/services/qna/useFetchQnaList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const { mutate } = useFetchQnaList(listingID);

  const [isCreating, setIsCreating] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isToastShown, setIsToastShown] = useState(false);

  const handleCreateQna = useCallback(async () => {
    setIsCreating(true);
    await apiService.createQna({
      listing_id: Number(router.query.listingID),
      message: value,
    });
    await mutate();
    setIsCreating(false);
    toast.success('문의가 등록되었습니다.');
    router.pop();
  }, [router, mutate, value]);

  const handleChangeValue = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.target.value.length > 200) {
        if (!isToastShown) {
          toast.error('더 이상 입력할 수 없습니다.');
          setIsToastShown(true);
        }
        return;
      }
      setValue(e.target.value);
    },
    [isToastShown],
  );

  const handleClickOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClickClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        <ListingQnaCreateForm
          value={value}
          isCreating={isCreating}
          onClickCreateQna={handleCreateQna}
          handleChangeValue={handleChangeValue}
          handleClickOpenPopup={handleClickOpenPopup}
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
                <Popup.ActionButton onClick={handleCreateQna}>확인</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </Panel>
    </AuthRequired>
  );
});
