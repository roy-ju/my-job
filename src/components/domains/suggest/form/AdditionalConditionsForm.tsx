import AdditionalConditionsField from './field/AdditionalConditionsField';

import useSelectAdditionalConditons from './hooks/useSelectAdditionalConditions';

import forms from './constants/forms';

export default function AdditionalConditionsForm() {
  const { list, selectedList, handleClickHashTag } = useSelectAdditionalConditons();

  return (
    <section id={forms.ADDITIONAL_CONDITIONS} tw="pt-10 pb-10 px-5">
      <AdditionalConditionsField list={list} selectedList={selectedList} handleClick={handleClickHashTag} />
    </section>
  );
}
