import { GuideListItem } from '@/services/sub-home/types';

import Card from './Card';

type CardListProps = {
  list: GuideListItem[];
  handleClickItem: (v: string) => void;
};

export default function CardList({ list, handleClickItem }: CardListProps) {
  return (
    <>
      {list.map((item) => (
        <Card
          key={item.id}
          handleClickItem={handleClickItem}
          title={item?.title ?? ''}
          subTitle={item?.content ?? ''}
          link={item?.notion_url ?? ''}
          thumbnailImgPath={item?.thumb_file_path ?? ''}
        />
      ))}
    </>
  );
}
