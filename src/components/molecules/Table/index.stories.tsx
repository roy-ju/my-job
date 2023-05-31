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
        <Table.Head>매물번호</Table.Head>
        <Table.Data>T22208230002</Table.Data>
      </Table.Row>
      <Table.Row>
        <Table.Head>부동산 종류</Table.Head>
        <Table.Data>아파트</Table.Data>
      </Table.Row>
    </Table.Body>
    <Table.Group>
      <Table.GroupSummary>세부정보</Table.GroupSummary>
      <Table.GroupDetails>
        <Table.Row>
          <Table.Head>면적</Table.Head>
          <Table.Data>공급 114㎡ / 전용 97㎡</Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Head>방향</Table.Head>
          <Table.Data>남향</Table.Data>
        </Table.Row>
      </Table.GroupDetails>
    </Table.Group>
    <Table.Body>
      <Table.Row>
        <Table.Head>매물번호</Table.Head>
        <Table.Data>T22208230002</Table.Data>
      </Table.Row>
      <Table.Row>
        <Table.Head>부동산 종류</Table.Head>
        <Table.Data>아파트</Table.Data>
      </Table.Row>
      <Table.Row>
        <Table.Head>기타 옵션</Table.Head>
        <Table.Data>
          에어컨, 붙박이장, 세탁기, 전기오븐, 인덕션, 식기세척기, 냉장고, 건조기, 디지털도어락, 욕조
        </Table.Data>
      </Table.Row>
    </Table.Body>
  </Table>
);

Default.args = {};
