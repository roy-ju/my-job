import { memo } from 'react';

import ScrollAnimation from './ScrollAnimation';

type ScrollUpProps = { isRender: boolean };

function ScrollUp({ isRender }: ScrollUpProps) {
  if (!isRender) return null;

  return (
    <div tw="flex flex-row items-center justify-center">
      <ScrollAnimation />
      <p tw="mb-1.5 text-body_02 text-center text-gray-700">수정을 원하시면 위로 스크롤하세요.</p>
      <ScrollAnimation isLeft={false} />
    </div>
  );
}

export default memo(ScrollUp);
