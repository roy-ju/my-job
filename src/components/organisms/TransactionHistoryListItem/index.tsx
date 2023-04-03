export default function TransactionHistoryListItem() {
  return (
    <div tw="flex justify-between py-5 border-b border-gray-300 bg-white">
      <div tw="basis-64">
        <p tw="text-b2 text-left mb-2 break-all">월세 신갈현대아파트 102동</p>
        <span tw="text-info text-gray-700 text-left block">거래참여 2023.03.03 오전 11:11</span>
      </div>
      <div tw="text-right">
        <span tw="text-b2 text-green-1000">참여 중</span>
      </div>
    </div>
  );
}
