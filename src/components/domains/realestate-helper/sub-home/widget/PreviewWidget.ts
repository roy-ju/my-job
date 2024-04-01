import tw, { styled } from 'twin.macro';

export const PreviewContainer = styled.div`
  ${tw`relative bg-gray-100`}
`;

export const Box = styled.div`
  ${tw`my-5 rounded-2xl [width: calc(100% - 40px)] mx-auto px-5 py-5 bg-white`}
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06), 0px 2px 10px 0px rgba(0, 0, 0, 0.03);
`;

export const Flex = styled.div`
  ${tw`flex items-center w-full [padding-left: 10px] [padding-right: 12px] gap-5 justify-center`}
`;

export const PreviewIconWrraper = styled.div`
  ${tw`flex flex-col items-center justify-center gap-1 text-gray-900 bg-white cursor-pointer text-body_01 w-14`}
`;

export const PreviewButton = styled.button`
  ${tw`text-subhead_02 flex gap-2 items-center text-left pl-3 py-4 [padding-right: 18px] border [border-radius: 12px] [min-width: 141.5px] flex-1`}
`;
