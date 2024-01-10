import PyoungListField from './field/PyoungListField';

import PyoungInputWrraper from './field/PyoungInputWrraper';

import useSelectPyoung from './hooks/useSelectPyoung';

import forms from './constants/forms';

type AreaFormProps = { type: 'create' | 'update' };

export default function AreaForm({ type }: AreaFormProps) {
  const { pyoungList, isRenderPyoungListField, list, handleClickPyoung, handleClickDeletePyoung } = useSelectPyoung({
    type,
  });

  return (
    <section id={forms.AREA} tw="pt-10 pb-10 px-5">
      <PyoungListField
        isRender={isRenderPyoungListField}
        list={list}
        selectedList={pyoungList}
        handleClick={handleClickPyoung}
        handleClickDelete={handleClickDeletePyoung}
      />
      <PyoungInputWrraper type={type} />
    </section>
  );
}
