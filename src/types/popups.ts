export type PopupStateType =
  | ''
  | 'danjiShared'
  | 'needMoreVerificationAddress'
  | 'verificationAddress'
  | 'impossibleRecommendation';

export interface CommonPopupProps {
  handleConfirm: (...args: any) => void;
  handleCancel: (...args: any) => void;
}
