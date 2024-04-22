import Image from 'next/image';

import tw from 'twin.macro';

import CheckCircleGray20 from '@/assets/icons/check_circle_gray_20.svg';

import ErrorCircleGray20 from '@/assets/icons/error_circle_gray_20.svg';

import Phone from '@/../public/static/images/icon_phone.png';

export default function StatusLabel({
  render = false,
  iconType,
  message,
}: {
  render?: boolean;
  iconType?: 'error' | 'success' | 'interview';
  message?: string;
}) {
  if (!render) return null;

  return (
    <div
      tw="w-full flex flex-row items-center gap-1 px-4 h-12 rounded-lg text-body_02"
      css={[
        iconType === 'interview'
          ? tw`[background: rgba(255, 226, 228, 0.4)] text-red-600`
          : tw`text-gray-700 bg-gray-100`,
      ]}
    >
      {iconType === 'success' && <CheckCircleGray20 />}
      {iconType === 'error' && <ErrorCircleGray20 />}
      {iconType === 'interview' && <Image src={Phone.src} width={20} height={20} alt="interview" tw="mr-1" />}
      <p>{message}</p>
    </div>
  );
}
