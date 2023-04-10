import React, { ReactNode } from 'react';

import { motion } from 'framer-motion';

// css={[isSelected ? tw`bg-gray-100` : tw`bg-gray-400`]}
//  w-[20.4375rem] m-auto

interface ItemProps {
  children?: ReactNode;
  slideDirection?: string;
}

export default function Item({ children, slideDirection }: ItemProps) {
  const positionX = slideDirection === 'left' ? -300 : 300;
  console.log(slideDirection);

  return (
    <motion.div
      tw="rounded-xl relative flex gap-3 -ml-[312px]"
      initial={{ opacity: 0, x: positionX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: positionX * -1 }}
      transition={{ duration: 0.3 }}
    >
      <div tw="bg-gray-400 shrink-0 w-[327px] rounded-xl" />
      <div tw="bg-gray-100 shrink-0 w-[327px] rounded-xl">{children}</div>
      <div tw="bg-gray-400 shrink-0 w-[327px] rounded-xl" />
    </motion.div>
  );
}

//     <div tw="bg-gray-400 rounded-r-xl" />
//  <div tw=" bg-gray-400 w-3.5  rounded-l-xl" />
