import tw from 'twin.macro';

const colors = {
  제안중: tw`bg-green-600`,
  협의중: tw`bg-nego-600`,
  '가계약금 입금': tw`bg-gray-1000`,
  '체결 매물': tw`bg-nego-800`,
  '등록 취소': tw`bg-gray-700`,
  '제안 취소': tw`bg-red-800`,
};

export default function ListingStatusChip({ status }: { status: string }) {
  if (
    status !== '제안중' &&
    status !== '협의중' &&
    status !== '가계약금 입금' &&
    status !== '체결 매물' &&
    status !== '등록 취소' &&
    status !== '제안 취소'
  )
    return null;

  return (
    <div
      tw="absolute top-0 left-0 rounded-tl-lg rounded-br px-1.5 text-info font-semibold text-white"
      css={colors?.[status]}
    >
      {status}
    </div>
  );
}
