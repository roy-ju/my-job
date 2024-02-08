import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

export const PcLoginPopupContainer = styled.div`
  ${tw`[width: 400px] bg-white [border-radius: 20px]`}
`;

export const ButtonContainer = styled.div`
  ${tw`p-4 text-right h-14`}
`;

export const CloseButton = styled.button``;

export const TitleContainer = styled.div`
  ${tw`px-5 py-6`}

  p:nth-of-type(1) {
    ${tw`mb-1 text-heading_04`}
  }
  p:nth-of-type(2) {
    ${tw`text-gray-700 text-body_03`}
  }
`;

export const ImageContainer = styled.div`
  ${tw`[padding-inline: 50px] pt-2`}
`;

export const CtasContainer = styled.div`
  ${tw`pt-6 pb-5`}
`;

export const BottomSheetContainer = styled(motion.div)`
  ${tw`absolute left-0 bottom-0 w-full bg-white [border-top-left-radius: 20px] [border-top-right-radius: 20px] pt-10 pb-5`}
`;

export const BottomSheetChild = styled(motion.div)``;

export const bottomSheetVariants = {
  hidden: { y: '100%' },

  visible: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delay: 0.1,
    },
  },

  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
