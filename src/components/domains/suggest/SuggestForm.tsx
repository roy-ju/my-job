import React, { useEffect } from 'react';

import { useResetRecoilState } from 'recoil';

import useInitializeFormData from './form/hooks/useInitializeFormData';

import Header from './form/Header';

import Stepper from './form/Stepper';

import Form from './form/Form';

import Actions from './form/Actions';

import Popups from './form/popups';

import SuggestFormState from './form/atoms/SuggestFormState';

type SuggestFormProps = { depth?: number };

export default function SuggestForm({ depth }: SuggestFormProps) {
  const reset = useResetRecoilState(SuggestFormState);

  useInitializeFormData();

  useEffect(
    () => () => {
      reset();
    },
    [reset],
  );

  return (
    <div tw="flex flex-col h-full">
      <Header title="집 구하기" depth={depth} />
      <Stepper />
      <Form depth={depth} />
      <Actions depth={depth} />
      <Popups depth={depth} />
    </div>
  );
}
