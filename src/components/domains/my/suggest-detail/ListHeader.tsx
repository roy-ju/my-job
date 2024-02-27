export default function ListHeader({ count }: { count: number }) {
  return (
    <div tw="mt-4 text-gray-1000 text-subhead_03 self-start gap-1 flex items-center">
      <span>추천 현황</span>
      <span tw="text-nego-800">{count}</span>
    </div>
  );
}
