import { HTMLProps } from 'react';
import LoadingIcon from '@/assets/icons/loading_dot.svg';
import tw, { styled } from 'twin.macro';
import { keyframes } from '@emotion/react';

const iconSizes = {
  small: tw`w-2 h-2`,
  medium: tw`w-4 h-4`,
};

const gaps = {
  small: tw`gap-2`,
  medium: tw`gap-4`,
};

const opacity = keyframes`
  0% { opacity: 0.2}
  50% { opacity: 0.5}
  100% { opacity: 0.8}
`;

const Conatiner = styled.div`
  & > svg:nth-of-type(1) {
    animation: ${opacity} 0.6s 0.1s infinite alternate linear;
  }
  & > svg:nth-of-type(2) {
    animation: ${opacity} 0.6s 0.2s infinite alternate;
  }
  & > svg:nth-of-type(3) {
    animation: ${opacity} 0.6s 0.3s infinite alternate;
  }
`;

interface LoadingProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  size?: 'small' | 'medium';
}

export default function Loading({ size = 'medium', ...others }: LoadingProps) {
  return (
    <div {...others}>
      <Conatiner css={[tw`flex justify-center gap-4`, gaps[size]]}>
        <LoadingIcon css={[tw`opacity-20`, iconSizes[size]]} />
        <LoadingIcon css={[tw`opacity-20`, iconSizes[size]]} />
        <LoadingIcon css={[tw`opacity-20`, iconSizes[size]]} />
      </Conatiner>
    </div>
  );
}
