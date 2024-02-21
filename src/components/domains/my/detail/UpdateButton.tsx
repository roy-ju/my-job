import { ButtonV2 } from '@/components/atoms';

import { TextFieldV2 } from '@/components/molecules';

type UpdateButtonProps = {
  ctaTitle?: string;
  render: boolean;
  disabled?: boolean;
  handleClick?: () => void;
};

export default function UpdateButton({ ctaTitle, render, disabled, handleClick }: UpdateButtonProps) {
  if (!render) return null;

  return (
    <TextFieldV2.Trailing>
      <ButtonV2 disabled={disabled} size="small" variant="gray" radius="r8" onClick={handleClick}>
        {ctaTitle || '수정'}
      </ButtonV2>
    </TextFieldV2.Trailing>
  );
}
