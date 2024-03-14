import tw, { styled } from 'twin.macro';

export const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 h-full overflow-x-hidden overflow-y-auto`}
`;

export const NodataParagraph = styled.p`
  ${tw`text-gray-600 text-body_03`}
`;

export const ListContainer = styled.div`
  ${tw`flex flex-col gap-5 px-5`}
`;

export const ListItemViewTimeText = styled.span`
  ${tw`text-gray-600 text-body_01`}
`;

export const ListItemTitle = styled.span`
  ${tw`text-gray-900 text-body_03`}
`;

export const ListItemSubTitle = styled.span`
  ${tw`text-gray-700 text-body_02`}
`;
