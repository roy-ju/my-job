export default function NdaysNotShowButton({
  nDays,
  handleNDaysNotShow,
}: {
  nDays: number;
  handleNDaysNotShow?: () => void;
}) {
  return (
    <div tw="w-full flex justify-center mt-4">
      <button type="button" tw="text-body_02 text-white mx-auto" onClick={handleNDaysNotShow}>
        {nDays}일 동안 보지 않기
      </button>
    </div>
  );
}
