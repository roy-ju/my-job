import tw, { styled } from 'twin.macro';

import Button from '@/components/atoms/Button';
import { motion } from 'framer-motion';

export const DefaultContainer = styled.div`
  ${tw`relative w-full [height: 256px]`}
`;

export const BackGround = styled.div`
  ${tw`absolute z-10 w-full h-full [background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))]`}
`;

export const Container = styled.div`
  ${tw`relative w-full overflow-x-hidden`}
`;

export const ViewAllButton = styled(Button)`
  ${tw`z-20 rounded-bubble h-5 text-[10px] text-white px-2 bg-gray-1000/50 absolute bottom-3 right-5`}
`;

export const DragMotion = styled(motion.div)`
  ${tw`flex flex-row items-end justify-center`}
`;

export const ImageWrraper = styled.div`
  ${tw`relative w-full [height: 256px]`}
`;
