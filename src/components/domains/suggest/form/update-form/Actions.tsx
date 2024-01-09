import ActionButton from '../ui/ActionButton';

import useUpdateFormSummitButton from './hooks/useUpdateFormSummit';

type ActionsProps = { depth?: number };

export default function Actions({ depth }: ActionsProps) {
  const { handleClickSubmit } = useUpdateFormSummitButton({ depth });

  return (
    <div tw="w-full">
      <ActionButton
        isRenderRevisionText={false}
        isRenderSummitButton={false}
        isRenderUpdateButton
        disabled={false}
        handleClick={handleClickSubmit}
      />
    </div>
  );
}
