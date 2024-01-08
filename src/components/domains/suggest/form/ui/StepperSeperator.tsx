import tw, { styled } from 'twin.macro';

const selectedStyles = {
  prev: tw`bg-nego-800`,
  current: tw`bg-nego-800 text-nego-800`,
  next: tw`bg-nego-300`,
  another: tw`bg-gray-400`,
};

const defaultStyle = tw`[height: 1px] [width: 16px] mx-0.5`;

const StepperSeperator = styled.div<{ step: 'prev' | 'current' | 'next' | 'another' }>`
  ${defaultStyle}
  ${({ step }) => step && selectedStyles[step]}
`;

export default StepperSeperator;
