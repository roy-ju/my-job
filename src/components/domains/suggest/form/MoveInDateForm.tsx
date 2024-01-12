import MoveInDateField from './field/MoveInDateField';

import useChangeMoveInDate from './hooks/useChangeMoveInDate';

import forms from './constants/forms';
import Section from './ui/Section';

export default function MoveInDateForm() {
  const { isRenderMoveInDateField, moveInDate, moveInDateType, handleChangeMoveInDate, handlChangeMoveInDateType } =
    useChangeMoveInDate();

  return (
    <Section id={forms.MOVE_IN_DATE}>
      <MoveInDateField
        isRender={isRenderMoveInDateField}
        moveInDate={moveInDate}
        moveInDateType={moveInDateType}
        handleChangeMoveInDate={handleChangeMoveInDate}
        handleChangeMoveInDateType={handlChangeMoveInDateType}
      />
    </Section>
  );
}
