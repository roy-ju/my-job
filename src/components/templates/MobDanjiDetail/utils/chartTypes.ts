export type ChartData = {
  buy_price?: number;
  jeonsae_price?: number;
  buy_count?: number;
  jeonsae_count?: number;
  date: Date;
  buy_prices?: null | number[];
  jeonsae_prices?: null | number[];
  buy_domain_prices?: number;
  jeonsae_domain_prices?: number;

  sigungu_price?: number;
  sigungu_count?: number | null;
  sido_price?: number;
  sido_count?: number | null;
  danji_price?: number;
  danji_count?: number | null;

  sigungu_jeonsae_rate?: number | null;
  sido_jeonsae_rate?: number | null;
  danji_jeonsae_rate?: number | null;
  isManipulate?: boolean;
}[];

export type DataProps = {
  buy_price?: number;
  jeonsae_price?: number;
  buy_count?: number;
  jeonsae_count?: number;
  date: Date;
  buy_prices?: null | number[];
  jeonsae_prices?: null | number[];
};

export type MonthStartDate = {
  date: Date;
};

export type TooltipData = {
  buy_price?: number;
  buy_count?: number;
  jeonsae_price?: number;
  jeonsae_count?: number;
  date?: Date;
};
