import React from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

const Tab = styled.button`
  ${tw`relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer flex-1`}
`;

const Indicator = styled(motion.div)`
  ${tw`absolute bottom-0 left-[-0px] w-full h-full border-b-2 border-b-gray-1000`}
`;

const Text = styled.p<{ selected: boolean }>`
  ${tw`[text-align: center] w-full text-b2 [line-height: 17px]`}
  ${({ selected }) => (selected ? tw`font-bold text-gray-1000` : tw`font-normal text-gray-600`)}
`;

export const TabRoot = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const DanjiTab = Object.assign(TabRoot, { Tab, Indicator, Text });
