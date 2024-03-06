import React from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

const Tab = styled.button`
  ${tw`relative flex-1 pb-3.5 mx-auto cursor-pointer whitespace-nowrap`}
`;

const Indicator = styled(motion.div)`
  ${tw`absolute bottom-0 left-[-0px] w-full h-full border-b-2 border-b-gray-1000`}
`;

const Text = styled.p<{ selected: boolean }>`
  ${tw`[text-align: center] w-full`}
  ${({ selected }) => (selected ? tw`text-subhead_03 text-gray-1000` : tw`text-gray-700 text-body_03`)}
`;

export const TabsV2Wrraper = styled.div`
  ${tw`flex-1 pt-2.5 px-3 flex justify-center`}
`;

export const TabRoot = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const TabsV2 = Object.assign(TabRoot, { Tab, Indicator, Text });
