import Section from './ui/Section';

import AdditionalConditionsField from './field/AdditionalConditionsField';

import useSelectAdditionalConditons from './hooks/useSelectAdditionalConditions';

import forms from './constants/forms';

export default function AdditionalConditionsForm() {
  const { list, selectedList, handleClickHashTag } = useSelectAdditionalConditons();

  return (
    <Section id={forms.ADDITIONAL_CONDITIONS}>
      <AdditionalConditionsField list={list} selectedList={selectedList} handleClick={handleClickHashTag} />
    </Section>
  );
}
