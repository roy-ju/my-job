import { motion } from 'framer-motion';
import tw, { styled } from 'twin.macro';

export const TabsContainer = styled.div`
  ${tw`relative flex w-full mt-5 mb-3`}
`;

export const ScrollContainer = styled.div`
  ${tw`flex flex-row items-center gap-2 px-5 overflow-x-auto`}
  transition: scroll 0.2s ease;
`;

export const TitleWrraper = styled.div`
  ${tw`flex items-center gap-2 px-5 text-heading_01`}
`;

export const CheckListContainer = styled.div`
  ${tw``}
`;

export const CheckListWrraper = styled.div`
  ${tw`py-5`}
`;

export const AdditionListWrraper = styled.div`
  ${tw`px-5`}
`;

export const AdditionalListItem = styled.span`
  ${tw`flex items-center gap-2 py-4 border-b border-b-gray-200`}
`;

export const AddtionalListQuestion = styled.span`
  ${tw`text-gray-500 text-subhead_03`}
`;

export const AddtionalListText = styled.span`
  ${tw`text-gray-800 text-body_03`}
`;

export const RequiredListWrraper = styled.div`
  ${tw`flex flex-col gap-4 px-5`}
`;

export const RequiredListItem = styled(motion.div)`
  ${tw`text-body_03 flex flex-row items-center gap-2 py-4 px-3 rounded-2xl [background: rgba(243, 240, 255, 0.6)] cursor-pointer`}
`;

export const SubTitle = styled.div`
  ${tw`flex flex-col gap-1`}

  span:nth-of-type(1) {
    ${tw`text-heading_01 whitespace-pre-line`}
  }

  span:nth-of-type(2) {
    ${tw`text-body_02 text-gray-700 whitespace-pre-line`}
  }
`;

export const Flex = styled.div`
  ${tw`p-5 flex flex-row items-center [width: calc(100% - 40px)] rounded-2xl mx-auto gap-3 mt-4`}

  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06), 0px 2px 10px 0px rgba(0, 0, 0, 0.03);
`;
