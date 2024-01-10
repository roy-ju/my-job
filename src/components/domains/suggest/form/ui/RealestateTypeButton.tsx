import { ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import { RealestateType, describeRealestateType } from '@/constants/enums';

type RealestateTypeButtonProps = {
  value: RealestateType;
  children: ReactNode;
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
};

const Button = styled(motion.button)<{ selected?: boolean }>`
  ${tw`flex flex-col flex-1 gap-1.5 justify-center items-center rounded-xl border [max-width: 62px] [height: 76px] [box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06)]`}

  ${({ selected }) => selected && tw`border-nego-800 [box-shadow: 0px 0px 12px 0px rgba(112, 72, 232, 0.16)]`}

  span {
    ${tw`text-body_01`}
    ${({ selected }) => (selected ? tw`text-nego-800` : tw`text-gray-700`)}
  }
`;

export default function RealestateTypeButton({ value, selected, children, handleClick }: RealestateTypeButtonProps) {
  return (
    <Button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      value={value}
      onClick={handleClick}
      selected={selected}
    >
      {children}
      <span>{describeRealestateType(value)}</span>
    </Button>
  );
}