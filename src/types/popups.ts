export type PopupStateType =
  | ''
  | 'danjiShared'
  | 'needMoreVerificationAddress'
  | 'verificationAddress'
  | 'impossibleRecommendation';

export interface CommonPopupProps {
  handleCancel?: (...args: any) => void;
  handleConfirm?: (...args: any) => void;
}
