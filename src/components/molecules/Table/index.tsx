import tw, { styled } from 'twin.macro';

const Table = styled.table`
  ${tw`w-full text-b2`}
  tr:not(:last-of-type) {
    ${tw`border-b border-b-gray-100`}
  }
  th {
    ${tw`py-2 mr-3 font-normal text-gray-700 text-start`}
  }
  td {
    ${tw`py-2 pl-3 align-top`}
  }
`;

const TableRow = tw.tr``;

const TableHead = tw.th``;

const TableData = tw.td``;

const TableAccordion = tw.div``;

export default Table;
