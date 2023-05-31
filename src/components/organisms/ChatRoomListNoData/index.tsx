export default function ChatRoomListNoData() {
  return (
    <div tw="flex flex-col items-center justify-center">
      <div tw="text-h2 leading-none text-gray-1000 font-bold text-center mb-4">
        중개사 채팅을
        <br />
        진행중인 매물이 없습니다.
      </div>
      <div tw="text-info text-gray-700 mb-5">매물별로 담당 중개사와 채팅을 할 수 있습니다.</div>
    </div>
  );
}
