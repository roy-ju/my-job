import tw, { styled } from 'twin.macro';

export const PreviewContainer = styled.div`
  ${tw`relative bg-gray-100`}
`;

export const Box = styled.div`
  ${tw`my-5 [border-radius: 12px] [width: calc(100% - 40px)] mx-auto px-5 py-5 bg-white`}
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06), 0px 2px 10px 0px rgba(0, 0, 0, 0.03);
`;

export const Flex = styled.div`
  ${tw`flex items-center w-full [padding-left: 10px] [padding-right: 12px] gap-5 justify-center`}
`;

export const PreviewIconWrraper = styled.div`
  ${tw`flex flex-col items-center justify-center flex-1 text-gray-900 bg-white cursor-pointer text-body_01`}

  gap: 4.8px
`;
