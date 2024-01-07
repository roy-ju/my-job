/* eslint-disable @typescript-eslint/no-unused-vars */
import ActionButton from './ui/ActionButton';

import useSummitButton from './hooks/useSummitButton';

type ActionsProps = { depth?: number };

export default function Actions({ depth }: ActionsProps) {
  const { disabled, isRenderRevisionText, handleFormsAction } = useSummitButton();

  return (
    <div tw="w-full">
      <ActionButton isRenderRevisionText={isRenderRevisionText} disabled={disabled} handleClick={handleFormsAction} />
    </div>
  );
}
