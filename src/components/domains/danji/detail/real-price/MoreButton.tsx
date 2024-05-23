import { Button } from '@/components/atoms';

type MoreButtonProps = {
  handleClick?: () => void;
};

export default function MoreButton({ handleClick }: MoreButtonProps) {
  return (
    <Button variant="outlined" tw="w-full mt-3" onClick={handleClick}>
      더보기
    </Button>
  );
}
