import { useCallback, useMemo } from 'react';

// import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { NavigationHeader } from '@/components/molecules';

import { MyListingDetailResponse } from '@/services/my/types';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import StatusMessage from './create-result/StatusMessage';

import ConditionsInfo from './create-summary/CondtionsInfo';

import { ConditionsWrraper } from './create-summary/widget/CreateSummaryWidget';

// const UnableToViewPopup = dynamic(() => import('@/components/organisms/popups/UnableToViewPopup'), {
//   ssr: false,
// });

type ListingCreateResultProps = {
  data?: MyListingDetailResponse & ErrorResponse;
};

export default function ListingCreateResult({ data }: ListingCreateResultProps) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const renderBackButton = useMemo(() => {
    if (platform === 'pc' && router.query.back) {
      return true;
    }

    if (platform === 'mobile') {
      return true;
    }

    return false;
  }, [router, platform]);

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      if (router.query.back) {
        router.replace(router.query.back as string);
      }
      return;
    }

    router.back();
  }, [platform, router]);

  if (!data) return null;

  return (
    <Container>
      <NavigationHeader>
        {renderBackButton && <NavigationHeader.BackButton onClick={handleClickBack} />}
        <NavigationHeader.Title>매물등록 신청 결과</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents tw="pb-10">
        <StatusMessage />
        <SeperatorV2 />
        <ConditionsWrraper>
          <ConditionsInfo
            listing={data?.listing}
            debtSuccessions={data?.debt_successions ?? []}
            collaterals={data?.collaterals ?? []}
          />
        </ConditionsWrraper>
      </FlexContents>
    </Container>
  );
}
