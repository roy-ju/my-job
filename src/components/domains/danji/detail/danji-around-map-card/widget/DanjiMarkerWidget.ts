import tw, { styled } from 'twin.macro';

export const iconStyle = {
  width: '28px',
  height: '34px',
};

export const Stack = styled.div``;

export const DuplicatedCountStack = styled.div`
  ${tw`items-center justify-center w-full h-full relative [min-height: 3.6rem] [padding-top: 0.4rem] [padding-bottom: 0.2rem] [z-index: 1000]`}
`;

export const SingleCountStack = styled.div`
  ${tw`items-center justify-center w-full h-full relative [z-index: 600]`}
`;

export const StyledCircle = styled.div`
  ${tw`absolute [right: -8px] [top: -4px] w-5 h-5 [background: #1C222B] border-none [border-radius: 50%] [line-height: 1] flex flex-row items-center justify-center`}
`;

export const StyledTypography = styled.p`
  ${tw`text-white text-info font-bold [line-height: 1] text-center`}
`;
