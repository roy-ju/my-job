import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Table from '.';

export default {
  title: 'molecules/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

export const Default: ComponentStory<typeof Table> = () => (
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.Head>거래종류</Table.Head>
        <Table.Data>월세</Table.Data>
      </Table.Row>
      <Table.Row>
        <Table.Head>희망가</Table.Head>
        <Table.Data>3억 1,000만 / 100만</Table.Data>
      </Table.Row>
    </Table.Body>
    <Table.Group>
      <Table.GroupSummary>하이</Table.GroupSummary>
      <Table.GroupDetails>
        <Table.Row>
          <Table.Head>개인정보 관리 책임자</Table.Head>
          <Table.Data>JIHYO KIM</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Head>사업자 등록번호</Table.Head>
          <Table.Data>11</Table.Data>
        </Table.Row>
      </Table.GroupDetails>
    </Table.Group>
    <Table.Body>
      <Table.Row>
        <Table.Head>개인정보 관리 책임자</Table.Head>
        <Table.Data>SAM LEE</Table.Data>
      </Table.Row>
      <Table.Row>
        <Table.Head>사업자 등록번호</Table.Head>
        <Table.Data>124354656867856</Table.Data>
      </Table.Row>
    </Table.Body>
  </Table>
);

Default.args = {};
