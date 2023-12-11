import React from 'react';

import tw from 'twin.macro';

import { usePlatform } from '@/providers/PlatformProvider';

import { Separator, PersistentBottomBar, Button } from '@/components/atoms';

import { NavigationHeader, OverlayPresenter, Popup } from '@/components/molecules';

import FormRenderer from '../organism/FormRenderer';

import RegionForm from '../organism/RegionForm';

import useInit from '../../hooks/useInit';

import useForm from '../../hooks/useForm';

import useFormCTA from '../../hooks/useFormCTA';

import useFormHandler from '../../hooks/useFormHandler';

import useAutoScroll from '../../hooks/useAutoScroll';

export default function SuggestRegionalFormTemplate() {
  const state = useForm();

  const platform = usePlatform();

  useInit();

  useAutoScroll({ elementID: 'formContainer' });

  const { hanldeClickBack, handleBubjungdongChangePopup, handleBuyOrRentChangePopup, handleIsQuitPopup } =
    useFormHandler();

  const { nextButtonDisabled, handleNextForm } = useFormCTA();

  if (!state?.forms) return null;

  return (
    <>
      <div tw="flex flex-col h-full">
        <NavigationHeader>
          {hanldeClickBack && <NavigationHeader.BackButton onClick={hanldeClickBack} />}
          <NavigationHeader.Title>매물 구해요</NavigationHeader.Title>
        </NavigationHeader>

        <div id="formContainer" tw="flex-1 min-h-0 overflow-auto">
          {state.forms.map((form, index) => (
            <div key={form}>
              <FormRenderer form={form} />
              {state.forms.length !== index + 1 && <Separator />}
            </div>
          ))}
        </div>

        <PersistentBottomBar>
          <div>
            <Button tw="w-full" size="bigger" onClick={handleNextForm} disabled={nextButtonDisabled}>
              다음
            </Button>
          </div>
        </PersistentBottomBar>
      </div>

      {state.popup === 'bubjungdongChange' && (
        <OverlayPresenter>
          <div
            tw="bg-white rounded-lg shadow"
            css={[
              platform?.platform === 'pc' ? tw`w-[380px] h-[600px]` : tw`w-[90vw] h-[90vh] max-w-[380px] max-h-[600px]`,
            ]}
          >
            <RegionForm
              onClickClose={() => handleBubjungdongChangePopup('close')}
              onSubmit={(item) => {
                handleBubjungdongChangePopup('confirm', item);
              }}
            />
          </div>
        </OverlayPresenter>
      )}

      {state.popup === 'buyOrRentChange' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.Title>
                거래 종류를 변경하시면 처음부터 다시 입력하셔야 합니다. 거래 종류를 변경하시겠습니까?
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => handleBuyOrRentChangePopup('close')}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={() => handleBuyOrRentChangePopup('confirm')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {state.popup === 'isQuit' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>추천받기를 종료하시겠습니까?</Popup.Title>
              <Popup.Body>
                추천받기를 종료하시면 입력하신 내용이 모두 삭제됩니다.
                <br />
                입력한 내용을 확인 또는 수정하시려면 화면을 위로 이동해 주세요.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => handleIsQuitPopup('close')}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={() => handleIsQuitPopup('confirm')}>추천받기 종료</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}