import { OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

import PcType from './PcType';

import MobileType from './MobileType';

interface EventPopupProps extends CommonPopupProps {
  nDays?: number;

  platform: string;

  /** n일 오늘 하루 그만보기 */
  handleTodayNotShow?: () => {};

  /** n일 동안 그만보기 */
  handleNDaysNotShow?: () => {};
}

export default function EventPopup({
  nDays,
  platform,
  handleConfirm,
  handleCancel,
  handleTodayNotShow,
  handleNDaysNotShow,
}: EventPopupProps) {
  return (
    <OverlayPresenter>
      {platform === 'pc' ? (
        <PcType
          nDays={nDays}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          handleTodayNotShow={handleTodayNotShow}
          handleNDaysNotShow={handleNDaysNotShow}
        />
      ) : (
        <MobileType
          nDays={nDays}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          handleTodayNotShow={handleTodayNotShow}
          handleNDaysNotShow={handleNDaysNotShow}
        />
      )}
    </OverlayPresenter>
  );
}
