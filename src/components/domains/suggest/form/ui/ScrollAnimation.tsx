import { memo } from 'react';

import animationData from '@/assets/icons/json/scroll.json';

import Lottie from 'react-lottie';

type ScrollAnimationProps = {
  width?: number;
  height?: number;
  isLeft?: boolean;
};

function ScrollAnimation({ width = 26, height = 26, isLeft = true }: ScrollAnimationProps) {
  return (
    <Lottie
      width={width}
      height={height}
      options={{
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      style={isLeft ? { marginLeft: '-34px', marginRight: '8px' } : { marginRight: '-34px', marginLeft: '8px' }}
    />
  );
}

export default memo(ScrollAnimation);
