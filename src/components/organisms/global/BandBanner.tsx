import { useCallback } from 'react';

import { useRouter } from 'next/router';

import ChipV2 from '@/components/atoms/ChipV2';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { UserEventList } from '@/constants/user_events';

import {
  CommonContainer,
  ScrollingContainer,
  ArrowButton,
  Title,
  MainWrraper,
  VirtualDiv,
} from './widget/BandBannerWidget';

type EventBannerProps = {
  scrolling: boolean;
};

export default function BandBanner({ scrolling }: EventBannerProps) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const eventInfo = UserEventList[0];

  const handleRouterNoticeDetail = useCallback(() => {
    if (eventInfo?.mobileLink) {
      router.push(`${eventInfo.mobileLink}`);
    }
  }, [eventInfo, router]);

  const currentDate = new Date();

  // pc에서는 보여주면 안된다.
  if (platform === 'pc') return null;

  // 현재 날짜가 이벤트 종료날짜보다 크면 안보여준다.
  if (eventInfo?.endDate && currentDate.getTime() > eventInfo.endDate.getTime()) return null;

  if (scrolling)
    return (
      <ScrollingContainer onClick={handleRouterNoticeDetail}>
        <MainWrraper>
          {eventInfo?.category && (
            <ChipV2 size="small" variant="red">
              {eventInfo.category}
            </ChipV2>
          )}
          {eventInfo?.title && <Title>{eventInfo?.title}</Title>}
        </MainWrraper>
        {eventInfo?.mobileLink && <ArrowButton />}
      </ScrollingContainer>
    );

  return (
    <>
      <VirtualDiv />
      <CommonContainer onClick={handleRouterNoticeDetail}>
        <MainWrraper>
          {eventInfo?.category && (
            <ChipV2 size="small" variant="red">
              {eventInfo.category}
            </ChipV2>
          )}
          {eventInfo?.title && <Title>{eventInfo?.title}</Title>}
        </MainWrraper>
        {eventInfo?.mobileLink && <ArrowButton />}
      </CommonContainer>
    </>
  );
}
