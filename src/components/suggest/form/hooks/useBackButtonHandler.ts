import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useRouter as useCustormRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import SuggestFormState from '../atoms/SuggestFormState';

import isEqualValue from '../../utils/isEqualValue';

export default function useBackButtonHandler({ depth }: { depth?: number }) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const customRouter = useCustormRouter(depth);

  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));

  const setPopup = useSetRecoilState<SuggestForm['popup']>(SuggestFormSelector('popup'));

  const reset = useResetRecoilState(SuggestFormState);

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      if (isEqualValue(router?.query?.entry, 'home')) {
        if (router.query.property === '그외') {
          if (forms.length > 2) {
            setPopup('quit');
          } else {
            setTimeout(() => reset(), 200);
            customRouter.pop(undefined, true);
          }
        } else if (forms.length >= 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          customRouter.pop(undefined, true);
        }
      } else if (forms.length >= 2) {
        setPopup('quit');
      } else {
        customRouter.pop();
        setTimeout(() => reset(), 200);
      }
    }

    if (platform === 'mobile') {
      if (isEqualValue(router?.query?.entry, 'home')) {
        if (router.query.property === '그외') {
          if (forms.length > 2) {
            setPopup('quit');
          } else {
            setTimeout(() => reset(), 200);
            router.back();
          }
        } else if (forms.length >= 2) {
          setPopup('quit');
        } else {
          setTimeout(() => reset(), 200);
          router.back();
        }
      } else if (forms.length >= 2) {
        setPopup('quit');
      } else {
        setTimeout(() => reset(), 200);
        router.back();
      }
    }
  }, [forms?.length, platform, customRouter, router, reset, setPopup]);

  return { handleClickBack };
}
