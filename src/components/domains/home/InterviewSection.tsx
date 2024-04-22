import { useMemo } from 'react';

import ChipV2 from '@/components/atoms/ChipV2';

import { MarginTopTwenty, MarginTopSixteen, MarginTopTwelve } from '@/components/atoms/Margin';

import { HomeSuggestInfoResponse } from '@/services/home/types';

import { InterviewSectionWrraper, GuideText, Line } from './widget/SuggestDashobardWidget';

import Message from './Message';

type InterviewSectionProps = { data: HomeSuggestInfoResponse };

export default function InterviewSection({ data }: InterviewSectionProps) {
  const interviewSchduleCountText = useMemo(() => {
    if (data?.interview_schedule_info) {
      return data.interview_schedule_info.interview_schedule_count
        ? `${data.interview_schedule_info?.address || ''} 외 ${data.interview_schedule_info.interview_schedule_count}건`
        : `${data.interview_schedule_info?.address || ''}`;
    }

    return '';
  }, [data?.interview_schedule_info]);

  if (!data?.interview_schedule_info) return null;

  return (
    <>
      <MarginTopTwenty />
      <Line />
      <MarginTopTwenty />
      <InterviewSectionWrraper>
        <ChipV2 variant="red" size="large">
          인터뷰 예정
        </ChipV2>
        {interviewSchduleCountText}
      </InterviewSectionWrraper>
      <MarginTopSixteen />
      <Message
        isEveryTimeAvailable={data.interview_schedule_info?.interview_available_times?.includes(
          '인터뷰 시간대 상관 없어요.',
        )}
        isQuickInterview={data.interview_schedule_info?.is_quick_interview ?? false}
        interviewAvaliableTimes={data.interview_schedule_info?.interview_available_times ?? ''}
      />
      <MarginTopTwelve />
      <GuideText>오늘 연락드릴게요! (영업시간 종료, 공휴일은 익일)</GuideText>
    </>
  );
}
