import tw, { styled } from 'twin.macro';

export const FormContainer = styled.div`
  ${tw`flex-1 min-h-0 overflow-x-hidden overflow-y-auto`}
`;

export const AddressLineInfoWrraper = styled.div`
  ${tw`flex flex-col gap-1 px-5 pb-3`}
`;

export const AddressLine1 = styled.div`
  ${tw`text-gray-900 text-heading_01`}
`;

export const AddressLine2 = styled.div`
  ${tw`text-gray-700 text-body_03`}
`;

export const LineWrraper = styled.div`
  ${tw`px-5`}
`;

export const Line = styled.div`
  ${tw`[min-height: 1px] w-full bg-gray-200`}
`;

export const AddressDetailWrraper = styled.div`
  ${tw`px-5`}
`;

export const DetailTitle = styled.div`
  ${tw`flex flex-row justify-between pt-3 text-gray-800 text-subhead_03`}
`;

export const InputContainer = styled.div`
  ${tw`flex items-center gap-3`}
`;

export const NoticeContainer = styled.div`
  ${tw`px-5`}
`;

export const Wrraper = styled.div`
  ${tw`bg-gray-100 rounded-2xl flex flex-col gap-2.5 p-5`}

  span {
    ${tw`text-gray-800 text-subhead_02`}
  }
`;

export const Column = styled.div`
  ${tw`flex flex-col gap-1`}

  p {
    ${tw`text-gray-600 text-body_01`}
  }
`;
