import { Button } from '@/components/atoms';
import tw from 'twin.macro';
import Chart from '@/assets/icons/chart.svg';
import HomeWithDollar from '@/assets/icons/home_with_dollar.svg';
import useControlled from '@/hooks/useControlled';
import { useCallback } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      layout
      css={[
        tw`h-[3.25rem] bg-white shadow-[0px 8px 16px rgba(0, 0, 0, 0.14)] rounded-[60px] p-0.5 inline-flex items-center relative`,
      ]}
    >
      <Button variant="ghost" tw="relative p-4 h-full z-10 gap-2" onClick={() => handleChangeValue(0)}>
        <Chart css={[tw`transition-colors`, value === 0 ? tw`text-white` : tw`text-blue-700`]} />
        <span
          css={[
            tw`overflow-hidden font-bold transition-colors text-b1 whitespace-nowrap text-ellipsis`,
            value === 0 && tw`text-white`,
          ]}
        >
          실거래 정보
        </span>
        {value === 0 && (
          <motion.div layoutId="selection" tw="absolute top-0 left-0 bg-blue-700 w-full h-full -z-10 rounded-[60px]" />
        )}
      </Button>
      <Button variant="ghost" tw="relative z-10 p-4 h-full gap-2.5" onClick={() => handleChangeValue(1)}>
        <HomeWithDollar css={[tw`transition-colors`, value === 1 ? tw`text-white` : tw`text-nego-800`]} />
        <span
          css={[
            tw`overflow-hidden font-bold transition-colors text-b1 whitespace-nowrap text-ellipsis`,
            value === 1 && tw`text-white`,
          ]}
        >
          매물 정보
        </span>
        {value === 1 && (
          <motion.div layoutId="selection" tw="absolute top-0 left-0 bg-nego-800 w-full h-full -z-10 rounded-[60px]" />
        )}
      </Button>
    </motion.div>
  );
}

export default MapToggleButton;
