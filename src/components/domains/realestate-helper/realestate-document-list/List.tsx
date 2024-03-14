import { useRouter } from 'next/router';

import ListItem from './ListItem';

import { ListContainer } from './widget/RealestateDocumentListWidget';

export default function List() {
  const router = useRouter();

  const handleClickListItem = (item: number) => {
    console.log(item);
    console.log(router);
  };

  return (
    <ListContainer>
      <ListItem
        lookupText="2024.01.01 조회"
        title="봇들마을9단지 금호어울림 아파트 101동 101호"
        subTitle="경기도 성남시 분당구 동판교로 156"
        handleClickItem={handleClickListItem}
      />
    </ListContainer>
  );
}
