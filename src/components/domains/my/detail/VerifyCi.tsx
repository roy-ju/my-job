import { ButtonV2 } from '@/components/atoms';

type VerifyCiProps = {
  render: boolean;
  handleClick: () => void;
};

export default function VerifyCi({ render, handleClick }: VerifyCiProps) {
  if (!render) return null;

  return (
    <ButtonV2 size="bigger" onClick={handleClick}>
      본인인증하기
    </ButtonV2>
  );
}
