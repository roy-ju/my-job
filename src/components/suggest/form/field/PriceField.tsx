import { memo, useState } from 'react';

import { TextField } from '@/components/molecules';

import CloseContained from '@/assets/icons/close_contained.svg';

import { motion } from 'framer-motion';

type PriceFieldProps = {
  id: string;
  isRender: boolean;
  price: string;
  label: string;
  handleChange: (e?: NegocioChangeEvent<HTMLInputElement>) => void;
  handleReset: (e?: NegocioMouseEvent<HTMLSpanElement>) => void;
};

function PriceField({ id, isRender, price, label, handleChange, handleReset }: PriceFieldProps) {
  console.log('render PricesField');
  const [focus, setFocus] = useState(false);

  console.log(focus);

  if (!isRender) return null;

  return (
    <div tw="w-full">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <TextField
          variant="outlined"
          tw="w-full"
          size="xlg"
          nego
          onFocus={() => setFocus(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocus(false);
            }, 200)
          }
        >
          <TextField.PriceInput value={price} onChange={handleChange} label={label} nego isLabelBottom />
          {price && focus && (
            <TextField.Trailing tw="cursor-pointer pr-4" onClick={() => handleReset()}>
              <CloseContained />
            </TextField.Trailing>
          )}
        </TextField>
      </motion.div>
    </div>
  );
}

export default memo(PriceField);
