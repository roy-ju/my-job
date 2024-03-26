import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

export const ListItemWrraper = styled(motion.div)`
  ${tw`relative pb-10`}

  p {
    ${tw`whitespace-pre-line`}
  }
`;

export const Summary = styled.div`
  ${tw`relative flex`}
`;

export const SummaryTextWrraper = styled.div`
  ${tw`flex flex-col pl-3 text-left`}
`;

export const Title = styled.span`
  ${tw`text-gray-900 text-heading_01`}
`;

export const Thumbnail = styled.span`
  ${tw`text-gray-700 text-body_02`}
`;

export const SummaryButton = styled.button`
  ${tw`pl-4 ml-auto`}
`;

export const Detail = styled(motion.div)`
  ${tw`flex flex-col gap-8 p-6 mt-5 bg-gray-100 ml-9 rounded-2xl`}
`;

export const Content = styled(motion.span)`
  ${tw`text-gray-800 whitespace-pre-line text-body_03`}
`;
