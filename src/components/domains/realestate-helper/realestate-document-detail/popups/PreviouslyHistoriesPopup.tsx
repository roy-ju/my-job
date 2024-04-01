import moment from 'moment';

import { Popup, OverlayPresenter } from '@/components/molecules';

import { SubHomeRealestatedocumentDetailResponse } from '@/services/sub-home/types';

import { CommonPopupProps } from '@/types/popups';

interface PreviouslyHistoriesPopupProps extends CommonPopupProps {
  list: SubHomeRealestatedocumentDetailResponse['previous_history_list'];
}

export default function PreviouslyHistoriesPopup({ list, handleConfirm }: PreviouslyHistoriesPopupProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.SmallTitle tw="text-center">이전 조회 이력</Popup.SmallTitle>
          <Popup.Body>
            <div tw="flex flex-col items-center">
              최대 10개까지 조회됩니다.
              <br />
              <br />
              {list?.map((item) => (
                <span key={item.created_time}>{`- ${moment(item.created_time).format('YYYY년 MM월 DD일')}조회`}</span>
              ))}
            </div>
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
