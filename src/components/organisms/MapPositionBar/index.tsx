import { Button } from '@/components/atoms';

interface Props {
  position1: string;
  position2: string;
  position3: string;
}

function MapPositionBar({ position1, position2, position3 }: Props) {
  return (
    <div tw="inline-flex bg-white rounded-[30px] shadow-[0px 8px 16px rgba(0, 0, 0, 0.14)] items-center">
      <Button variant="outlined" size="medium" tw="rounded-[30px] border-white">
        {position1}
      </Button>
      <div tw="w-[1px] h-4 bg-gray-300" />
      <Button variant="outlined" size="medium" tw="rounded-[30px] border-white">
        {position2}
      </Button>
      <div tw="w-[1px] h-4 bg-gray-300" />
      <Button variant="outlined" size="medium" tw="rounded-[30px] border-white">
        {position3}
      </Button>
    </div>
  );
}

export default MapPositionBar;
