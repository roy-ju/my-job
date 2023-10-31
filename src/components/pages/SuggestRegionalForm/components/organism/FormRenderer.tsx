import { Separator } from '@/components/atoms';

import { FormsInfo } from '../../types';

import useForm from '../../hooks/useForm';

import { SuggestRegionalForm } from '.';

interface Props {
  form: string;
}

export default function FormRenderer({ form }: Props) {
  const forms = useForm();

  switch (form) {
    case FormsInfo.BasicInfo:
      return (
        <div id={FormsInfo.BasicInfo}>
          <div tw="pt-7 pb-10 px-5 flex items-center font-bold [letter-spacing: -0.25px]">
            최소 10명의 중개사님에게 추천 요청이 발송됩니다.
            <br />
            간편하게 매물 추천 받고, 합의 여부를 선택해 보세요.
          </div>
          <Separator />
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Region />
          </div>
          <Separator />
          <div tw="pt-10 pb-7 px-5">
            <SuggestRegionalForm.RealestateType />
          </div>
          <div tw="pt-7 pb-10 px-5">
            <SuggestRegionalForm.BuyOrRent />
          </div>
        </div>
      );

    case FormsInfo.MoveInDate:
      return (
        <div id={FormsInfo.MoveInDate}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.MoveInDate />
          </div>
        </div>
      );

    case FormsInfo.Purpose:
      return (
        <div tw="py-10" id={FormsInfo.Purpose}>
          <div tw="px-5">
            <SuggestRegionalForm.Purpose />
          </div>
          {forms?.formData?.purpose && (
            <div tw="mt-7 px-5">
              {forms?.formData?.purpose === '투자' ? (
                <SuggestRegionalForm.InvestAmount />
              ) : (
                <SuggestRegionalForm.MoveInDate />
              )}
            </div>
          )}
        </div>
      );

    case FormsInfo.Option:
      return (
        <div id={FormsInfo.Option}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Area />
          </div>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Description />
          </div>
          <div tw="pb-10 px-5">
            <SuggestRegionalForm.Interview />
          </div>
        </div>
      );

    default:
      return null;
  }
}
