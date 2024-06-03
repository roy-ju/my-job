import Button from '@/components/atoms/Button';

type DistrictButtonProps = {
  selected?: boolean;
  disabled?: boolean;
  handleClick: () => Promise<void>;
};

export default function DistrictButton({ selected = false, disabled = false, handleClick }: DistrictButtonProps) {
  return (
    <Button size="small" variant="outlined" selected={selected} disabled={disabled} onClick={handleClick}>
      학구도
    </Button>
  );
}
