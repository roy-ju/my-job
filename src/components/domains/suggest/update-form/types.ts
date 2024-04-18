import SuggestForm, { BubjungdongType } from '../form/types';

interface UpdateSuggestForm extends Omit<SuggestForm, 'address' | 'bubjungdong'> {
  /** 지역 구해요의 address */
  address: string;
  /** 지역 구해요의 법정동 ID */
  bubjungdong: BubjungdongType | null;
}

export default UpdateSuggestForm;
