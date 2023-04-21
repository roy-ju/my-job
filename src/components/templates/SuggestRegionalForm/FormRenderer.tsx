import { Separator } from '@/components/atoms';
import { SuggestRegionalForm } from '@/components/organisms';

export const Forms = {
  Region: 'region',
  RealestateType: 'realestateType',
  BuyOrRent: 'buyOrRent',
  Price: 'price',
  Area: 'area',
  Floor: 'floor',
  Purpose: 'purpose',
  Description: 'description',
};

interface Props {
  form: string;
}

export default function FormRenderer({ form }: Props) {
  switch (form) {
    case Forms.Region:
      return (
        <div id={Forms.Region}>
          <div tw="py-7 px-5">
            <SuggestRegionalForm.Region />
          </div>
          <Separator />
          <div tw="pt-7 pb-10 px-5 flex items-center justify-center font-bold">
            최소 10명의 중개사에게 발송됩니다.
            <br />
            매물추천받기 서비스는 현재 수도권에서만 가능합니다.
          </div>
        </div>
      );

    case Forms.RealestateType:
      return (
        <div id={Forms.RealestateType}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.RealestateType />
          </div>
        </div>
      );

    case Forms.Price:
      return (
        <div id={Forms.Price}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Price />
          </div>
        </div>
      );

    case Forms.Area:
      return (
        <div id={Forms.Area}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Area />
          </div>
        </div>
      );

    case Forms.Floor:
      return (
        <div id={Forms.Floor}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Floor />
          </div>
        </div>
      );

    case Forms.Purpose:
      return (
        <div id={Forms.Purpose}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Purpose />
          </div>
        </div>
      );

    case Forms.Description:
      return (
        <div id={Forms.Description}>
          <div tw="py-10 px-5">
            <SuggestRegionalForm.Description />
          </div>
        </div>
      );

    default:
      return null;
  }
}
