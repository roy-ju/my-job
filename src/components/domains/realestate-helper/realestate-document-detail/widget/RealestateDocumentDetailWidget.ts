import tw, { styled } from 'twin.macro';

export const DeleteButton = styled.button`
  ${tw`ml-auto text-gray-800`}
`;

export const AddressContainer = styled.div`
  ${tw`flex flex-col gap-10`}
`;

export const AddressWrraper = styled.div`
  ${tw`p-5 border border-gray-300 rounded-2xl`}
`;

export const Row = styled.div`
  ${tw`flex flex-row gap-1 items-center w-full [background: rgba(255, 226, 228, 0.60)] [padding-block: 13px] px-5 rounded-lg`}

  span {
    ${tw`text-red-800 text-body_02`}
  }
`;

export const InfoTitle = styled.p`
  ${tw`text-gray-900 text-heading_01`}
`;

export const Column = styled.div`
  ${tw`flex flex-col`}
`;

export const TableTitle = styled.p`
  ${tw`text-gray-900 text-subhead_03`}
`;

export const TableSubTitle = styled.span`
  ${tw`ml-1 text-gray-700 text-body_02`}
`;

export const TableSmallTitle = styled.span`
  ${tw`text-gray-700 text-body_01`}
`;

export const TableWrraper = styled.div`
  ${tw`pt-2 pb-2`}
`;

export const CurrentOwnersTableHead = styled.div`
  ${tw`flex items-center gap-2 p-1 bg-gray-200 rounded-lg`}

  div {
    ${tw`text-center text-gray-700 text-body_01`}
  }

  div:nth-of-type(1) {
    ${tw`[width: 32.2%] `}
  }

  div:nth-of-type(2) {
    ${tw`[width: 42.1%]`}
  }

  div:nth-of-type(3) {
    ${tw`[width: 25.7%]`}
  }
`;

export const BetweenRow = styled.div`
  ${tw`flex items-center justify-between`}
`;

export const CurrentOwnersTableBody = styled.div`
  ${tw`flex items-center gap-2 px-1 py-3 bg-white border-b border-gray-200`}

  div {
    ${tw`text-center text-gray-800 whitespace-pre-line text-body_02`}
  }

  div:nth-of-type(1) {
    ${tw`[width: 32.2%] `}
  }

  div:nth-of-type(2) {
    ${tw`[width: 42.1%]`}
  }

  div:nth-of-type(3) {
    ${tw`[width: 25.7%]`}
  }

  :last-child {
    ${tw`pb-0 [border-bottom: none]`}
  }
`;

export const CurrentEtcsTableHead = styled.div`
  ${tw`flex items-center gap-2 p-1 bg-gray-200 rounded-lg`}

  div {
    ${tw`[width: 50%] text-center text-gray-700 text-body_01`}
  }
`;

export const CurrentEtcsTableBody = styled.div`
  ${tw`flex items-center gap-2 px-1 py-3 bg-white border-b border-gray-200`}

  div {
    ${tw`[width: 50%] text-center text-gray-800 whitespace-pre-line text-body_02`}
  }

  :last-child {
    ${tw`pb-0 [border-bottom: none]`}
  }
`;

export const LoansTableHead = styled.div`
  ${tw`flex items-center gap-2 p-1 bg-gray-200 rounded-lg`}

  div {
    ${tw`text-center text-gray-700 text-body_01`}
  }

  div:nth-of-type(1) {
    ${tw`[width: 31.3%] `}
  }

  div:nth-of-type(2) {
    ${tw`[width: 68.7%]`}
  }
`;

export const LoansTableBody = styled.div`
  ${tw`flex items-center gap-2 px-1 py-3 bg-white border-b border-gray-200`}

  div {
    ${tw`text-center text-gray-800 whitespace-pre-line text-body_02`}
  }

  div:nth-of-type(1) {
    ${tw`[width: 31.3%] `}
  }

  div:nth-of-type(2) {
    ${tw`[width: 68.7%]`}
  }

  :last-child {
    ${tw`pb-0 [border-bottom: none]`}
  }
`;

export const AddressTop = styled.div`
  ${tw`flex flex-col gap-0.5`}

  p:nth-of-type(1) {
    ${tw`text-gray-700 text-body_01`}
  }

  p:nth-of-type(1) {
    ${tw`text-gray-800 text-body_03`}
  }
`;

export const CtaWrraper = styled.div`
  ${tw`flex items-center gap-3`}
`;

export const Info = styled.p`
  ${tw`text-gray-700 text-body_01`}
`;

export const StrikeText = styled.span`
  ${tw`text-nego-800`}
`;

export const SmallTitle = styled.div`
  ${tw`text-gray-800 text-subhead_02`}
`;

export const RowCenter = styled.div`
  ${tw`flex items-center justify-between`}
`;

export const RowVerticalCenter = styled.div`
  ${tw`flex items-center gap-1`}
`;

export const RowGapOne = styled.div`
  ${tw`flex gap-1`}
`;

export const ColumnGapOneHalf = styled.div`
  ${tw`flex flex-col gap-0.5`}
`;
