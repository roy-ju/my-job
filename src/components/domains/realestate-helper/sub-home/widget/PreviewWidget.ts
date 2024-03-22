import tw, { styled } from 'twin.macro';

export const PreviewContainer = styled.div`
  ${tw`relative bg-gray-100`}
`;

export const Box = styled.div`
  ${tw`[margin-block: 22px] [border-radius: 12px] [width: calc(100% - 40px)] mx-auto`}

  padding-left: 18px !important;

  padding-right: 16px;

  padding-top: 22px;

  padding-bottom: 26px;

  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06), 0px 2px 10px 0px rgba(0, 0, 0, 0.03);
`;

export const Flex = styled.div`
  ${tw`flex items-center w-full [padding-left: 10px] [padding-right: 12px] justify-between`}
`;

export const PreviewIconWrraper = styled.div`
  ${tw`flex flex-col items-center justify-center flex-1 text-gray-900`}

  gap: 4.8px
`;
