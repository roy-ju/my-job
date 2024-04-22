import tw, { styled } from 'twin.macro';

import { KeyedMutator } from 'swr';

import { SuggestDetailResponse } from '@/services/suggests/types';

import QuickInterviewGuide from './QuickInterviewGuide';

import QuickInterviewOperators from './QuickInterviewOperators';

const Container = styled.div``;

const Title = styled.span`
  ${tw`block text-heading_01`}
`;

const Ul = styled.ul`
  ${tw`my-3 text-gray-700 text-info`}

  li > span {
    ${tw`text-nego-800`}
  }
`;

interface NotyetInterviewProps {
  suggestID: number;
  isQuickInterview: boolean;
  interviewAvaliableTimes: string;
  mutateSuggestDetail: KeyedMutator<(SuggestDetailResponse & ErrorResponse) | null>;
  handleOpenOrCloseSelectInterviewPopup: (v: boolean) => void;
}

export default function NotyetInterview({
  isQuickInterview,
  interviewAvaliableTimes,
  suggestID,
  mutateSuggestDetail,
  handleOpenOrCloseSelectInterviewPopup,
}: NotyetInterviewProps) {
  return (
    <Container>
      <div tw="[height: 36px] flex items-center mt-2">
        <Title>인터뷰 진행 전이에요!</Title>
      </div>
      <Ul tw="[height: 68px]">
        <li>- 인터뷰 미진행 시, 집을 추천받을 수 없습니다.</li>
        <li>- 인터뷰는 주말, 공휴일을 제외한 영업일에 순차적으로 진행됩니다.</li>
        <li>
          - 인터뷰 순위를 높이고 싶다면, <span>빠른 인터뷰 원해요</span>를 선택해주세요.
        </li>
      </Ul>
      <QuickInterviewGuide isQuickInterview={isQuickInterview} interviewAvaliableTimes={interviewAvaliableTimes} />
      <QuickInterviewOperators
        suggestID={suggestID}
        isQuickInterview={isQuickInterview}
        handleOpenOrCloseSelectInterviewPopup={handleOpenOrCloseSelectInterviewPopup}
        mutateSuggestDetail={mutateSuggestDetail}
      />
    </Container>
  );
}
