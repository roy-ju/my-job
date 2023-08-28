import { deleteSuggests } from '@/apis/suggest/deleteSuggests';
import useAPI_GetMySuggestList from '@/apis/suggest/getMySuggestList';
import { Loading, Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SuggestRequestedList } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate as otherMutate } from 'swr';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const [popup, setPopup] = useState('none');

  const { data, isLoading, mutate, increamentPageNumber } = useAPI_GetMySuggestList();

  const [itemsToDelete, setItemsToDelete] = useState<Record<number, boolean>>({});

  const [listStyle, setListStyle] = useState<'default' | 'delete'>('default');

  const handleClickRecommendationForm = useCallback(() => {
    router.replace(Routes.RecommendationForm);
  }, [router]);

  const handleClickSuggestItem = useCallback(
    (id: number) => {
      router.replace(Routes.SuggestDetail, {
        searchParams: {
          suggestID: `${id}`,
        },
      });
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
      otherMutate('/my/dashboard/info');
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

  if (isLoading) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  return (
    <Panel width={panelWidth}>
      <SuggestRequestedList
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
    </Panel>
  );
});
