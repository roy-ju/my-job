import React, { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import Image from 'next/image';

import { theme } from 'twin.macro';

import { MarginTopSixteen, MarginTopTwenty } from '@/components/atoms/Margin';

import ButtonV2 from '@/components/atoms/ButtonV2';

import ChipV2 from '@/components/atoms/ChipV2';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import { HomeSuggestInfoResponse } from '@/services/home/types';

import Email from '@/../public/static/images/icon_email.png';

import Hourglass from '@/../public/static/images/icon_hourglass.png';

import Housegarden from '@/../public/static/images/icon_house-garden.png';

import IconArrowRight from '@/assets/icons/icon_arrow_right_12_1.svg';

import Routes from '@/router/routes';

import Message from './Message';

import {
  Title,
  GoListButton,
  ItemWrraper,
  ItemTitle,
  CountText,
  ItemSubTitle,
  InterviewSectionWrraper,
  GuideText,
  Line,
  Container,
} from './widget/SuggestDashobardWidget';

type SuggestDashboardProps = {
  data: HomeSuggestInfoResponse;
};

export default function SuggestDashboard({ data }: SuggestDashboardProps) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const interviewSchduleCountText = useMemo(() => {
    if (data?.interview_schedule_info) {
      return data.interview_schedule_info.interview_schedule_count
        ? `${data.interview_schedule_info?.address || ''} 외 ${data.interview_schedule_info.interview_schedule_count}건`
        : `${data.interview_schedule_info?.address || ''}`;
    }

    return '';
  }, [data?.interview_schedule_info]);

  const handleClickGoList = useCallback(() => {
    if (platform === 'pc') {
      router.push(`/${Routes.My}/${Routes.SuggestRequestedList}`);
      return;
    }

    router.push(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
  }, [platform, router]);

  const handleClickGoSuggestForm = useCallback(() => {
    if (platform === 'pc') {
      router.push({
        pathname: `/${Routes.SuggestForm}`,
        query: {
          entry: Routes.Home,
        },
      });
      return;
    }

    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
      query: {
        entry: Routes.Home,
      },
    });
  }, [handleOpenAppInstallPopup, inAppInfo.isInAppBrowser, platform, router]);

  return (
    <Container>
      <Title>
        나의 집구하기 현황
        <GoListButton onClick={handleClickGoList}>
          구해요 목록
          <IconArrowRight color={theme`colors.gray.600`} />
        </GoListButton>
      </Title>
      <MarginTopTwenty />
      <ItemWrraper>
        <Image src={Email.src} width={20} height={20} alt="e-mail" />
        <ItemTitle>구해요 요청</ItemTitle>
        <CountText>{data.suggest_sent_count}건</CountText>
      </ItemWrraper>
      <ItemWrraper>
        <Image src={Hourglass.src} width={20} height={20} alt="hour-glass" />
        <ItemTitle>추천 대기</ItemTitle>
        <CountText>{data.suggest_waiting_recommended_count}건</CountText>
      </ItemWrraper>
      <ItemWrraper>
        <Image src={Housegarden.src} width={20} height={20} alt="house-garden" />
        <ItemTitle>총 추천 수</ItemTitle>
        <ItemSubTitle>(24시간 / 총 추천)</ItemSubTitle>
        <CountText>
          {data.suggest_new_recommended_count}/{data.suggest_total_recommended_count}건
        </CountText>
      </ItemWrraper>
      {data?.interview_schedule_info && <Line />}
      {data?.interview_schedule_info && <MarginTopSixteen />}
      {data?.interview_schedule_info && (
        <InterviewSectionWrraper>
          <ChipV2 variant="red" size="large">
            인터뷰 예정
          </ChipV2>
          {interviewSchduleCountText}
        </InterviewSectionWrraper>
      )}
      {data?.interview_schedule_info && <MarginTopSixteen />}
      {data?.interview_schedule_info && (
        <Message
          isQuickInterview={data.interview_schedule_info?.is_quick_interview ?? false}
          interviewAvaliableTimes={data.interview_schedule_info?.interview_available_times ?? ''}
        />
      )}
      {data?.interview_schedule_info && <MarginTopSixteen />}
      {data?.interview_schedule_info && <GuideText>오늘 연락드릴게요! (영업시간 종료, 공휴일은 익일)</GuideText>}
      <MarginTopTwenty />
      <ButtonV2 tw="w-full" onClick={handleClickGoSuggestForm}>
        새로운 집 구할래요!
      </ButtonV2>
    </Container>
  );
}
