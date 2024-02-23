import CheckCircleGray20 from '@/assets/icons/check_circle_gray_20.svg';

export default function CompleteStatusLabel({ render = false }: { render?: boolean }) {
  if (!render) return null;

  return (
    <div tw="w-full my-2 flex flex-row items-center gap-1 px-4 h-12 rounded-lg bg-gray-100 text-b2 text-gray-700">
      <CheckCircleGray20 />
      <p>거래 성사가 완료되었습니다.</p>
    </div>
  );
}
