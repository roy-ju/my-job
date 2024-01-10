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

type SuggestFormProps = { depth?: number };

export default function SuggestForm({ depth }: SuggestFormProps) {
  const reset = useResetRecoilState(SuggestFormState);

  useInitializeFormData();

  useEffect(
    () => () => {
      console.log('render');
      reset();
    },
    [reset],
  );

  return (
    <div tw="flex flex-col h-full relative">
      <Header title="집 구하기" />
      <Stepper />
      <Form depth={depth} />
      <Actions depth={depth} />
      <Popups />
    </div>
  );
}
