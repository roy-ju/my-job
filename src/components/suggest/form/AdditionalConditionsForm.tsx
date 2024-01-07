import AdditionalConditionsField from './field/AdditionalConditionsField';

import useSelectAddtionalConditons from './hooks/useSelectAddtionalConditons';

export default function AdditionalConditionsForm() {
  const { list, selectedList, handleClickHashTag } = useSelectAddtionalConditons();

  console.log('render AdditionalConditionsForm');

  return (
    <section id="additional_conditions" tw="pt-10 pb-10 px-5">
      <AdditionalConditionsField list={list} selectedList={selectedList} handleClick={handleClickHashTag} />
    </section>
  );
}
