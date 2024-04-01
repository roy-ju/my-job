import tw, { styled } from 'twin.macro';

export const Contents = styled.div`
  ${tw`flex flex-col flex-1 p-5`}

  div:nth-of-type(1) {
    ${tw`font-bold text-h2`}
  }

  div:nth-of-type(2) {
    ${tw`text-info text-gray-700 mt-1.5`}
  }

  div:nth-of-type(4) {
    ${tw`flex justify-center`}
  }
`;
