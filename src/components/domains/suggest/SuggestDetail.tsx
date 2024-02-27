import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import { Loading } from '@/components/atoms';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { NavigationHeader } from '@/components/molecules';

import useFetchSuggestDetail from '@/services/suggests/useFetchSuggestDetail';

import useFetchSuggestMyRecommendedList from '@/services/suggests/useFetchSuggestMyRecommendedList';

import { SuggestStatus } from '@/constants/enums';

import Summary from './detail/Summary';

import MyRecommendsList from './detail/MyRecommendsList';

import useInactive from './detail/hooks/useInactive';

import useHandleClickBack from './detail/hooks/useHandleClickBack';

import InValidAccessPopup from './detail/popups/InValidAccessPopup';

import StatusLabel from './detail/StatusLabel';

import useSuggestView from './detail/hooks/useSuggestView';

import Pyoung from '../my/suggest-requested-list/Pyoung';

import PurposeOrMoveInDate from '../my/suggest-detail/PurposeOrMoveInDate';

import AdditionalConditions from '../my/suggest-detail/AdditionalConditions';

import Note from '../my/suggest-detail/Note';
import SuggestDetailCta from './detail/SuggestDetailCta';

const Container = styled.div`
  ${tw`flex flex-col w-full h-full`}
`;

const SummaryInfo = styled.div`
  ${tw`py-6`}
`;

const SummaryDetail = styled.div`
  ${tw`px-5 py-6`}
`;

const DetailWrraper = styled.div`
  ${tw`flex flex-col gap-5 pt-2 pb-10`}
`;

const FlexContents = styled.div`
  ${tw`flex-1 overflow-y-auto`}
`;

type SuggestDetailProps = {
  ipAddress?: string;
};

export default function SuggestDetail({ ipAddress }: SuggestDetailProps) {
  const router = useRouter();

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router.query.suggestID],
  );

  const { data, isLoading, mutate: detailMutate } = useFetchSuggestDetail({ suggestID });

  const { data: myRecommendedList, mutate } = useFetchSuggestMyRecommendedList({ suggestId: suggestID });

  const isExistMySuggested = useMemo(() => !!myRecommendedList?.list?.length, [myRecommendedList?.list?.length]);

  const status = useMemo(() => {
    if (data?.suggest_status === SuggestStatus.Stopped) {
      return 'stopped';
    }

    return '';
  }, [data]);

  const { handleClickBack } = useHandleClickBack();

  const { showInactivePopup, inactivePopupCTA } = useInactive({ suggestDetailData: data });

  useSuggestView({ suggestID: data?.suggest_id, ipAddress, detailMutate });

  const handleMutate = useCallback(() => {
    mutate();
  }, [mutate]);

  if (isLoading || !data) {
    return (
      <div tw="w-full h-full flex flex-col py-20">
        <Loading />
      </div>
    );
  }

  if (showInactivePopup) {
    return <InValidAccessPopup handleConfirm={inactivePopupCTA} />;
  }

  if (data?.error_code) return null;

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>구해요 상세</NavigationHeader.Title>
      </NavigationHeader>

      <FlexContents>
        <SummaryInfo>
          <StatusLabel render={status === 'stopped'} iconType="error" message="추천 요청이 중단된 상태입니다." />
          <Summary data={data} iamRecommending={isExistMySuggested} />
        </SummaryInfo>
        <SeperatorV2 />
        <SummaryDetail>
          <DetailWrraper>
            <Pyoung pyoung={data?.pyoung_text} isNeedTitle />
            <PurposeOrMoveInDate
              buyOrRent={data?.buy_or_rents}
              investAmount={data.invest_amount ?? 0}
              purpose={data?.purpose}
              moveInDate={data?.move_in_date}
              moveInDateType={data?.move_in_date_type}
            />
            <AdditionalConditions
              buyOrRents={data.buy_or_rents}
              danjiOrRegion={data.danji_or_regional}
              realestateTypes={data.realestate_types}
              additionalConditions={data.additional_conditions}
            />
            <Note note={data.note} />
          </DetailWrraper>
        </SummaryDetail>
        {isExistMySuggested && <SeperatorV2 />}
        {isExistMySuggested && <MyRecommendsList onMutate={handleMutate} list={myRecommendedList?.list} />}
      </FlexContents>

      <SuggestDetailCta data={data} />
    </Container>
  );
}
