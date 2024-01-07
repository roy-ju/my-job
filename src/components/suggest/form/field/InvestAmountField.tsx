import { memo } from 'react';

import PriceField from './PriceField';

type InvestAmountFieldProps = {
  id: string;
  isRender: boolean;
  price: string;
  label: string;
  handleChange: (e?: NegocioChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
};

function InvestAmountField({ id, isRender, price, label, handleChange, handleReset }: InvestAmountFieldProps) {
  console.log('render InvestAmountField');

  return (
    <PriceField
      id={id}
      isRender={isRender}
      price={price}
      label={label}
      handleChange={handleChange}
      handleReset={handleReset}
    />
  );
}

export default memo(InvestAmountField);
