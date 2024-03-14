import { MarginTopSixteen, MarginTopTwentyFour } from '@/components/atoms/Margin';
import {
  BetweenRow,
  TableTitle,
  TableSmallTitle,
  TableWrraper,
  CurrentOwnersTableHead,
  CurrentOwnersTableBody,
} from './widget/RealestateDocumentDetailWidget';

export default function CurrentOwners() {
  return (
    <div tw="bg-yellow-500">
      <BetweenRow>
        <TableTitle>건물 소유자 현황</TableTitle>
        <TableSmallTitle>총 10명</TableSmallTitle>
      </BetweenRow>

      <MarginTopSixteen />

      <TableWrraper>
        <CurrentOwnersTableHead>
          <div>이름 / 생년월일</div>
          <div>주소</div>
          <div>지분</div>
        </CurrentOwnersTableHead>
        {[1, 2, 3, 4, 5].map((item) => (
          <CurrentOwnersTableBody key={item}>
            <div>{'홍길동(소유자)\n1980-01-01'}</div>
            <div>서울특별시 강남구 ***</div>
            <div>4686505분의 248292</div>
          </CurrentOwnersTableBody>
        ))}
      </TableWrraper>
      <MarginTopTwentyFour />
    </div>
  );
}
