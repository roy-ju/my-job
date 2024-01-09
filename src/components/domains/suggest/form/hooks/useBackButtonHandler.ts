import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import Routes from '@/router/routes';

import useMobileBackRouter from '@/hooks/utils/useMobileBackRouter';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import SuggestFormState from '../atoms/SuggestFormState';

import isEqualValue from '../../utils/isEqualValue';

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
      if (isEqualValue(router?.query?.entry, 'home')) {
        if (isEqualValue(router?.query?.property, '그외')) {
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
        isEqualValue(router?.query?.entry, 'danjiDetail') ||
        isEqualValue(router?.query?.entry, 'danjiSuggestListings')
      ) {
        if (forms.length > 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          if (isEqualValue(router?.query?.entry, 'danjiDetail')) {
            router.replace(`/${Routes.DanjiDetail}?danjiID=${router?.query?.danjiID}`);
          } else {
            router.replace(`/${Routes.SuggestListings}?danjiID=${router?.query?.danjiID}`);
          }
        }
      } else if (forms.length >= 2) {
        setPopup('quit');
      } else {
        if (isEqualValue(router?.query?.entry, 'my')) {
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
      if (isEqualValue(router?.query?.entry, 'home')) {
        if (isEqualValue(router?.query?.property, '그외')) {
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
        isEqualValue(router?.query?.entry, 'danjiDetail') ||
        isEqualValue(router?.query?.entry, 'danjiSuggestListings')
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
