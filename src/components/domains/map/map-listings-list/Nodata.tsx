import ExclamationIcon from '@/assets/icons/exclamation_mark.svg';

export default function Nodata() {
  return (
    <div tw="py-12">
      <div tw="flex justify-center">
        <ExclamationIcon />
      </div>
      <div tw="mt-4 text-center text-gray-700 text-info">
        조건에 맞는 매물이 없습니다.
        <br />
        지도를 이동하거나 필터를 변경해보세요.
      </div>
    </div>
  );
}
