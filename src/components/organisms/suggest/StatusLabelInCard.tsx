import CheckCircleGray16 from '@/assets/icons/check_circle_gray_16.svg';

export default function StatusLabelInCard({
  render = false,
  iconType,
  message,
}: {
  render?: boolean;
  iconType: 'error' | 'success';
  message: string;
}) {
  if (!render) return null;

  return (
    <div tw="w-full flex flex-row items-center gap-1 px-3 h-10 rounded-lg bg-gray-100 text-body_01 text-gray-700">
      {iconType === 'success' && <CheckCircleGray16 />}
      <p>{message}</p>
    </div>
  );
}
