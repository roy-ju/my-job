import { useCallback } from 'react';

import tw, { styled, theme } from 'twin.macro';

import { KeyedMutator } from 'swr';

import { toast } from 'react-toastify';

import { ButtonV2 } from '@/components/atoms';

import { MarginTopEight } from '@/components/atoms/Margin';

import { OverlayPresenter, Popup } from '@/components/molecules';

import interviews from '@/components/domains/suggest/form/constants/interviews';

import CheckBoxButton from '@/components/domains/suggest/form/ui/CheckBoxButton';

import getIncludeValue from '@/components/domains/suggest/utils/getIncludeValue';

import { apiService } from '@/services';

import { SuggestDetailResponse } from '@/services/suggests/types';

import CloseIcon from '@/assets/icons/icon_x_24_2.svg';

import useSelectInterviewPopupHandler from '../hooks/useSelectInterviewPopupHandler';

const CheckBoxWrraper = styled.div`
  ${tw`flex flex-col gap-5 px-5 pt-4 pb-5 text-gray-1000`}
`;

const ButtonWrraper = styled.div`
  ${tw`w-full p-5`}
`;

interface SelectInterviewPopupPcProps {
  suggestID: number;
  interviewAvaliableTimes: string;
  mutateSuggestDetail: KeyedMutator<(SuggestDetailResponse & ErrorResponse) | null>;
  handleOpenOrCloseSelectInterviewPopup: (v: boolean) => void;
}

export default function SelectInterviewPopupPc({
  suggestID,
  interviewAvaliableTimes,
  mutateSuggestDetail,
  handleOpenOrCloseSelectInterviewPopup,
}: SelectInterviewPopupPcProps) {
  const { selectedInterviewAvailabletimes, handleChangeSelectedInterviewAvailabletimes } =
    useSelectInterviewPopupHandler({ interviewAvaliableTimes });

  const handleUpdateAvailableInterviewTimes = useCallback(async () => {
    await apiService.updateInterviewAvailableTimes({
      suggestID,
      interviewAvailableTimes: selectedInterviewAvailabletimes.join(','),
    });

    toast.success('인터뷰 시간이 변경되었습니다.');

    await mutateSuggestDetail();

    handleOpenOrCloseSelectInterviewPopup(false);
  }, [handleOpenOrCloseSelectInterviewPopup, mutateSuggestDetail, selectedInterviewAvailabletimes, suggestID]);

  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="[width: 375px] [border-radius: 20px] p-0 gap-0">
          <MarginTopEight />
          <Popup.Title tw="flex items-center justify-between pl-5 pr-4 [padding-block: 15px]">
            인터뷰 시간 선택
            <CloseIcon
              color={theme`colors.gray.700`}
              tw="cursor-pointer"
              onClick={() => handleOpenOrCloseSelectInterviewPopup(false)}
            />
          </Popup.Title>
          <Popup.Body>
            <CheckBoxWrraper>
              {interviews.slice(0, interviews.length - 1).map((item) => (
                <CheckBoxButton
                  key={item}
                  value={item}
                  label={item}
                  isAnimate={false}
                  selected={getIncludeValue(item, selectedInterviewAvailabletimes)}
                  handleClick={handleChangeSelectedInterviewAvailabletimes}
                />
              ))}
            </CheckBoxWrraper>
            <ButtonWrraper>
              <ButtonV2
                size="bigger"
                tw="w-full"
                onClick={handleUpdateAvailableInterviewTimes}
                disabled={selectedInterviewAvailabletimes.length === 0}
              >
                변경하기
              </ButtonV2>
            </ButtonWrraper>
          </Popup.Body>
        </Popup.ContentGroup>
      </Popup>
    </OverlayPresenter>
  );
}
