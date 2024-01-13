import React, { ReactNode } from 'react';
import { Chip, Moment } from '@/components/atoms';
import useControlled from '@/hooks/useControlled';
import tw from 'twin.macro';

interface QnaListItemProps {
  children: ReactNode;
}

interface QnaListItemUserProps {
  userMessage: string;
  createdTime: string;
  didReply: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
}
interface QnaListItemAdminProps {
  adminMessage: string;
  responseTime: string;
  expanded?: boolean;
  defaultExpanded?: boolean;
}

function QnaListItemUser({
  userMessage,
  createdTime,
  didReply,
  expanded: expandedProp,
  defaultExpanded = false,
}: QnaListItemUserProps) {
  const [expanded, setExpanded] = useControlled({ controlled: expandedProp, default: defaultExpanded });

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      type="button"
      tw="hover:bg-gray-100 block text-left px-5 py-5 w-[23.75rem]"
    >
      <Chip variant={didReply ? 'nego' : 'gray'}>{didReply ? '답변완료' : '답변 대기중'}</Chip>
      <div tw="text-b2 my-2 break-all line-clamp-2" css={[expanded && tw`line-clamp-none`]}>
        {userMessage}
      </div>
      <Moment tw="text-info text-gray-700" format="relative">
        {createdTime}
      </Moment>
    </button>
  );
}
function QnaListItemAdmin({
  adminMessage,
  responseTime,
  expanded: expandedProp,
  defaultExpanded = false,
}: QnaListItemAdminProps) {
  const [expanded, setExpanded] = useControlled({ controlled: expandedProp, default: defaultExpanded });
  if (!adminMessage) return null;

  return (
    <button
      onClick={() => {
        setExpanded(!expanded);
      }}
      type="button"
      tw="hover:bg-gray-100 p-5 block text-left w-[23.75rem]"
    >
      <div tw="text-b2 mb-2 break-all line-clamp-2" css={[expanded && tw`line-clamp-none`]}>
        {adminMessage}
      </div>
      <div tw="text-info text-gray-700">
        네고시오 운영팀 |{' '}
        <Moment tw="text-info text-gray-700" format="relative">
          {responseTime}
        </Moment>
      </div>
    </button>
  );
}

function QnaListItemMain({ children }: QnaListItemProps) {
  return <div tw="flex flex-col gap-3">{children}</div>;
}

const QnaListItem = Object.assign(QnaListItemMain, {
  User: QnaListItemUser,
  Admin: QnaListItemAdmin,
});

export default QnaListItem;
