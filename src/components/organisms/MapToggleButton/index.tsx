import { Button } from '@/components/atoms';
import tw from 'twin.macro';
import Chart from '@/assets/icons/chart.svg';
import HomeWithDollar from '@/assets/icons/home_with_dollar.svg';

interface Props {
  value: number;
  onClick: (i: number) => void;
}

function MapToggleButton({ value, onClick }: Props) {
  return (
    <div
      css={[
        tw`w-[13.6875rem] h-[3.25rem] bg-white shadow-[0px 8px 16px rgba(0, 0, 0, 0.14)] rounded-[60px] p-0.5 flex items-center relative`,
      ]}
    >
      <div
        css={[
          tw`w-[120px] h-[48px] bg-blue-700 absolute left-0 rounded-full m-0.5 transform translate-x-0 duration-75 ease-in-out`,
          value === 1 &&
            tw`w-24 transform translate-x-[7.4rem] bg-nego-800 duration-100`,
        ]}
      />
      <Button
        variant="ghost"
        tw="p-4 w-[120px] h-full z-10 gap-2"
        onClick={() => onClick(0)}
      >
        <Chart
          style={{
            color: value === 0 ? 'white' : '#4C6EF5',
          }}
        />
        <span css={[tw`font-bold text-b1`, value === 0 && tw`text-white`]}>
          실거래가
        </span>
      </Button>
      <Button
        variant="ghost"
        tw="z-10 p-4 w-[96px] h-full gap-2.5"
        onClick={() => onClick(1)}
      >
        <HomeWithDollar
          style={{
            color: value === 1 ? 'white' : '#7048E8',
          }}
        />
        <span css={[tw`font-bold text-b1 `, value === 1 && tw`text-white`]}>
          호가
        </span>
      </Button>
    </div>
  );
}

export default MapToggleButton;
