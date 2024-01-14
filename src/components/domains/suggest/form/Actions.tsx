import ActionButton from './ui/ActionButton';

import useFormSummitButton from './hooks/useFormSummitButton';

export default function Actions() {
  const { disabled, hidden, isRenderRevisionText, isRenderSummitButton, handleFormsAction, handleClickBack } =
    useFormSummitButton();

  if (hidden) return null;

  return (
    <div tw="w-full">
      <ActionButton
        isRenderRevisionText={isRenderRevisionText}
        isRenderSummitButton={isRenderSummitButton}
        disabled={disabled}
        handleClick={handleFormsAction}
        handleClickBack={handleClickBack}
      />
    </div>
  );
}
