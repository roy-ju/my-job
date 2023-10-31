import { RegionItem as RegionItemType } from '@/components/organisms/RegionList';

type EmptyTextFieldsItem = {
  price: boolean;
  investAmount: boolean;
};

interface BaseFormValue {
  bubjungdong?: Nullable<RegionItemType>;
  realestateType?: number[];
  buyOrRent?: number;
  price?: string;
  monthlyRentFee?: string;
  negotiable?: boolean;
  purpose?: string;
  investAmount?: string;
  moveInDate?: Nullable<Date>;
  moveInDateType?: string;
  minArea?: string;
  maxArea?: string;
  description?: string;
  interviewAvailabletimes?: string[];
  emptyTextFields?: Nullable<Partial<EmptyTextFieldsItem>>;
}

export const FormsInfo = {
  BasicInfo: 'basicInfo',
  Purpose: 'purpose',
  MoveInDate: 'moveInDate',
  Option: 'option',
} as const;

export type Popup = 'bubjungdongChange' | 'buyOrRentChange' | 'isQuit' | 'none';

export type Forms = (typeof FormsInfo)[keyof typeof FormsInfo];

export type FormsValueType = BaseFormValue;

export type State = {
  formData: Nullable<FormsValueType>;
  forms: Forms[];
  popup: Popup;
};

export type Action<K extends keyof FormsValueType = keyof FormsValueType> =
  | { type: 'update_Field'; key: keyof FormsValueType; payLoad: FormsValueType[K] }
  | { type: 'update_Forms'; payLoad: Forms | Forms[] }
  | { type: 'reset' }
  | { type: 'popup'; payLoad: Popup };
