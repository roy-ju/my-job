import PyoungListField from './field/PyoungListField';

import PyoungInputWrraper from './field/PyoungInputWrraper';

import useSelectPyoung from './hooks/useSelectPyoung';

import forms from './constants/forms';

export default function AreaForm() {
  const { pyoungList, isRenderPyoungListField, list, handleClickPyoung } = useSelectPyoung();

  return (
    <section id={forms.AREA} tw="pt-10 pb-10 px-5">
      <PyoungListField
        isRender={isRenderPyoungListField}
        list={list}
        selectedList={pyoungList}
        handleClick={handleClickPyoung}
      />
      <PyoungInputWrraper />
    </section>
  );
}
