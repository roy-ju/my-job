import tw, { styled } from 'twin.macro';

export const HistoryTableWrraper = styled.div`
  ${tw`px-5 py-7`}
`;

export const HistoryTableTitle = styled.div`
  ${tw`mb-4 text-subhead_03`}
`;

export const HistoryTableContainer = styled.table`
  ${tw`w-full table-fixed text-b2`}

  th {
    ${tw`text-gray-1000 w-[20%] py-1`}
  }

  td {
    ${tw`py-1 text-start w-[80%]`}
  }

  & > tbody > tr:not(:first-of-type) {
    ${tw`border-t border-gray-300`}
  }
`;

export const StatusCardWrraper = styled.div`
  ${tw`px-5 py-6 bg-gray-100 text-gray-1000`}
`;

export const StatusCardTitle = styled.div`
  ${tw`mb-4 text-subhead_03`}
`;

export const StatusContentsWrraper = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export const StatusContentsText = styled.div`
  ${tw`flex gap-3 text-body_02`}
`;

export const StatusTitle = styled.span`
  ${tw`min-w-[84px]`}
`;

export const SuggestionCardTitle = styled.div`
  ${tw`flex flex-row items-center mb-4 font-bold text-b1`}
`;

export const SuggestionCardTableContainer = styled.table`
  ${tw`w-full table-fixed text-b2`}

  th {
    ${tw`text-gray-1000 w-[20%] py-1`}
  }

  td {
    ${tw`py-1 text-start w-[80%]`}
  }
`;

export const StatusCardContainer = styled.div`
  ${tw`mt-7`}
`;

export const SuggestionCardContainer = styled.div`
  ${tw`relative px-5 py-6 mt-1`}
`;

export const SuggestionCardBorderBottom = styled.div`
  ${tw`absolute left-0 right-0 border-t border-gray-300 mt-7`}
`;

export const ListingDetailPassedItemContainer = styled.div`
  ${tw`px-5 mt-7`}
`;

export const PriceCardWrraper = styled.div`
  ${tw`flex pt-4 justify-evenly`}
`;

export const BorderBottomLine = styled.div`
  ${tw`mx-5 border-l border-gray-300 h-11`}
`;

export const TextCenter = styled.div`
  ${tw`text-center`}
`;

export const PriceCardText = styled.div`
  ${tw`text-gray-700 text-info`}
`;
