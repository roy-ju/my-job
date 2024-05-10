export default function TodayNotShowButton({ handleTodayNotShow }: { handleTodayNotShow?: () => void }) {
  return (
    <div tw="w-full flex justify-center mt-4">
      <button type="button" tw="text-body_02 text-white mx-auto" onClick={handleTodayNotShow}>
        오늘 하루 그만 보기
      </button>
    </div>
  );
}
