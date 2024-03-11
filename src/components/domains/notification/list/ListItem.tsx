import { useCallback } from 'react';

import tw from 'twin.macro';

import { Checkbox, Chip, Moment } from '@/components/atoms';

import useControlled from '@/hooks/useControlled';

import { ListItemButton, Title, Message, ListingTitle, CreatedTime, Row, RowCenter, Column } from './widget/ListWidget';
import { ListItem as ListItemType } from './types';

type ListItemProps = {
  item: ListItemType;
  checkbox: boolean;
  checked?: boolean;
  onClick?: () => void;
  onChange?: (checked: boolean) => void;
};

export default function ListItem({ item, checkbox, checked: checkedProp, onClick, onChange }: ListItemProps) {
  const { title, type, category, message, listingTitle, createdTime, unread } = item;

  const [checked, setChecked] = useControlled({
    controlled: checkedProp,
    default: false,
  });

  const handleClick = useCallback(() => {
    if (checkbox) {
      const newValue = !checked;
      setChecked(newValue);
      onChange?.(newValue);
    } else {
      onClick?.();
    }
  }, [onClick, onChange, setChecked, checkbox, checked]);

  const typeString = (() => {
    switch (type) {
      case 1:
        return '서비스';
      case 2:
        return '거래';
      case 3:
        return '마케팅';
      case 4:
        return '커뮤니티';
      default:
        return '';
    }
  })();

  const setChip = (() => {
    switch (category) {
      case 1:
        return { label: '등록', color: 'nego' } as const;
      case 2:
        return { label: '참여', color: 'red' } as const;
      case 3:
        return { label: '기타', color: 'yellow' } as const;
      default:
        return { label: undefined, color: undefined } as const;
    }
  })();

  return (
    <div>
      <ListItemButton onClick={handleClick} css={[unread && tw`bg-gray-100`]}>
        <Column>
          <RowCenter>
            <Row>
              <Chip variant="gray">{typeString}</Chip>
              {Boolean(category) && <Chip variant={setChip.color}>{setChip.label}</Chip>}
            </Row>
            <CreatedTime>
              <Moment tw="text-info leading-3.5 text-gray-700" format="YYYY.MM.DD">
                {createdTime}
              </Moment>
              {checkbox && <Checkbox checked={checked} />}
            </CreatedTime>
          </RowCenter>
          <ListingTitle>{listingTitle}</ListingTitle>
          <Title>{title}</Title>
          <Message>{message}</Message>
        </Column>
      </ListItemButton>
    </div>
  );
}
