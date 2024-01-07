import MoveInDateField from './field/MoveInDateField';

import useChangeMoveInDate from './hooks/useChangeMoveInDate';

export default function MoveInDateForm() {
  const { isRenderMoveInDateField, moveInDate, moveInDateType, handleChangeMoveInDate, handlChangeMoveInDateType } =
    useChangeMoveInDate();

  return (
    <section id="move_in_date" tw="pt-10 pb-10 px-5">
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
