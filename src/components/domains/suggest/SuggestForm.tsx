import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useResetRecoilState } from 'recoil';

import useInitializeFormData from './form/hooks/useInitializeFormData';

import Header from './form/Header';

import Stepper from './form/Stepper';

import Form from './form/Form';

import Actions from './form/Actions';

import SuggestFormState from './form/atoms/SuggestFormState';

const Popups = dynamic(() => import('./form/popups'), { ssr: false });

export default function SuggestForm() {
  const reset = useResetRecoilState(SuggestFormState);

  useInitializeFormData();

  useEffect(
    () => () => {
      reset();
    },
    [reset],
  );

  return (
    <div tw="flex flex-col h-full relative">
      <div tw="[box-shadow: 0px 0px 24px 0px rgba(0,0,0,0.08)]">
        <Header title="집 구해요" />
        <Stepper id="suggestForm-stepper" />
      </div>
      <Form />
      <Actions />
      <Popups />
    </div>
  );
}
