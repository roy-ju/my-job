interface Field {
  address: string;
  bubjungdong_code: string;
  buy_or_rents: string;
  deposit: number;
  interview_available_times: string;
  invest_amount: number;
  monthly_rent_fee: number;
  move_in_date: string
  move_in_date_type: number
  negotiable: boolean
  note: string
  purpose: string
  pyoung_from: string
  pyoung_to: string
  realestate_types: string
  trade_price: number
}

export type FormValue= Partial<Field>

export type State = {
  readonly formData: Nullable<FormValue>;
};
