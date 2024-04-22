/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
import { useCallback } from 'react';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import Zap from '@/../public/static/images/icon_zap.png';

import Phone from '@/../public/static/images/icon_phone.png';

import { v4 } from 'uuid';

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
`;

export default function Message({ isEveryTimeAvailable, isQuickInterview, interviewAvaliableTimes }: MessageProps) {
  const convertedAvaliableTimes = useCallback(() => {
    if (!interviewAvaliableTimes) return <div tw="text-subhead_01 text-gray-800">-</div>;

    if (interviewAvaliableTimes.includes('인터뷰를 원하지 않아요.'))
      return <div tw="text-subhead_01 text-gray-800">연락가능한 인터뷰시간대를 등록해 주세요!</div>;

    const array = formatInterviewTimes(interviewAvaliableTimes).split('/');

    if (array.length === 1)
      return <div tw="text-subhead_01 text-gray-800">{formatInterviewTimes(interviewAvaliableTimes)}</div>;

    const newArray = [];

    for (let i = 0; i < array.length; i++) {
      newArray.push(array[i]);
      if (i < array.length - 1) {
        newArray.push('/');
      }
    }

    return (
      <div tw="flex flex-row flex-wrap gap-1 text-gray-800">
        {newArray.map((item) => (
          <div key={v4()} tw="text-subhead_01">
            {item}
          </div>
        ))}
      </div>
    );
  }, [interviewAvaliableTimes]);

  return isQuickInterview ? (
    <QuickInterviewGuideContainerIfIsQuickInterview>
      <Image src={Zap.src} width={20} height={20} alt="interview" />
      <span>최대한 빨리 연락드릴게요!</span>
    </QuickInterviewGuideContainerIfIsQuickInterview>
  ) : isEveryTimeAvailable ? (
    <QuickInterviewGuideContainerIfIsQuickInterview>
      <Image src={Phone.src} width={20} height={20} alt="interview" />
      <span>순차적으로 연락드릴게요!</span>
    </QuickInterviewGuideContainerIfIsQuickInterview>
  ) : (
    <QuickInterviewGuideContainer>
      <div tw="flex flex-row items-center gap-2 text-gray-900">
        <Image src={Phone.src} width={20} height={20} alt="interview" />
        <span>선택한 인터뷰 시간</span>
      </div>
      {convertedAvaliableTimes()}
    </QuickInterviewGuideContainer>
  );
}
