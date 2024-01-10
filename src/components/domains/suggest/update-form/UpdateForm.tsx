/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'react';

import { useRecoilValue } from 'recoil';

import Separator from '@/components/atoms/Separator';

import RegionOrDanjiForm from '../form/RegionOrDanjiForm';

import RealestateTypeAndBuyOrRentAndPriceForm from '../form/RealestateTypeAndBuyOrRentAndPriceForm';

import BuyPurposeForm from '../form/BuyPurposeForm';

import MoveInDateForm from '../form/MoveInDateForm';

import AreaForm from '../form/AreaForm';

import AdditionalConditionsForm from './AdditionalConditionsForm';

import InterviewForm from '../form/InterviewForm';

import SuggestFormSelector from '../form/selector/SuggestFormSelector';

import SuggestForm from '../form/types';

type UpdateFormProps = {
  depth?: number;
};

export default function UpdateForm({ depth }: UpdateFormProps) {
  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));

  const formComponents = {
    region_or_danji: <RegionOrDanjiForm needDiabledFields />,
    realestate_and_buyOrRent_and_price: <RealestateTypeAndBuyOrRentAndPriceForm needDiabledFields />,
    buy_purpose: <BuyPurposeForm />,
    move_in_date: <MoveInDateForm />,
    area: <AreaForm />,
    additional_conditions: <AdditionalConditionsForm />,
    interview: <InterviewForm />,
  };

  return (
    <div id="formContainer" tw="w-full flex-1 flex flex-col min-h-0 overflow-y-auto pt-10">
      {forms.map((form) => {
        if (form === 'summary') return null;

        return (
          <Fragment key={form}>
            {form !== 'region_or_danji' && <Separator tw="min-w-full [min-height: 8px]" />}
            {formComponents[form]}
          </Fragment>
        );
      })}
    </div>
  );
}
