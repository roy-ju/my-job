import ActionButton from './ui/ActionButton';

import useSummitButton from './hooks/useSummitButton';

type ActionsProps = { depth?: number };

export default function Actions({ depth }: ActionsProps) {
  const { disabled, isRenderRevisionText, isRenderSummitButton, handleFormsAction, handleClickBackButton } =
    useSummitButton({ depth });

  return (
    <div tw="w-full">
      <ActionButton
        isRenderRevisionText={isRenderRevisionText}
        isRenderSummitButton={isRenderSummitButton}
        disabled={disabled}
        handleClick={handleFormsAction}
        handleClickBackButton={handleClickBackButton}
      />
    </div>
  );
}
