import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import { useResetRecoilState } from 'recoil';

import Header from './update-form/Header';

import Actions from './update-form/Actions';

import UpdateForm from './update-form/UpdateForm';

import SuggestFormState from './form/atoms/SuggestFormState';

import StepperTitle from './form/ui/StepperTitle';

import useInitializeUpdateFormData from './update-form/hooks/useInitializeUpdateFormData';

const Popups = dynamic(() => import('./form/popups'), { ssr: false });

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
      <div tw="[box-shadow: 0px 0px 24px 0px rgba(0,0,0,0.08)]">
        <Header title="집 구해요 수정" />
        <div tw="pt-5 pb-8 px-5">
          <StepperTitle
            title="집 구하기 조건을 수정해보세요!"
            subTitle={
              '위치, 부동산 종류, 거래 종류는 수정이 불가해요.\n수정을 원하시면 새로운 집구하기를 작성해보세요!'
            }
            isIcon={false}
          />
        </div>
      </div>
      <UpdateForm depth={depth} />
      <Actions depth={depth} />
      <Popups />
    </div>
  );
}
