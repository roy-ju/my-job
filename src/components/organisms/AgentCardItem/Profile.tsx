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
          tw="rounded-full object-cover aspect-square"
          src={profileImageFullPath}
          height={56}
          width={56}
          alt={`공인중개사 ${name}의 프로필 사진`}
        />
      </div>
      <div tw="flex flex-col justify-center">
        <strong>{`${officeName} 공인중개사무소`}</strong>
        <p tw="text-mobCaption text-gray-700">{`공인중개사 ${name}`}</p>
      </div>
    </div>
  );
}
