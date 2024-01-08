import { memo } from 'react';

import { motion } from 'framer-motion';

import CheckboxCheckedIcon from '@/assets/icons/checkbox_checked_blue.svg';

import CheckboxUncheckedIcon from '@/assets/icons/checkbox_unchecked.svg';

type CheckBoxButtonProps = {
  label: string;
  value: string;
  selected: boolean;
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

const CheckBoxButton = memo(({ label, value, selected, handleClick }: CheckBoxButtonProps) => (
  <motion.button
    key={value}
    value={value}
    onClick={handleClick}
    tw="flex gap-2 items-center"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.04 }}
  >
    {selected ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}
    <span tw="text-body_02">{label}</span>
  </motion.button>
));

export default CheckBoxButton;
