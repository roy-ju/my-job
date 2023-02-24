export default function RegionMarker() {
  return (
    <div tw="flex flex-col relative w-fit min-w-[88px]">
      <div tw="flex-1 flex items-center justify-center bg-blue rounded-t-lg">
        <p tw="text-b2 font-bold text-white">논현2동</p>
      </div>
      <div tw="flex-1 flex items-center justify-center bg-white rounded-b-lg">
        <p tw="text-info">단지</p>
        <p tw="text-info">0</p>
        <p tw="text-info">매물</p>
        <p tw="text-info">0</p>
      </div>
    </div>
  );
}
