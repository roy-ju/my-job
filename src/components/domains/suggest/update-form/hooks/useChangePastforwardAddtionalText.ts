/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import SuggestFormSelector from '../../form/selector/SuggestFormSelector';

import SuggestForm from '../../form/types';

export default function useChangePastforwardAddtionalText() {
  const [pastForwardAdditionalText, setPastForwardAdditionalText] = useRecoilState<SuggestForm['note']>(
    SuggestFormSelector('note'),
  );

  const isPastAdditionalCondition = useRecoilValue<SuggestForm['isPastAdditionalCondition']>(
    SuggestFormSelector('isPastAdditionalCondition'),
  );

  const handleChangeAddtionalConditionsInput = useCallback(
    (e?: FormEvent<HTMLTextAreaElement>) => {
      if (e) {
        const { value } = e.currentTarget;
        if (value.length > 200) {
          setPastForwardAdditionalText(value.slice(value.length - 200, value.length));
        } else {
          setPastForwardAdditionalText(value.slice(0, 200));
        }
      }
    },
    [setPastForwardAdditionalText],
  );

  return {
    isRenderField: isPastAdditionalCondition,
    pastForwardAdditionalText: pastForwardAdditionalText ?? '',
    handleChangeAddtionalConditionsInput,
  };
}
