import PyoungListField from './field/PyoungListField';

import PyoungInputWrraper from './field/PyoungInputWrraper';

import useSelectPyoung from './hooks/useSelectPyoung';

export default function AreaForm() {
  const { pyoungList, isRenderPyoungListField, list, handleClickPyoung } = useSelectPyoung();

  console.log('render AreaForm');

  return (
    <section id="area" tw="pt-10 pb-10 px-5">
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
