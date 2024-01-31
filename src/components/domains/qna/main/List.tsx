import React from 'react';

import tw, { styled } from 'twin.macro';

import ListItem from './ListItem';

const ListContainer = styled.div`
  ${tw`max-h-full min-h-0 overflow-x-hidden overflow-y-auto`}
`;

export interface IQnaItem {
  admin_message: string;
  admin_response_time: string;
  created_time: string;
  id: number;
  user_id: number;
  user_message: string;
}

export default function List({ list }: { list: IQnaItem[] }) {
  return (
    <ListContainer>
      {list.map((item, i) => (
        <React.Fragment key={item.id}>
          {!!i && <div tw="border-t mx-5 border-gray-300" />}

          <ListItem>
            <ListItem.User
              userMessage={item.user_message}
              createdTime={item.created_time}
              didReply={!!item.admin_message}
            />
            {item.admin_message ? (
              <ListItem.Admin adminMessage={item.admin_message} responseTime={item.admin_response_time} />
            ) : null}
          </ListItem>
        </React.Fragment>
      ))}
    </ListContainer>
  );
}
