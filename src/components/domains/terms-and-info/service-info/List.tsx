import { ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

import ListItem from './ListItem';

interface ServiceInfoListProps {
  children?: ReactNode;
}

const List = styled.div`
  ${tw`bg-white`}
  & > button:not(:first-of-type) > div {
    ${tw`border-t border-t-gray-100`}
  }
`;

function InfoList({ children }: ServiceInfoListProps) {
  return <List>{children}</List>;
}

export default Object.assign(InfoList, { Item: ListItem });
