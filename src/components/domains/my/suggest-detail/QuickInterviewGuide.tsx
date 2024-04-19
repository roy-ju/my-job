import { useMemo } from 'react';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import Interview from '@/../public/static/images/suggests/Telephone.png';

type QuickInterviewGuideProps = {
  isQuickInterview: boolean;
  interviewAvaliableTimes: string;
};

const QuickInterviewGuideContainerIfIsQuickInterview = styled.div`
  ${tw`w-full bg-gray-100 flex flex-row gap-1.5 items-center py-4 px-5 [border-radius: 12px] text-subhead_02 my-3 text-gray-900`}
`;

const QuickInterviewGuideContainer = styled.div`
  ${tw`w-full flex flex-col gap-1 bg-gray-100 py-4 px-5 [border-radius: 12px] my-3`}

  span {
    ${tw`text-subhead_02`}
  }

  div:nth-of-type(1) {
    ${tw`text-gray-900 flex flex-row items-center gap-1.5`}
  }

  div:nth-of-type(2) {
    ${tw`text-gray-800 whitespace-pre-line text-body_02`}
  }
`;

export default function QuickInterviewGuide({ isQuickInterview, interviewAvaliableTimes }: QuickInterviewGuideProps) {
  const convertedAvaliableTimes = useMemo(
    () =>
      interviewAvaliableTimes
        ? interviewAvaliableTimes
            .split(',')
            .map((item) => item.replaceAll('에 인터뷰 가능해요.', ''))
            .join(' / ')
        : '-',
    [interviewAvaliableTimes],
  );

  return isQuickInterview ? (
    <QuickInterviewGuideContainerIfIsQuickInterview>
      <Image src={Interview.src} width={20} height={20} alt="interview" />
      <span>빠른 인터뷰 요청했어요!</span>
    </QuickInterviewGuideContainerIfIsQuickInterview>
  ) : (
    <QuickInterviewGuideContainer>
      <div>
        <Image src={Interview.src} width={20} height={20} alt="interview" />
        <span>선택한 인터뷰 가능 시간</span>
      </div>
      <div>{convertedAvaliableTimes}</div>
    </QuickInterviewGuideContainer>
  );
}
