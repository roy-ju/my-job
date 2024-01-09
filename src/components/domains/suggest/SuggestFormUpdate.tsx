import React, { useEffect } from 'react';

import { useResetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import useInitializeUpdateFormData from './update-form/hooks/useInitializeUpdateFormData';

import Header from './update-form/Header';

import Form from './form/Form';

import Popups from './form/popups';

import SuggestFormState from './form/atoms/SuggestFormState';

import Actions from './update-form/Actions';

type SuggestFormUpdateProps = { depth?: number };

export default function SuggestFormUpdate({ depth }: SuggestFormUpdateProps) {
  const router = useRouter();

  const reset = useResetRecoilState(SuggestFormState);

  useInitializeUpdateFormData({ suggestID: router?.query?.suggestID ? Number(router.query.suggestID) : null });

  useEffect(
    () => () => {
      reset();
    },
    [reset],
  );

  return (
    <div tw="flex flex-col h-full">
      <Header title="구해요 수정" />
      <Form depth={depth} stopAutoScroll />
      <Actions depth={depth} />
      <Popups />
    </div>
  );
}
