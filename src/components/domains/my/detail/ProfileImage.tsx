import { useId } from 'react';

import Image, { StaticImageData } from 'next/image';

import Camera from '@/assets/icons/camera.svg';

import { toast } from 'react-toastify';

interface ProfileImageProps {
  profileImageUrl: string | StaticImageData;
  onClickUpdate?: (file: File) => void;
}

export default function ProfileImage({ profileImageUrl, onClickUpdate }: ProfileImageProps) {
  const id = useId();

  return (
    <div tw="px-5 py-5 relative">
      {profileImageUrl && (
        <Image
          src={profileImageUrl}
          alt="프로필 사진"
          width={100}
          height={100}
          tw="mx-auto rounded [object-fit: cover] w-[100px] h-[100px] object-cover [border-radius: 50%]"
        />
      )}

      <label htmlFor={`${id}-file`} tw="absolute  px-4 h-[3rem] text-b2 leading-4 cursor-pointer [top: 88px] left-1/2">
        <Camera />

        <input
          type="file"
          name="file"
          id={`${id}-file`}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (!e.target.files) return;

            const selectedFile = e.target.files?.[0];

            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/jfif'];
            if (!allowedTypes.includes(selectedFile?.type)) {
              toast.error('png, jpg, jpeg, jfif 확장자만 업로드 가능합니다.');
              return;
            }

            onClickUpdate?.(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
}
