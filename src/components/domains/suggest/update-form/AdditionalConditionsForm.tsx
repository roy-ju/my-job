// import PastforwardAddtionalConditionsField from '../field/PastforwardAddtionalConditionsField';

import AdditionalConditionsField from '../form/field/AdditionalConditionsField';

import useSelectAddtionalConditons from '../form/hooks/useSelectAddtionalConditons';

import forms from '../form/constants/forms';

export default function AdditionalConditionsForm() {
  const { list, selectedList, handleClickHashTag } = useSelectAddtionalConditons();

  return (
    <section id={forms.ADDITIONAL_CONDITIONS} tw="pt-10 pb-10 px-5">
      {/* <PastforwardAddtionalConditionsField list={list} selectedList={selectedList} /> */}
      <AdditionalConditionsField list={list} selectedList={selectedList} handleClick={handleClickHashTag} />
    </section>
  );
}
