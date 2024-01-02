import ExclamationMark from '@/assets/icons/exclamation_mark_outlined.svg';

export default function RealPriceChartNodata() {
  return (
    <div tw="flex flex-row items-center justify-center gap-1 bg-gray-200 py-6 [border-radius: 8px]">
      <ExclamationMark />
      <span tw="text-gray-600">실거래 기록이 없습니다.</span>
    </div>
  );
}
