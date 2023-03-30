import React, { ReactNode, Children, useMemo, useContext } from 'react';
import { Accordion } from '@/components/molecules';
import ServiceContactListItemContext from './ServiceContactListItemContext';

interface ServiceContactListItemProps {
  contents: string;
  createdTime: string;
  didReply: boolean;
  children: ReactNode;
}

function ServiceContactListItemUser() {
  const { contents, createdTime, didReply } = useContext(ServiceContactListItemContext);

  return (
    <div tw="flex pl-5 py-5 pr-2">
      <div tw="basis-64">
        <p tw="text-b2 text-left mb-2">{contents}</p>
        <span tw="text-info text-gray-700 text-left block">{createdTime}</span>
      </div>
      <div tw=" flex-1 text-right">
        {didReply ? (
          <span tw="text-b2 text-green-1000">답변 완료</span>
        ) : (
          <span tw="text-b2 text-gray-700">대기중</span>
        )}
      </div>
    </div>
  );
}
function ServiceContacatListItemAdmin() {
  const { contents, createdTime } = useContext(ServiceContactListItemContext);

  return (
    <div tw="p-5">
      <p tw="text-b2 mb-2">{contents}</p>
      <span tw="text-info text-gray-700">{`네고시오 운영팀 | ${createdTime}`}</span>
    </div>
  );
}

function ServiceContactListItemMain({ contents, createdTime, didReply, children }: ServiceContactListItemProps) {
  const childrenArray = Children.toArray(children);
  const context = useMemo(() => ({ contents, createdTime, didReply }), [contents, createdTime, didReply]);

  return (
    <ServiceContactListItemContext.Provider value={context}>
      <Accordion>
        <Accordion.Summary hideArrow>{childrenArray[0]}</Accordion.Summary>
        {childrenArray[1] && <Accordion.Details>{childrenArray[1]}</Accordion.Details>}
      </Accordion>
    </ServiceContactListItemContext.Provider>
  );
}

export const ServiceContactListItem = Object.assign(ServiceContactListItemMain, {
  User: ServiceContactListItemUser,
  Admin: ServiceContacatListItemAdmin,
});
