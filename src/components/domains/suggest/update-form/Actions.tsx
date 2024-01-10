import ActionButton from '../form/ui/ActionButton';

import useUpdateFormSummitButton from './hooks/useUpdateFormSummit';

type ActionsProps = { depth?: number };

export default function Actions({ depth }: ActionsProps) {
  const { handleSubmitUpdate } = useUpdateFormSummitButton({ depth });

  return (
    <div tw="w-full">
      <ActionButton
        isRenderRevisionText
        isRenderUpdateButton
        isRenderSummitButton={false}
        disabled={false}
        handleClick={handleSubmitUpdate}
      />
    </div>
  );
}
