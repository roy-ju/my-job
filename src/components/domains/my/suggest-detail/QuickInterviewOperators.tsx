import { useCallback } from 'react';

import tw, { styled } from 'twin.macro';

import { KeyedMutator } from 'swr';

import { toast } from 'react-toastify';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { apiService } from '@/services';

import { SuggestDetailResponse } from '@/services/suggests/types';

interface QuickInterviewOperatorsProps {
  suggestID: number;
  isQuickInterview: boolean;
  mutateSuggestDetail: KeyedMutator<(SuggestDetailResponse & ErrorResponse) | null>;
  handleOpenOrCloseSelectInterviewPopup: (v: boolean) => void;
}

const QuickInterviewOperatorsContainer = styled.div`
  ${tw`w-full flex flex-col gap-2 [border-radius: 12px] pt-2`}
`;

export default function QuickInterviewOperators({
  suggestID,
  isQuickInterview,
  mutateSuggestDetail,
  handleOpenOrCloseSelectInterviewPopup,
}: QuickInterviewOperatorsProps) {
  const handleQuickInterview = useCallback(async () => {
    if (isQuickInterview) {
      await apiService.cancelQuickinterview({ suggestID });

      await mutateSuggestDetail();

      toast.success('빠른 인터뷰 요청이 취소되었습니다.');
    } else {
      await apiService.updateQuickinterview({ suggestID });

      await mutateSuggestDetail();

      toast.success('빠른 인터뷰를 요청하였습니다.');
    }
  }, [isQuickInterview, suggestID, mutateSuggestDetail]);

  return (
    <QuickInterviewOperatorsContainer>
      <ButtonV2
        variant="primaryOutline"
        radius="r8"
        tw="w-full"
        disabled={isQuickInterview}
        onClick={() => handleOpenOrCloseSelectInterviewPopup(true)}
      >
        인터뷰 가능 시간 변경
      </ButtonV2>
      <ButtonV2 variant={isQuickInterview ? 'gray' : 'primary'} radius="r8" tw="w-full" onClick={handleQuickInterview}>
        {isQuickInterview ? '빠른 인터뷰 취소' : '빠른 인터뷰 원해요'}
      </ButtonV2>
    </QuickInterviewOperatorsContainer>
  );
}
