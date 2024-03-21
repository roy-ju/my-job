import { useState, useCallback, useMemo } from 'react';

import TextButton from '@/components/atoms/TextButton';

import { MarginTopSixteen, MarginTopTwentyFour } from '@/components/atoms/Margin';

import { OwnerListItem } from '@/services/sub-home/types';

import {
  BetweenRow,
  TableTitle,
  TableSmallTitle,
  TableWrraper,
  CurrentOwnersTableHead,
  CurrentOwnersTableBody,
} from './widget/RealestateDocumentDetailWidget';

type CurrentOwnersProps = { list: OwnerListItem[] };

export default function CurrentOwners({ list }: CurrentOwnersProps) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [open]);

  const renderMoreButtonUI = useMemo(() => list.length > 3, [list]);

  return (
    <div>
      <BetweenRow tw="px-5">
        <TableTitle>건물 소유자 현황</TableTitle>
        <TableSmallTitle>총 {list.length}명</TableSmallTitle>
      </BetweenRow>
      <MarginTopSixteen />
      <TableWrraper tw="px-5">
        <CurrentOwnersTableHead>
          <div>이름 / 생년월일</div>
          <div>주소</div>
          <div>지분</div>
        </CurrentOwnersTableHead>
        {(!open ? list.slice(0, 3) : list.slice(0, list.length)).map((item) => (
          <CurrentOwnersTableBody key={item.owner + item.registration_number}>
            <div>{`${item.owner}\n${item.registration_number}`}</div>
            <div>{item.address}</div>
            <div>{item.share}</div>
          </CurrentOwnersTableBody>
        ))}
      </TableWrraper>
      {renderMoreButtonUI && <MarginTopTwentyFour />}
      {renderMoreButtonUI && (
        <TextButton
          variant={!open ? 'down' : 'up'}
          title={!open ? '더보기' : '접기'}
          size="large"
          color="gray700"
          tw="w-full border-t border-t-gray-200 [padding-block: 17px]"
          onClick={handleClick}
        />
      )}
    </div>
  );
}
