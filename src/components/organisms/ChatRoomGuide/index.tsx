export default function ChatRoomGuide() {
  return (
    <div tw="py-10 px-5 bg-white">
      <div tw="text-b1 leading-none text-gray-1000 font-bold mb-6">중개사 채팅은 이렇게 쓰여요</div>
      <div tw="flex mb-6 items-center">
        <div tw="mr-3 w-10 h-10 rounded-lg bg-gray-200" />
        <div tw="flex flex-col">
          <div tw="text-info text-gray-700 leading-3.5 mb-1">집을 구할 때</div>
          <div tw="text-b2 text-gray-1000 font-bold leading-4">상세주소 공개, 방문예약 및 매물문의</div>
        </div>
      </div>
      <div tw="flex mb-6 items-center">
        <div tw="mr-3 w-10 h-10 rounded-lg bg-gray-200" />
        <div tw="flex flex-col">
          <div tw="text-info text-gray-700 leading-3.5 mb-1">집을 내놓을 때</div>
          <div tw="text-b2 text-gray-1000 font-bold leading-4">매물 등록 및 관리</div>
        </div>
      </div>
      <div tw="flex mb-6 items-center">
        <div tw="mr-3 w-10 h-10 rounded-lg bg-gray-200" />
        <div tw="flex flex-col">
          <div tw="text-info text-gray-700 leading-3.5 mb-1">집을 구할 때</div>
          <div tw="text-b2 text-gray-1000 font-bold leading-4">상세 계약조건 협의</div>
        </div>
      </div>
    </div>
  );
}
