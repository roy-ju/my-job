import PastforwardAddtionalConditionsField from './field/PastforwardAddtionalConditionsField';

import AdditionalConditionsField from '../form/field/AdditionalConditionsField';

import useSelectAddtionalConditions from '../form/hooks/useSelectAdditionalConditions';

import forms from '../form/constants/forms';

export default function AdditionalConditionsForm() {
  const { list, selectedList, handleClickHashTag } = useSelectAddtionalConditions();

  return (
    <section id={forms.ADDITIONAL_CONDITIONS} tw="pt-10 pb-10 px-5">
      <PastforwardAddtionalConditionsField />
      <AdditionalConditionsField list={list} selectedList={selectedList} handleClick={handleClickHashTag} />
    </section>
  );
}
