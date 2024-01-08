import MoveInDateField from './field/MoveInDateField';

import useChangeMoveInDate from './hooks/useChangeMoveInDate';

import forms from './constants/forms';

export default function MoveInDateForm() {
  const { isRenderMoveInDateField, moveInDate, moveInDateType, handleChangeMoveInDate, handlChangeMoveInDateType } =
    useChangeMoveInDate();

  return (
    <section id={forms.MOVE_IN_DATE} tw="pt-10 pb-10 px-5">
      <MoveInDateField
        isRender={isRenderMoveInDateField}
        moveInDate={moveInDate}
        moveInDateType={moveInDateType}
        handleChangeMoveInDate={handleChangeMoveInDate}
        handleChangeMoveInDateType={handlChangeMoveInDateType}
      />
    </section>
  );
}
