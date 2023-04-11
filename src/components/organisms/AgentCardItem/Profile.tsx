import Image from 'next/image';

interface ProfileProps {
  officeName?: string;
  profileImageFullPath: string;
  name?: string;
}

export default function AgentCardItemProfile({ officeName, profileImageFullPath, name }: ProfileProps) {
  return (
    <div tw="flex">
      <div tw="mr-3 w-14 aspect-square rounded-full">
        <Image
          tw="rounded-full object-cover aspect-square bg-gray-400"
          src={profileImageFullPath}
          height={56}
          width={56}
          alt=""
        />
      </div>
      <div tw="flex flex-col justify-center">
        <strong tw="leading-7">{`${officeName}`}</strong>
        <p tw="text-mobCaption text-gray-700 leading-7">{`공인중개사 ${name}`}</p>
      </div>
    </div>
  );
}
