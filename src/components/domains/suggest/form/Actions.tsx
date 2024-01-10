import ActionButton from './ui/ActionButton';

import useFormSummitButton from './hooks/useFormSummitButton';

type ActionsProps = { depth?: number };

export default function Actions({ depth }: ActionsProps) {
  const { disabled, hidden, isRenderRevisionText, isRenderSummitButton, handleFormsAction, handleClickBack } =
    useFormSummitButton({
      depth,
    });

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
