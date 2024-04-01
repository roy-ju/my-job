import tw, { styled } from 'twin.macro';

export const RegisteredHomeListWrraper = styled.div`
  ${tw`flex flex-col flex-1 px-5 pb-10 overflow-y-auto`}
`;

export const RegisteredHomesTitle = styled.p`
  ${tw`px-5 font-bold text-b1`}
`;

export const ListItemContainer = styled.div`
  ${tw`flex items-center w-full gap-2 py-3 bg-white hover:bg-gray-100`}

  div > p:nth-of-type(1) {
    ${tw`font-bold text-b1`}
  }

  div > p:nth-of-type(2) {
    ${tw`text-info [line-height: 14px] text-gray-700`}
  }
`;
export const ListItemBorderWrraper = styled.div`
  ${tw`border-b border-b-gray-300`}
`;

export const NotVerifedWrraper = styled.div`
  ${tw`flex items-center gap-1 text-info [line-height: 14px] mt-1`}

  span {
    ${tw`text-red-800`}
  }

  button {
    ${tw`text-gray-600 [text-decoration-line: underline] hover:text-gray-1000`}
  }
`;
