import CheckCircleGray20 from '@/assets/icons/check_circle_gray_20.svg';

import ErrorCircleGray20 from '@/assets/icons/error_circle_gray_20.svg';

export default function StatusLabel({
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
    <div tw="w-full flex flex-row items-center gap-1 px-4 h-12 rounded-lg bg-gray-100 text-b2 text-gray-700 mt-3">
      {iconType === 'success' ? <CheckCircleGray20 /> : <ErrorCircleGray20 />}

      <p>{message}</p>
    </div>
  );
}
