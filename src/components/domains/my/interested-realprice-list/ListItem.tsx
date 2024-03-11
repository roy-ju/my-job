import Numeral from '@/components/atoms/Numeral';

import { BuyOrRent } from '@/constants/enums';

import { ListItem as ListItemType } from './types';

import {
  ListItemButton,
  ListItemWrraper,
  Seperator,
  Label,
  InfoWrraper,
  MainWrraper,
  Price,
  MainText,
} from './widget/ListWidget';
import useListItemHandler from './hooks/useListItemHandler';

type ListItemProps = {
  item: ListItemType;
};

export default function ListItem({ item }: ListItemProps) {
  const { danjiName, danjiID, buyOrRent, createdTime, price, monthlyRentFee, area, dealType } = item;

  const { handleClickListItem } = useListItemHandler({ danjiID, buyOrRent });

  return (
    <ListItemWrraper>
      <ListItemButton onClick={handleClickListItem}>
        <MainWrraper>
          <MainText>{danjiName}</MainText>
          <Price>
            <Numeral koreanNumber>{price}</Numeral>
            {Boolean(monthlyRentFee) && (
              <>
                {' '}
                / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
              </>
            )}
          </Price>
        </MainWrraper>

        <InfoWrraper>
          <span>{createdTime}</span>
          <Seperator />
          <span>전용 {area}㎡</span>
          <Seperator />
          {dealType === '직거래' && <Label>직</Label>}
          <span>{buyOrRent === BuyOrRent.Buy ? '매매' : '전월세'}</span>
        </InfoWrraper>
      </ListItemButton>
    </ListItemWrraper>
  );
}
