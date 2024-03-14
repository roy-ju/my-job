import { MarginTopTwenty, MarginTopTwentyFour } from '@/components/atoms/Margin';

import {
  BetweenRow,
  TableTitle,
  TableSubTitle,
  TableSmallTitle,
  TableWrraper,
  CurrentEtcsTableHead,
  CurrentEtcsTableBody,
} from './widget/RealestateDocumentDetailWidget';

export default function CurrentEtcs() {
  return (
    <div tw="bg-yellow-500">
      <BetweenRow>
        <TableTitle>
          기타 특별 현황<TableSubTitle>(압류 현황)</TableSubTitle>
        </TableTitle>
        <TableSmallTitle>총 5명</TableSmallTitle>
      </BetweenRow>
      <MarginTopTwenty />
      <TableWrraper tw="pt-0">
        <CurrentEtcsTableHead>
          <div>목적 / 날짜</div>
          <div>내용</div>
        </CurrentEtcsTableHead>

        {[1, 2, 3, 4, 5].map((item) => (
          <CurrentEtcsTableBody key={item}>
            <div>{'임의경매개시결정\n2024-01-01'}</div>
            <div>2분의 1</div>
          </CurrentEtcsTableBody>
        ))}
      </TableWrraper>
      <MarginTopTwentyFour />
    </div>
  );
}
