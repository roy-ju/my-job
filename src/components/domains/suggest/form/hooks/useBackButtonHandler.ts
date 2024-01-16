import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import Routes from '@/router/routes';

import useBack from '@/hooks/useBack';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import SuggestFormState from '../atoms/SuggestFormState';

import isEqualValue from '../../utils/isEqualValue';

import isNotEqualValue from '../../utils/isNotEqualValue';

export default function useBackButtonHandler() {
  const router = useRouter();

  const [forms, setForms] = useRecoilState<SuggestForm['forms']>(SuggestFormSelector('forms'));

  const setPopup = useSetRecoilState<SuggestForm['popup']>(SuggestFormSelector('popup'));

  const reset = useResetRecoilState(SuggestFormState);

  const { back } = useBack();

  const handleClickBack = useCallback(() => {
    if (isEqualValue(forms[forms.length - 1], 'summary')) {
      setForms((prev) => prev.filter((ele) => ele !== 'summary'));
      return;
    }

    if (isEqualValue(router?.query?.entry, Routes.Home)) {
      if (isNotEqualValue(router?.query?.property, '아파트') && isNotEqualValue(router?.query?.property, '오피스텔')) {
        if (forms.length > 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          back();
        }
      } else if (forms.length >= 2) {
        setPopup('quit');
      } else {
        setTimeout(() => reset(), 200);
        back();
      }
    } else if (isEqualValue(router?.query?.entry, Routes.Map)) {
      if (router?.query?.address && router?.query?.bcode) {
        if (forms.length > 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          back();
        }
      } else if (forms.length >= 2) {
        setPopup('quit');
      } else {
        setTimeout(() => reset(), 200);
        back();
      }
    } else if (
      isEqualValue(router?.query?.entry, Routes.DanjiDetail) ||
      isEqualValue(router?.query?.entry, Routes.SuggestListings)
    ) {
      if (forms.length > 2) {
        setPopup('quit');
      } else {
        back();
        setTimeout(() => reset(), 200);
      }
    } else if (forms.length >= 2) {
      setPopup('quit');
    } else {
      // 그외의 경우
      // 마이페이지 구하기게시내역에서 들어왔을때
      // 채팅방에서 들어왔을때
      // 구해요 설명서에서 들어왔을때
      back();
      setTimeout(() => reset(), 200);
    }
  }, [forms, setForms, router, setPopup, reset, back]);

  return { handleClickBack };
}
