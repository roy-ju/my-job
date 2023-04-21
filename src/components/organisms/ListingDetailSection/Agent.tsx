import { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
import { Avatar, Button } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { useState } from 'react';

interface Props {
  agent?: GetListingDetailResponse['agent_summary'];
}

export default function Agent({ agent }: Props) {
  const [agentInfoExpanded, setAgentInfoExpanded] = useState(false);

  return (
    <div>
      <div tw="font-bold mb-3">중개사 정보</div>
      <div tw="flex items-center gap-2">
        <Avatar src={agent?.profile_image_full_path} />
        <div>
          <div tw="font-bold">{agent?.office_name}</div>
          <div tw="text-info text-gray-700">공인중개사 {agent?.name}</div>
        </div>
      </div>
      {agentInfoExpanded && (
        <Table tw="mt-4">
          <Table.Body>
            <Table.Row>
              <Table.Head>전화번호</Table.Head>
              <Table.Data>{agent?.office_phone}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>중개소 주소</Table.Head>
              <Table.Data>{agent?.address}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Head>등록번호</Table.Head>
              <Table.Data>{agent?.registration_number}</Table.Data>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
      <Button variant="outlined" tw="w-full mt-3" onClick={() => setAgentInfoExpanded((prev) => !prev)}>
        {agentInfoExpanded ? '접기' : '더보기'}
      </Button>
    </div>
  );
}
