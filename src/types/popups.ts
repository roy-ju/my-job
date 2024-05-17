export type PopupStateType =
  | ''
  | 'danjiShared'
  | 'needMoreVerificationAddress'
  | 'verificationAddress'
  | 'impossibleRecommendation';

export interface CommonPopupProps {
  message?: string;
  handleCancel?: (...args: any) => void;
  handleConfirm?: (...args: any) => void;
}
