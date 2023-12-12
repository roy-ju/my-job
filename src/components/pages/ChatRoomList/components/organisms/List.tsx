import ListItem from './ListItem';

import useClientList from '../../hooks/useClientList';

export default function List() {
  const { list } = useClientList();

  return (
    <div tw="flex-1 min-h-0 overflow-y-auto">
      {list.map((item) => (
        <ListItem key={item.chat_room_id} item={item} />
      ))}
    </div>
  );
}
