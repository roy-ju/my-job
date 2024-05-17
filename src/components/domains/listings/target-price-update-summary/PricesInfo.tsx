import tw, { styled } from 'twin.macro';

import Numeral from '@/components/atoms/Numeral';

import Table from '@/components/molecules/Table';

const StyledTable = styled.table`
  ${tw`w-full text-b2`}
  th {
    ${tw`py-1 text-gray-1000`}
  }
  td {
    ${tw`py-1 text-end`}
  }
`;

type PricesInfoProps = {
  beforePrice?: number;
  beforeMonthlyRentFee?: number;
  afterPrice: number;
  afterMonthlyRentFee: number;
};

export default function PricesInfo({
  beforePrice,
  beforeMonthlyRentFee,
  afterPrice,
  afterMonthlyRentFee,
}: PricesInfoProps) {
  return (
    <div tw="py-7 px-5">
      <div tw="text-b1 font-bold mb-4">수정 내용</div>
      <StyledTable>
        <Table.Body>
          <Table.Row>
            <Table.Head>변경 전 희망가</Table.Head>
            <Table.Data>
              <Numeral koreanNumber>{beforePrice}</Numeral>
              {Boolean(beforeMonthlyRentFee) && (
                <span>
                  {' '}
                  / <Numeral koreanNumber>{beforeMonthlyRentFee}</Numeral>
                </span>
              )}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Head>변경 후 희망가</Table.Head>
            <Table.Data>
              <Numeral koreanNumber>{afterPrice}</Numeral>
              {Boolean(afterMonthlyRentFee) && (
                <span>
                  {' '}
                  / <Numeral koreanNumber>{afterMonthlyRentFee}</Numeral>
                </span>
              )}
            </Table.Data>
          </Table.Row>
        </Table.Body>
      </StyledTable>
    </div>
  );
}
