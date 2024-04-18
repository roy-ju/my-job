import { memo } from 'react';

import { motion } from 'framer-motion';

import CheckboxCheckedIcon from '@/assets/icons/checkbox_checked_blue_2.svg';

import CheckboxUncheckedIcon from '@/assets/icons/checkbox_unchecked_2.svg';

type CheckBoxButtonProps = {
  isAnimate?: boolean;
  label: string;
  value: string;
  selected: boolean;
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

const CheckBoxButton = memo(({ isAnimate = true, label, value, selected, handleClick }: CheckBoxButtonProps) => (
  <motion.button
    key={value}
    value={value}
    onClick={handleClick}
    tw="flex gap-2 items-center"
    initial={isAnimate && { opacity: 0, y: -10 }}
    animate={isAnimate && { opacity: 1, y: 0 }}
    transition={isAnimate ? { duration: 0.6 } : undefined}
    whileHover={isAnimate ? { scale: 1.04 } : undefined}
  >
    {selected ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}
    <span tw="text-body_02">{label}</span>
  </motion.button>
));

export default CheckBoxButton;
