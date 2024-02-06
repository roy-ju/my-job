import { ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import { RealestateType, describeRealestateType } from '@/constants/enums';

type RealestateTypeButtonProps = {
  value: RealestateType;
  children: ReactNode;
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
  disabled?: boolean;
  needDiabledFields?: boolean;
};

const Button = styled(motion.button)<{ selected?: boolean; disabled?: boolean; needdiabledfields?: string }>`
  ${tw`flex flex-col flex-1 gap-1.5 justify-center items-center rounded-xl border [min-width: 60px] [height: 76px] [box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06)]`}

  ${({ selected }) => selected && tw`border-nego-800 [box-shadow: 0px 0px 12px 0px rgba(112, 72, 232, 0.16)]`}
  ${({ needdiabledfields }) => needdiabledfields && tw`pointer-events-none`}
  ${({ needdiabledfields, selected }) =>
    needdiabledfields && !selected && tw`pointer-events-none svg:opacity-50 [box-shadow: none]`}

  span {
    ${tw`text-body_01`}
    ${({ selected }) => (selected ? tw`text-nego-800` : tw`text-gray-700`)}
    ${({ disabled }) => disabled && tw`text-gray-500`}
  }
`;

export default function RealestateTypeButton({
  value,
  selected,
  disabled,
  needDiabledFields,
  children,
  handleClick,
}: RealestateTypeButtonProps) {
  return (
    <Button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      value={value}
      onClick={handleClick}
      selected={selected}
      disabled={disabled}
      needdiabledfields={needDiabledFields ? 'true' : undefined}
      tw="flex-1"
    >
      {children}
      <span>{describeRealestateType(value)}</span>
    </Button>
  );
}
