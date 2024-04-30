import dynamic from 'next/dynamic';

import { Separator } from '@/components/atoms';

import FlexContents from '@/components/atoms/FlexContents';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useListingCreateSummaryHandler from './create-summary/hooks/useListingCreateSummaryHandler';

import ConditionsInfo from './create-summary/CondtionsInfo';

import Guide from './create-summary/Guide';

import { ConditionsWrraper } from './create-summary/widget/CreateSummaryWidget';

import RevisionCta from './create-summary/RevisionCta';

import CreateCta from './create-summary/CreateCta';

const ErrorPopup = dynamic(() => import('./create-summary/popups/ErrorPopup'), { ssr: false });

const SuccessPopup = dynamic(() => import('./create-summary/popups/SuccessPopup'), { ssr: false });

export default function ListingCreateSummary() {
  const {
    params,
    isCreating,
    handleCreate,
    handleUpdate,
    successPopup,
    errorPopup,
    handleConfirmSuccessPopup,
    handleConfirmErrorPopup,
  } = useListingCreateSummaryHandler();

  return (
    <>
      <Container>
        <NavigationHeader>
          <NavigationHeader.Title>매물등록 신청 최종 확인</NavigationHeader.Title>
        </NavigationHeader>
        <FlexContents>
          <Guide />
          <Separator />
          <ConditionsWrraper>
            <ConditionsInfo
              listing={params}
              debtSuccessions={params?.debt_successions}
              collaterals={params?.collaterals}
            />
          </ConditionsWrraper>
          <RevisionCta handleUpdate={handleUpdate} />
        </FlexContents>
        <CreateCta isLoading={isCreating} handleCreate={handleCreate} />
      </Container>
      {successPopup && <SuccessPopup handleConfirm={handleConfirmSuccessPopup} />}
      {errorPopup && <ErrorPopup handleConfirm={handleConfirmErrorPopup} />}
    </>
  );
}
