import { Label, Checkbox } from '@/components/atoms';
import useControlled from '@/hooks/useControlled';
import { ChangeEventHandler, useCallback } from 'react';

interface EtcFilterProps {
  quickSale?: boolean;
  gapInvestment?: boolean;
  onChangeQuickSale?: (value: boolean) => void;
  onChangeGapInvestment?: (value: boolean) => void;
}

export default function EtcFilter({
  quickSale: quickSaleProp,
  gapInvestment: gapInvestmentProp,
  onChangeQuickSale,
  onChangeGapInvestment,
}: EtcFilterProps) {
  const [quickSale, setQuickSale] = useControlled({ controlled: quickSaleProp, default: false });

  const [gapInvestment, setGapInvestment] = useControlled({
    controlled: gapInvestmentProp,
    default: false,
  });

  const handleChangeQuickSale = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const newValue = e.target.checked;
      setQuickSale(newValue);
      onChangeQuickSale?.(newValue);
    },
    [setQuickSale, onChangeQuickSale],
  );

  const handleChangeGapInvestment = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const newValue = e.target.checked;
      setGapInvestment(newValue);
      onChangeGapInvestment?.(newValue);
    },
    [setGapInvestment, onChangeGapInvestment],
  );

  return (
    <div tw="py-5">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">기타</p>
      <div tw="flex gap-4">
        <Label label="급매" checked={quickSale} onChange={handleChangeQuickSale} control={<Checkbox />} />
        <Label label="갭투자" checked={gapInvestment} onChange={handleChangeGapInvestment} control={<Checkbox />} />
      </div>
    </div>
  );
}
