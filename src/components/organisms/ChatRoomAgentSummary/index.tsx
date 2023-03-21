import { Avatar } from '@/components/atoms';

interface Props {
  officeName: string;
  agentName: string;
  agentDescription: string;
  agentProfileImagePath: string;
}

export default function ChatRoomAgentSummary({
  officeName,
  agentName,
  agentDescription,
  agentProfileImagePath,
}: Props) {
  return (
    <div tw="flex flex-col items-center">
      <Avatar src={agentProfileImagePath} />
      <p tw="text-info leading-3.5 text-gray-700 mt-2.5 mb-2">{officeName}</p>
      <p tw="text-b1 font-bold leading-5 mb-1.5">공인중개사 {agentName}</p>
      <p tw="text-info text-gray-700 text-center">{agentDescription}</p>
    </div>
  );
}
