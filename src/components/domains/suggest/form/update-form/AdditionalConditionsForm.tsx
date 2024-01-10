import AdditionalConditionsField from '../field/AdditionalConditionsField';

import useSelectAddtionalConditons from '../hooks/useSelectAddtionalConditons';

import forms from '../constants/forms';

// import PastforwardAddtionalConditionsField from '../field/PastforwardAddtionalConditionsField';

export default function AdditionalConditionsForm() {
  const { list, selectedList, handleClickHashTag } = useSelectAddtionalConditons();

  return (
    <section id={forms.ADDITIONAL_CONDITIONS} tw="pt-10 pb-10 px-5">
      {/* <PastforwardAddtionalConditionsField list={list} selectedList={selectedList} /> */}
      <AdditionalConditionsField list={list} selectedList={selectedList} handleClick={handleClickHashTag} />
    </section>
  );
}
