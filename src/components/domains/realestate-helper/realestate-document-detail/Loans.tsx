import { MarginTopTwenty, MarginTopTwentyFour } from '@/components/atoms/Margin';

import {
  BetweenRow,
  TableTitle,
  TableSubTitle,
  TableSmallTitle,
  TableWrraper,
  LoansTableHead,
  LoansTableBody,
} from './widget/RealestateDocumentDetailWidget';

export default function Loans() {
  return (
    <div tw="bg-yellow-500">
      <BetweenRow>
        <TableTitle>
          담보 제공 현황<TableSubTitle>((근)저당권 및 전세권)</TableSubTitle>
        </TableTitle>
        <TableSmallTitle>총 5명</TableSmallTitle>
      </BetweenRow>
      <MarginTopTwenty />
      <TableWrraper tw="pt-0">
        <LoansTableHead>
          <div>목적 / 날짜</div>
          <div>내용</div>
        </LoansTableHead>

        {[1, 2, 3, 4, 5].map((item) => (
          <LoansTableBody key={item}>
            <div>{'근저당권설정\n2024-01-01'}</div>
            <div>채권최고액 금 430,000,000원 근저당권자 주식회사 한국스탠다드차타드은행</div>
          </LoansTableBody>
        ))}
      </TableWrraper>
      <MarginTopTwentyFour />
    </div>
  );
}
