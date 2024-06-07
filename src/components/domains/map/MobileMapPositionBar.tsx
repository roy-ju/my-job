import { Button } from '@/components/atoms';

interface MobileMapPositionBarProps {
  eubmyundong?: string;
  onClick: () => void;
}

export default function MobileMapPositionBar({ eubmyundong, onClick }: MobileMapPositionBarProps) {
  return (
    <div tw="inline-flex bg-white rounded-[30px] shadow-[0px 8px 16px rgba(0, 0, 0, 0.14)] items-center">
      {eubmyundong && (
        <Button
          variant="outlined"
          size="medium"
          tw="whitespace-nowrap rounded-[30px] border-white px-4"
          onClick={onClick}
        >
          {eubmyundong}
        </Button>
      )}
    </div>
  );
}
