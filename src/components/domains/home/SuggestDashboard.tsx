import React, { useCallback } from 'react';

import { useRouter } from 'next/router';

import Image from 'next/image';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import ButtonV2 from '@/components/atoms/ButtonV2';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import { HomeSuggestInfoResponse } from '@/services/home/types';

import Email from '@/../public/static/images/icon_email.png';

import Hourglass from '@/../public/static/images/icon_hourglass.png';

import Housegarden from '@/../public/static/images/icon_house-garden.png';

import Routes from '@/router/routes';

import TextButton from '@/components/atoms/TextButton';

import { Title, ItemWrraper, ItemTitle, CountText, ItemSubTitle, Container } from './widget/SuggestDashobardWidget';

import InterviewSection from './InterviewSection';

type SuggestDashboardProps = {
  data: HomeSuggestInfoResponse;
};

export default function SuggestDashboard({ data }: SuggestDashboardProps) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

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
        <TextButton variant="right" title="구해요 목록" size="small" color="gray600" onClick={handleClickGoList} />
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
      <InterviewSection data={data} />
      <MarginTopTwenty />
      <ButtonV2 tw="w-full" onClick={handleClickGoSuggestForm}>
        새로운 집 구할래요!
      </ButtonV2>
    </Container>
  );
}
