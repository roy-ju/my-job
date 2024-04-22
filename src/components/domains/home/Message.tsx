/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
import { useMemo } from 'react';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import Zap from '@/../public/static/images/icon_zap.png';

import Interview from '@/../public/static/images/suggests/Telephone.png';

import formatInterviewTimes from './utils/formatInterviewTimes';

type MessageProps = {
  isEveryTimeAvailable: boolean;
  isQuickInterview: boolean;
  interviewAvaliableTimes: string;
};

const QuickInterviewGuideContainerIfIsQuickInterview = styled.div`
  ${tw`flex flex-row items-center w-full gap-2 p-4 text-gray-900 bg-gray-100 rounded-lg text-subhead_02`}
`;

const QuickInterviewGuideContainer = styled.div`
  ${tw`flex flex-col w-full gap-2 p-4 bg-gray-100 rounded-lg`}

  span {
    ${tw`text-subhead_02`}
  }

  div:nth-of-type(1) {
    ${tw`flex flex-row items-center gap-1.5 text-gray-900`}
  }

  div:nth-of-type(2) {
    ${tw`text-gray-800 whitespace-pre-line text-subhead_01`}
  }
`;

export default function Message({ isEveryTimeAvailable, isQuickInterview, interviewAvaliableTimes }: MessageProps) {
  const convertedAvaliableTimes = useMemo(() => {
    if (!interviewAvaliableTimes) return '-';

    if (interviewAvaliableTimes.includes('인터뷰를 원하지 않아요.')) return '연락가능한 인터뷰시간대를 등록해 주세요!';

    if (interviewAvaliableTimes.includes('인터뷰 시간대 상관 없어요.')) return '순차적으로 연락드릴게요!';

    return formatInterviewTimes(interviewAvaliableTimes);
  }, [interviewAvaliableTimes]);

  return isQuickInterview ? (
    <QuickInterviewGuideContainerIfIsQuickInterview>
      <Image src={Zap.src} width={20} height={20} alt="interview" />
      <span>최대한 빨리 연락드릴게요!</span>
    </QuickInterviewGuideContainerIfIsQuickInterview>
  ) : isEveryTimeAvailable ? (
    <QuickInterviewGuideContainerIfIsQuickInterview>
      <Image src={Interview.src} width={20} height={20} alt="interview" />
      <span>{convertedAvaliableTimes}</span>
    </QuickInterviewGuideContainerIfIsQuickInterview>
  ) : (
    <QuickInterviewGuideContainer>
      <div>
        <Image src={Interview.src} width={20} height={20} alt="interview" />
        <span>선택한 인터뷰 시간</span>
      </div>
      <div>{convertedAvaliableTimes}</div>
    </QuickInterviewGuideContainer>
  );
}
