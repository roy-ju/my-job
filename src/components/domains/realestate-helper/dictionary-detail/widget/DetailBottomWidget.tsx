import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

export const BottomContainer = styled(motion.div)`
  ${tw`flex-1 w-full pb-20 bg-gray-100`}
`;

export const BottomContentsBody = styled(motion.div)`
  ${tw`flex flex-col gap-4 pt-5`}
`;

export const BottomContentsTitle = styled.div`
  ${tw`flex items-center justify-between`}

  span:nth-of-type(1) {
    ${tw`text-heading_01 text-gray-1000`}
  }

  span:nth-of-type(2) {
    ${tw`text-gray-700 text-body_02`}
  }
`;

export const BottomContentsDict = styled(motion.button)`
  ${tw`flex flex-col gap-1 text-left`}

  span {
    ${tw`text-left text-gray-800 text-subhead_03`}
  }

  p {
    ${tw`text-gray-700 whitespace-pre-line text-body_02`}
  }
`;

export const GoListButton = styled.button`
  ${tw`block mx-auto mt-10 text-center text-gray-700 underline text-body_02`}
`;

export const BottomContentsWrraper = styled.div`
  ${tw`bg-white mt-5 mx-5 p-5 [box-shadow:  0px 2px 16px 0px #0000000F] flex flex-col gap-5 rounded-2xl`}
`;
