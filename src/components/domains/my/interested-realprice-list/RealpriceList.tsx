import Loading from '@/components/atoms/Loading';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import { v4 } from 'uuid';

import { ListItem as ListItemType } from './types';

import ListItem from './ListItem';

import { Container, ListWrraper } from './widget/ListWidget';

type RealPriceListProps = { isLoading: boolean; list: ListItemType[]; onNext: () => void };

export default function RealpriceList({ isLoading, list, onNext }: RealPriceListProps) {
  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ListWrraper onNext={onNext}>
        {list.map((item) => (
          <ListItem key={v4() + item.danjiName + item.area + item.price} item={item} />
        ))}
      </ListWrraper>
    </Container>
  );
}
