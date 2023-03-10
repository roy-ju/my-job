import { Button } from '@/components/atoms';
import tw, { theme } from 'twin.macro';
import Chart from '@/assets/icons/chart.svg';
import HomeWithDollar from '@/assets/icons/home_with_dollar.svg';
import { useControlled } from '@/hooks/utils';
import { useCallback } from 'react';

interface Props {
  value?: number;
  onChange?: (i: number) => void;
}

function MapToggleButton({ value: valueProp, onChange }: Props) {
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: 0,
  });

  const handleChangeValue = useCallback(
    (newValue: number) => {
      setValueState(newValue);
      onChange?.(newValue);
    },
    [setValueState, onChange],
  );

  return (
    <div
      css={[
        tw`w-[13.6875rem] h-[3.25rem] bg-white shadow-[0px 8px 16px rgba(0, 0, 0, 0.14)] rounded-[60px] p-0.5 flex items-center relative`,
      ]}
    >
      <div
        css={[
          tw`w-[120px] h-[48px] bg-blue-700 absolute left-0 rounded-full m-0.5 transform translate-x-0 duration-75 ease-in-out`,
          value === 1 && tw`w-24 transform translate-x-[7.4rem] bg-nego-800 duration-100`,
        ]}
      />
      <Button variant="ghost" tw="p-4 w-[120px] h-full z-10 gap-2" onClick={() => handleChangeValue(0)}>
        <Chart color={value === 0 ? theme`colors.white` : theme`colors.blue.700`} />
        <span css={[tw`font-bold text-b1`, value === 0 && tw`text-white`]}>실거래가</span>
      </Button>
      <Button variant="ghost" tw="z-10 p-4 w-[96px] h-full gap-2.5" onClick={() => handleChangeValue(1)}>
        <HomeWithDollar color={value === 1 ? theme`colors.white` : theme`colors.nego.800`} />
        <span css={[tw`font-bold text-b1 `, value === 1 && tw`text-white`]}>호가</span>
      </Button>
    </div>
  );
}

export default MapToggleButton;
