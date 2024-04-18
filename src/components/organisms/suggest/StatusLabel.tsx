import CheckCircleGray20 from '@/assets/icons/check_circle_gray_20.svg';

import ErrorCircleGray20 from '@/assets/icons/error_circle_gray_20.svg';

export default function StatusLabel({
  render = false,
  isInterviewLabel = false,
  iconType,
  message,
}: {
  render?: boolean;
  isInterviewLabel?: boolean;
  iconType?: 'error' | 'success';
  message?: string;
}) {
  if (!render) return null;

  if (isInterviewLabel)
    return (
      <div tw="w-full flex flex-row items-center gap-1 px-4 h-12 rounded-lg bg-yellow-100 text-body_02 text-gray-900">
        <p>인터뷰 진행 전입니다.</p>
      </div>
    );

  return (
    <div tw="w-full flex flex-row items-center gap-1 px-4 h-12 rounded-lg bg-gray-100 text-body_02 text-gray-700">
      {iconType === 'success' ? <CheckCircleGray20 /> : <ErrorCircleGray20 />}
      <p>{message}</p>
    </div>
  );
}
