import Button from '@/components/atoms/Button';

interface SubmitProps {
  onSubmit?: () => void;
  disabled?: boolean;
}

export default function Cta({ disabled, onSubmit }: SubmitProps) {
  return (
    <div tw="px-5 pt-4 pb-5">
      <Button disabled={disabled} onClick={onSubmit} tw="w-full" size="bigger">
        선택 완료
      </Button>
    </div>
  );
}
