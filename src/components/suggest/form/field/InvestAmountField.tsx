import { memo } from 'react';

import PriceField from './PriceField';

type InvestAmountFieldProps = {
  id: string;
  isRender: boolean;
  price: string;
  label: string;
  errorMessage?: string;
  handleChange: (e?: NegocioChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
};

function InvestAmountField({
  id,
  isRender,
  price,
  label,
  errorMessage,
  handleChange,
  handleReset,
}: InvestAmountFieldProps) {
  return (
    <PriceField
      id={id}
      isRender={isRender}
      price={price}
      label={label}
      errorMessage={errorMessage}
      handleChange={handleChange}
      handleReset={handleReset}
    />
  );
}

export default memo(InvestAmountField);
