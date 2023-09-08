import tw, { styled } from 'twin.macro';
import ListItem from './ListItem';

const List = styled.div`
  ${tw`bg-white`}
  & > button:not(:first-of-type) {
    ${tw`border-t border-t-gray-300`}
  }
`;

export default Object.assign(List, { Item: ListItem });
