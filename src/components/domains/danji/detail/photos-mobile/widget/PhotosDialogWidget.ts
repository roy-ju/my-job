import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`w-full min-h-[100vh] overflow-y-hidden [z-index: 100] bg-white`}
`;

export const DialogHeaderWrraper = styled.div`
  ${tw`w-[100%] fixed top-0 left-auto right-auto [z-index: 50] bg-white`}
`;

export const DialogHeaderContentsWrraper = styled.div`
  ${tw`flex items-center justify-between px-5 py-4`}
`;

export const Title = styled.span`
  ${tw`text-subhead_03 [line-height: 1]`}

  span {
    ${tw`text-nego-1000`}
  }
`;

export const DialogBodyWrraper = styled.div`
  ${tw`w-full fixed h-[calc(100vh - 56px)] overflow-y-auto left-auto right-auto [z-index: 1000] mt-[56px] pb-[7rem] bg-black`}
`;

export const DialogBodyContentsWrraper = styled.div`
  ${tw`grid [grid-template-columns: repeat(3,1fr)] [grid-gap: 0px]`}
`;

export const ImageWrraper = styled.div`
  ${tw`w-full [height: 125px]`}
`;

export const Image = styled.img`
  ${tw`object-cover w-full h-full`}
`;
