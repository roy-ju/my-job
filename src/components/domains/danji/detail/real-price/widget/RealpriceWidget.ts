import tw, { styled } from 'twin.macro';

export const ListContainer = styled.div`
  ${tw`px-5 pb-10 mt-5`}
`;

export const FullWidth = styled.div`
  ${tw`w-full`}
`;

export const ListWrraper = styled.div`
  ${tw`flex [border-bottom: 1px solid #E9ECEF] [border-top: 1px solid #E9ECEF]`}
`;

export const ListTitle = styled.div`
  ${tw`w-full py-2 text-gray-700 text-body_02`}
`;

export const ListTableBodyWrraperWithIcon = styled.div`
  ${tw`flex flex-row items-center justify-end w-full text-right`}
`;

export const ListTableBodyWrraper = styled.div`
  ${tw`flex flex-row w-full`}
`;

export const ListTableBodyTitle = styled.span`
  ${tw`text-body_02`}
`;

export const LabelText = styled.div`
  ${tw`[display: inline] [min-width: 27px] [max-width: 27px] h-4 text-white py-0.5 px-1 bg-gray-700 [font-size: 11px] [line-height: 12px] font-bold rounded-2xl mr-1 whitespace-nowrap`}
`;
