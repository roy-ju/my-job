import { ScaleLinear, ScaleTime } from 'd3';

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

export type AxisBottomProps = {
  width: number;
  yAxisWidth?: number;
  paddingLeft: number;
  xScale: ScaleTime<number, number, never>;
  selectedYear: number;
  xAxis: MonthStartDate[];
};

export type BarChartProps = {
  barChartHeight: number;

  data: ChartData;
  buyOrRent?: number;

  renderNodata: boolean;

  width: number;
  yAxisWidth: number;

  xScale: ScaleTime<number, number, never>;
  yScaleCount: ScaleLinear<number, number, never>;

  tooltipLeft?: number;
  tooltipData?: DataProps;
  handleTooltip: (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => void;
};

export type LineChartProps = {
  lineChartHeight: number;

  data: ChartData;
  buyOrRent?: number;

  width: number;
  yAxisWidth: number;

  xScale: ScaleTime<number, number, never>;
  yScalePrice: ScaleLinear<number, number, never>;

  tickValues: number[];

  tooltipTop: number;
  tooltipLeft?: number;
  tooltipData?: DataProps;
  handleTooltip: (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => void;
};

export type TotalTradeChartProps = {
  width?: number;
  xAxis: MonthStartDate[];
  danjiChartData: ChartData;
  selectedYear: number;
};

export type TransactionJeonsaePerAreaChartProps = {
  width?: number;
  xAxis: MonthStartDate[];
  danjiChartData: ChartData;
  sigunguChartData: ChartData;
  sidoChartData: ChartData;
  selectedYear: number;
};

export type TransactionPerAreaChartProps = {
  width?: number;
  xAxis: MonthStartDate[];
  danjiChartData: ChartData;
  sigunguChartData: ChartData;
  sidoChartData: ChartData;
  selectedYear: number;
};

export type TooltipProps = {
  width: number;
  left?: number;
  top?: number;
  data?: TooltipData;
  buy: boolean;
  jeonsae: boolean;
};
