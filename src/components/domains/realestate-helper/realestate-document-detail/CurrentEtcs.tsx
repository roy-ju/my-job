import { useState, useCallback, memo, useMemo } from 'react';

import tw, { theme } from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { MarginTopSixteen, MarginTopTwentyFour } from '@/components/atoms/Margin';

import { DeptListItem } from '@/services/sub-home/types';

import IconArrowDown from '@/assets/icons/icon_arrow_down_20_1.svg';

import {
  BetweenRow,
  TableTitle,
  TableSubTitle,
  TableSmallTitle,
  TableWrraper,
  CurrentEtcsTableHead,
  CurrentEtcsTableBody,
} from './widget/RealestateDocumentDetailWidget';

type CurrentEtcsProps = { list: DeptListItem[] };

const StrikeOut = memo(({ str }: { str: string }) => {
  // Regular expression to match words enclosed in "&" symbols
  const regex = /&([^&]*)&/g;

  // Replace matched words with wrapped tags
  const output = str.replace(regex, '<strike>$1</strike>');

  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: output }} />;
});

export default function CurrentEtcs({ list }: CurrentEtcsProps) {
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
    <div tw="pb-4">
      <BetweenRow tw="px-5">
        <TableTitle>
          기타 특별 현황<TableSubTitle>(압류 현황)</TableSubTitle>
        </TableTitle>
        <TableSmallTitle>총 {list.length}건</TableSmallTitle>
      </BetweenRow>
      <MarginTopSixteen />
      <TableWrraper tw="px-5">
        <CurrentEtcsTableHead>
          <div>목적 / 날짜</div>
          <div>내용</div>
        </CurrentEtcsTableHead>
        {(!open ? list.slice(0, 3) : list.slice(0, list.length)).map((item) => (
          <CurrentEtcsTableBody key={item.purpose + item.application_info + item.number}>
            <div>{`${item.purpose}\n${item.application_info}`}</div>
            <div>
              <StrikeOut str={item.description} />
            </div>
          </CurrentEtcsTableBody>
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
