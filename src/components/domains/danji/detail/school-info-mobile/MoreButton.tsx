import Button from '@/components/atoms/Button';

type MoreButtonProps = {
  title: string;
  handleClick: () => void;
};

export default function MoreButton({ title, handleClick }: MoreButtonProps) {
  return (
    <Button size="medium" variant="outlined" tw="mt-5 w-full" onClick={handleClick}>
      {title}
    </Button>
  );
}
