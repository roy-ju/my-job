import { useState, useCallback, useMemo } from 'react';

import tw, { theme } from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { MarginTopSixteen, MarginTopTwentyFour } from '@/components/atoms/Margin';

import { OwnerListItem } from '@/services/sub-home/types';

import IconArrowDown from '@/assets/icons/icon_arrow_down_20_1.svg';

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
      {renderMoreButtonUI && <div tw="bg-gray-200 w-full [min-height: 1px]" />}
      {renderMoreButtonUI && (
        <ButtonV2 variant="white" tw="w-full flex gap-0.5" size="bigger" radius="none" onClick={handleClick}>
          {!open ? '더보기' : '접기'}
          <IconArrowDown color={theme`colors.gray.600`} css={[open && tw`rotate-180`]} />
        </ButtonV2>
      )}
    </div>
  );
}
