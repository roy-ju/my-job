import { ChartData } from '../chartTypes';

export function getDate(d: ChartData[0]) {
  return d?.date ? new Date(d.date).valueOf() : new Date().valueOf();
}

export function getBuyPrice(d: ChartData[0]) {
  return d?.buy_price;
}

export function getJeonsaePrice(d: ChartData[0]) {
  return d?.jeonsae_price;
}

export function getBuyPrices(d: number) {
  return d;
}

export function getJeonsaePrices(d: number) {
  return d;
}

export function getBuyCount(d: ChartData[0]) {
  return d?.buy_count;
}

export function getJeonsaeCount(d: ChartData[0]) {
  return d?.jeonsae_count;
}

export function getDanjiCount(d: ChartData[0]) {
  return d.danji_count;
}

export function getYPriceDomainPrices(d1?: number, d2?: number[] | null) {
  if (!d1) return;
  if (!d2) return d1;

  const d2maxPrices = Math.max(...d2.map((item) => Math.abs(item)));

  const maxPrices = Math.max(d1, d2maxPrices);

  return maxPrices;
}

export function getYPriceDomainMinPrices(d1?: number, d2?: number[] | null) {
  if (!d1) return;
  if (!d2) return d1;

  const d2minPrices = Math.min(...d2.map((item) => Math.abs(item)));

  const minPrices = Math.min(d1, d2minPrices);

  return minPrices;
}

export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function getStartDate(year: number, month: number): Date {
  return new Date(year, month - 1, 1);
}

export function getDanjiPrice(d: ChartData[0]) {
  return d?.danji_price;
}

export function getSigunguPrice(d: ChartData[0]) {
  return d?.sigungu_price;
}

export function getSidoPrice(d: ChartData[0]) {
  return d?.sido_price;
}

export function getSigunguJeonsaeRate(d: ChartData[0]) {
  return d?.sigungu_jeonsae_rate;
}

export function getSidoJeonsaeRate(d: ChartData[0]) {
  return d?.sido_jeonsae_rate;
}
export function getDanjiJeonsaeRate(d: ChartData[0]) {
  return d?.danji_jeonsae_rate;
}

export const lineChartHeight = 160;

export const barChartHeight = 60;

export const totalTradeBarChartHeight = 131;

export const yAxisWidth = 42;

export const paddingRight = 16;

export const paddingLeft = 11;

export const paddingVertical = 9;
