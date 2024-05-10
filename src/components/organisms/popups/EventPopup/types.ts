import { CommonPopupProps } from '@/types/popups';

export interface EventPopupProps extends CommonPopupProps {
  nDays?: number;
  /** n일 오늘 하루 그만보기 */
  handleTodayNotShow?: () => {};
  /** n일 동안 그만보기 */
  handleNDaysNotShow?: () => {};
}
