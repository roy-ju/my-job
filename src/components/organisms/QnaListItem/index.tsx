import React, { ReactNode, Children } from 'react';
import { Accordion } from '@/components/molecules';

interface QnaListItemProps {
  children: ReactNode;
}

interface QnaListItemUserProps {
  userMessage: string;
  createdTime: string;
  didReply: boolean;
}
interface QnaListItemAdminProps {
  adminMessage: string;
  responseTime: string;
}

function QnaListItemUser({ userMessage, createdTime, didReply }: QnaListItemUserProps) {
  return (
    <div tw="flex justify-between px-5 py-5 w-[23.75rem]">
      <div tw="basis-64">
        <p tw="text-b2 text-left mb-2 break-all">{userMessage}</p>
        <span tw="text-info text-gray-700 text-left block">{createdTime}</span>
      </div>
      <div tw="text-right">
        {didReply ? (
          <span tw="text-b2 text-green-1000">답변 완료</span>
        ) : (
          <span tw="text-b2 text-gray-700">대기중</span>
        )}
      </div>
    </div>
  );
}
function QnaListItemAdmin({ adminMessage, responseTime }: QnaListItemAdminProps) {
  return (
    <div tw="p-5">
      <p tw="text-b2 mb-2 break-all">{adminMessage}</p>
      <span tw="text-info text-gray-700">{`네고시오 운영팀 | ${responseTime}`}</span>
    </div>
  );
}

function QnaListItemMain({ children }: QnaListItemProps) {
  const childrenArray = Children.toArray(children);

  return (
    <Accordion>
      <Accordion.Summary hideArrow>{childrenArray[0]}</Accordion.Summary>
      {childrenArray[1] ? <Accordion.Details>{childrenArray[1]}</Accordion.Details> : null}
    </Accordion>
  );
}

const QnaListItem = Object.assign(QnaListItemMain, {
  User: QnaListItemUser,
  Admin: QnaListItemAdmin,
});

export default QnaListItem;
