/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'react';

import { useRecoilValue } from 'recoil';

import Separator from '@/components/atoms/Separator';

import SuggestFormSelector from './selector/SuggestFormSelector';

import RegionOrDanjiForm from './RegionOrDanjiForm';

import RealestateTypeAndBuyOrRentAndPriceField from './RealestateTypeAndBuyOrRentAndPriceForm';

import BuyPurposeForm from './BuyPurposeForm';

import MoveInDateForm from './MoveInDateForm';

import AreaForm from './AreaForm';

import InterviewForm from './InterviewForm';

import AdditionalConditionsForm from './AdditionalConditionsForm';

import Summary from './Summary';

import SuggestForm from './types';

import useAutoScroll from './hooks/useAutoScroll';

type FormProps = {
  depth?: number;
};

export default function Form({ depth }: FormProps) {
  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));

  useAutoScroll({ elementID: 'formContainer', targetForm: forms });

  const formComponents = {
    region_or_danji: <RegionOrDanjiForm />,
    realestate_and_buyOrRent_and_price: <RealestateTypeAndBuyOrRentAndPriceField />,
    buy_purpose: <BuyPurposeForm />,
    move_in_date: <MoveInDateForm />,
    area: <AreaForm type="create" />,
    additional_conditions: <AdditionalConditionsForm />,
    interview: <InterviewForm />,
  };

  if (forms[forms.length - 1] === 'summary') {
    return <Summary />;
  }

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
