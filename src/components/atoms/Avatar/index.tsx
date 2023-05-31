import Image, { StaticImageData } from 'next/image';
import tw from 'twin.macro';

export interface AvatarProps {
  alt?: string;
  src?: string | StaticImageData;
  active?: boolean;
  size?: number;
}

export default function Avatar({ alt = '', src = '', active, size = 56 }: AvatarProps) {
  return (
    <div tw="inline-block relative shrink-0 w-fit h-fit">
      <Image
        alt={alt}
        src={src}
        width={size}
        height={size}
        tw="rounded-full bg-gray-200 object-cover"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      {active !== undefined && (
        <div
          css={[
            tw`absolute bottom-0 right-0 w-4 h-4 border-4 border-white rounded-full`,
            active ? tw`bg-green-700` : tw`bg-gray-700`,
          ]}
        />
      )}
    </div>
  );
}
