import tw, { styled } from 'twin.macro';

export const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 min-h-0 overflow-x-hidden overflow-y-auto`}
`;

export const GuideTitle = styled.div`
  ${tw`text-gray-900 text-subhead_03`}
`;

export const GuideParagraph = styled.div`
  p:nth-of-type(1) {
    ${tw`text-gray-800 text-body_02`}
  }

  p:nth-of-type(2) {
    ${tw`text-gray-700 text-body_01`}
  }
`;

export const SearchWrraper = styled.div`
  ${tw`px-5`}
`;

export const FormContainer = styled.div`
  ${tw`flex-1 min-h-0`}
`;

export const Form = styled.form`
  ${tw`flex flex-col h-full`}
`;
