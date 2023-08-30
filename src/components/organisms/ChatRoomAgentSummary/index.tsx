import { Avatar } from '@/components/atoms';
import { StaticImageData } from 'next/image';

interface Props {
  agentName: string;
  agentProfileImagePath: string | StaticImageData;
}

export default function ChatRoomAgentSummary({ agentName, agentProfileImagePath }: Props) {
  return (
    <div tw="flex flex-col items-center">
      <Avatar src={agentProfileImagePath} />
      <p tw="text-b1 font-bold leading-5 mt-2.5 mb-2">공인중개사 {agentName}</p>
    </div>
  );
}
