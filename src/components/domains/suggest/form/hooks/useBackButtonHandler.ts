import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import useMobileBackRouter from '@/hooks/useMobileBackRouter';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import SuggestFormState from '../atoms/SuggestFormState';

import isEqualValue from '../../utils/isEqualValue';

import isNotEqualValue from '../../utils/isNotEqualValue';

export default function useBackButtonHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const [forms, setForms] = useRecoilState<SuggestForm['forms']>(SuggestFormSelector('forms'));

  const setPopup = useSetRecoilState<SuggestForm['popup']>(SuggestFormSelector('popup'));

  const reset = useResetRecoilState(SuggestFormState);

  const { mobilebackHandler } = useMobileBackRouter();

  const handleClickBack = useCallback(() => {
    if (isEqualValue(forms[forms.length - 1], 'summary')) {
      setForms((prev) => prev.filter((ele) => ele !== 'summary'));
      return;
    }

    if (isEqualValue(platform, 'pc')) {
      if (isEqualValue(router?.query?.entry, Routes.Home)) {
        if (
          isNotEqualValue(router?.query?.property, '아파트') &&
          isNotEqualValue(router?.query?.property, '오피스텔')
        ) {
          if (forms.length > 2) {
            setPopup('quit');
          } else {
            setTimeout(() => reset(), 200);
            router.replace(`/`);
          }
        } else if (forms.length >= 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          router.replace(`/`);
        }
      } else if (
        isEqualValue(router?.query?.entry, Routes.DanjiDetail) ||
        isEqualValue(router?.query?.entry, Routes.SuggestListings)
      ) {
        if (forms.length > 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          if (isEqualValue(router?.query?.entry, Routes.DanjiDetail)) {
            router.replace(`/${Routes.DanjiDetail}?danjiID=${router?.query?.danjiID}`);
          } else {
            router.replace(`/${Routes.SuggestListings}?danjiID=${router?.query?.danjiID}`);
          }
        }
      } else if (forms.length >= 2) {
        setPopup('quit');
      } else {
        if (isEqualValue(router?.query?.entry, Routes.My)) {
          router.replace(`/${Routes.My}?default=1`);
        } else if (isEqualValue(router?.query?.entry, 'chatRoomList')) {
          router.replace(`/${Routes.My}?default=1`);
        } else {
          router.replace(`/${Routes.Map}`);
        }
        setTimeout(() => reset(), 200);
      }
    }

    if (isEqualValue(platform, 'mobile')) {
      if (isEqualValue(router?.query?.entry, Routes.Home)) {
        if (
          isNotEqualValue(router?.query?.property, '아파트') &&
          isNotEqualValue(router?.query?.property, '오피스텔')
        ) {
          if (forms.length > 2) {
            setPopup('quit');
          } else {
            setTimeout(() => reset(), 200);
            mobilebackHandler();
          }
        } else if (forms.length >= 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          mobilebackHandler();
        }
      } else if (
        isEqualValue(router?.query?.entry, Routes.DanjiDetail) ||
        isEqualValue(router?.query?.entry, Routes.SuggestListings)
      ) {
        if (forms.length > 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          mobilebackHandler();
        }
      } else if (forms.length >= 2) {
        setPopup('quit');
      } else {
        setTimeout(() => reset(), 200);
        mobilebackHandler();
      }
    }
  }, [forms, platform, setForms, router, setPopup, reset, mobilebackHandler]);

  return { handleClickBack };
}
