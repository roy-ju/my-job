import React from 'react';

import tw, { styled, css } from 'twin.macro';

const SkeletonContainer = styled.div<{ width?: string; height?: string }>`
  ${tw`rounded`};
  ${tw`animate-pulse`};
  ${tw`bg-gray-300`};
  ${({ width }) =>
    width
      ? css`
          min-width: ${width};
          width: ${width};
        `
      : css`
          min-width: 100%;
          width: 100%;
        `}
  ${({ height }) =>
    height
      ? css`
          min-height: ${height};
          height: ${height};
        `
      : css`
          min-height: 100%;
          height: 100%;
        `}
`;

// Skeleton 컴포넌트 정의
const Skeleton = ({ width, height }: { width?: string; height?: string }) => (
  <SkeletonContainer width={width} height={height} />
);

export default Skeleton;
