import React from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

export const TabsContainer = styled.div`
  ${tw`px-3 pt-2 pb-0 sticky bg-white [top: 56px] [z-index: 300]`}
`;

export const ScrollContainer = styled.div`
  ${tw`flex flex-row items-center overflow-x-auto`}
`;

const Button = styled.button`
  ${tw`relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer flex-1`}
`;

const Indicator = styled(motion.div)`
  ${tw`absolute bottom-0 left-[-0px] w-full h-full border-b-2 border-b-gray-1000`}
`;

const Text = styled.p<{ selected: boolean }>`
  ${tw`[text-align: center] w-full text-b2 [line-height: 17px]`}
  ${({ selected }) => (selected ? tw`font-bold text-gray-1000` : tw`font-normal text-gray-600`)}
`;

const TabRoot = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const CompositedTab = Object.assign(TabRoot, { Button, Indicator, Text });
