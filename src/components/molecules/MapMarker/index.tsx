import type { ReactNode } from 'react';
import tw from 'twin.macro';

type Props = {
  children?: ReactNode;
};

export default function MapMarker({ children }: Props) {
  return (
    <div tw="relative w-fit">
      <div tw="absolute w-full h-full shadow-lg rounded-[12px]" />
      <div tw="z-[-1] absolute top-0 left-0 w-[calc(100% - 21px)] h-full bg-white rounded-tl-[12px] rounded-bl-[12px] rounded-tr-[4px]" />
      <div tw="z-[-1] absolute bottom-0 right-[1px] w-[22px] h-[33px] bg-white rounded-br-[12px] rounded-tr-[4px]" />
      <div
        css={[
          tw`z-[-1] absolute w-[30px] h-[24px] bg-transparent top-[-9px] right-[-9px] rounded-[12px]`,
          {
            boxShadow: '-13px 13px 0px 0px white',
          },
        ]}
      />
      <div
        css={[
          tw`z-[-2] absolute flex items-center justify-center w-[24px] h-[20px] bg-[#F83D3D] top-[-7px] right-[-5px] rounded-[12px]`,
          {
            fontSize: '12px',
            fontWeight: 700,
            color: 'white',
            boxShadow: '-4px 4px 10px 0px rgba(0, 0, 0, 0.2)',
          },
        ]}
      >
        99
      </div>
      <div tw="flex flex-col justify-center items-center px-[18px] h-[48px]">
        {children}
      </div>
    </div>
  );
}
