import { Button } from '@/components/atoms';
import Image from 'next/image';
import ChatBubbleIcon from '@/assets/icons/chat_bubble.svg';

interface ProfileProps {
  officeName?: string;
  profileImageFullPath: string;
  name?: string;
  onNavigateToChatRoom?: () => void;
}

export default function AgentCardItemProfile({
  officeName,
  profileImageFullPath,
  name,
  onNavigateToChatRoom,
}: ProfileProps) {
  return (
    <div tw="flex">
      <div tw="mr-3 w-11 h-11 rounded-full">
        <Image
          tw="rounded-full w-11 h-11 object-cover aspect-square bg-gray-400"
          src={profileImageFullPath}
          height={56}
          width={56}
          alt=""
        />
      </div>
      <div tw="flex flex-col justify-center">
        <strong tw="text-b1">{`${officeName}`}</strong>
        <p tw="text-info text-gray-700">{`공인중개사 ${name}`}</p>
      </div>
      {onNavigateToChatRoom && (
        <Button
          size="none"
          variant="ghost"
          tw="ml-auto w-11 h-11 bg-nego-100 hover:bg-nego-200"
          onClick={onNavigateToChatRoom}
        >
          <ChatBubbleIcon tw="text-nego-700 w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
