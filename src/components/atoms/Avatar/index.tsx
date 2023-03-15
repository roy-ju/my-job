import Image, { StaticImageData } from 'next/image';
import tw from 'twin.macro';

interface AvatarProps {
  alt: string;
  src: string | StaticImageData;
  active?: boolean;
}

export default function Avatar({ alt, src, active }: AvatarProps) {
  return (
    <div tw="inline-block relative shrink-0 w-fit h-fit">
      <Image alt={alt} src={src} width={56} height={56} tw="w-14 h-14 rounded-full bg-gray-200 object-cover" />
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
