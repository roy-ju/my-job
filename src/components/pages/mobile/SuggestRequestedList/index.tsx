import { deleteSuggests } from '@/apis/suggest/deleteSuggests';
import useAPI_GetMySuggestList from '@/apis/suggest/getMySuggestList';
import { Loading, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SuggestRequestedList } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export default memo(() => {
  const router = useRouter();

  const [popup, setPopup] = useState('none');

  const { data, isLoading, mutate, increamentPageNumber } = useAPI_GetMySuggestList();

  const [itemsToDelete, setItemsToDelete] = useState<Record<number, boolean>>({});

  const [listStyle, setListStyle] = useState<'default' | 'delete'>('default');

  const handleClickRecommendationForm = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.RecommendationForm}`);
  }, [router]);

  const handleClickSuggestItem = useCallback(
    (id: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.SuggestDetail}?suggestID=${id}`);
    },
    [router],
  );

  const handleChangeListStyle = useCallback((style: 'default' | 'delete') => {
    setItemsToDelete({});
    setListStyle(style);
  }, []);

  const handleClickDelete = useCallback(async () => {
    setPopup('delete');
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    const items = Object.entries(itemsToDelete)
      .filter(([_, checked]) => checked)
      .map(([id]) => Number(id));
    if (items) {
      setPopup('none');
      await deleteSuggests(items);
      await mutate();
      toast.success('추천 요청을 삭제했습니다.', { toastId: 'success_delete' });
    }
  }, [itemsToDelete, mutate]);

  const handleChangeSuggestChecked = useCallback(
    (id: number, checked: boolean) => {
      if (listStyle === 'delete') {
        setItemsToDelete((prev) => ({
          ...prev,
          [id]: checked,
        }));
      }
    },
    [listStyle],
  );

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  if (isLoading) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <SuggestRequestedList
        onClickBack={handleClickBack}
        listStyle={listStyle}
        list={data}
        onClickRecommendationForm={handleClickRecommendationForm}
        onClickSuggestItem={handleClickSuggestItem}
        onClickDelete={handleClickDelete}
        onChangeListStyle={handleChangeListStyle}
        onChangeSuggestChecked={handleChangeSuggestChecked}
        onNext={increamentPageNumber}
      />
      {popup === 'delete' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="gap-5 py-12">
              <Popup.Title tw="text-center">
                선택한 항목을 목록에서
                <br />
                삭제하시겠습니까?
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleDeleteConfirm}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
