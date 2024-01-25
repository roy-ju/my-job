import { useState } from 'react';

import tw, { styled } from 'twin.macro';

import useInterval from '@/hooks/useInterval';

import Message from './verify-ci-success/Message';

import ImageContents from './verify-ci-success/ImageContents';

import RemainTimesMessage from './verify-ci-success/RemainTimesMessage';

const VerifyCiContainer = styled.div`
  ${tw`relative flex flex-col h-full gap-0.5`}
`;

export default function VerifyCiSuccess() {
  const [remainTime, setRemainTime] = useState(3);

  useInterval(() => setRemainTime((prev) => prev - 1), remainTime === 0 ? null : 1000);

  return (
    <VerifyCiContainer>
      <Message />
      <ImageContents />
      <RemainTimesMessage time={remainTime} />
    </VerifyCiContainer>
  );
}
