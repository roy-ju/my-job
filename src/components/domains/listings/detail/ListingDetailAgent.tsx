import { useState } from 'react';

import tw, { styled } from 'twin.macro';

import { Avatar, Button } from '@/components/atoms';

import { Table } from '@/components/molecules';

import { ListingDetailResponse } from '@/services/listing/types';

const SectionWrraper = styled.div`
  ${tw`px-5 py-10`}
`;

interface ListingDetailAgentProps {
  agent?: ListingDetailResponse['agent_summary'];
}

export default function ListingDetailAgent({ agent }: ListingDetailAgentProps) {
  const [agentInfoExpanded, setAgentInfoExpanded] = useState(false);

  return (
    <SectionWrraper>
      <div>
        <div tw="font-bold mb-3">
          <h2>중개사 정보</h2>
        </div>
        <div tw="flex items-center gap-2">
          <Avatar src={agent?.profile_image_full_path} />
          <div>
            <div tw="font-bold">
              <p>{agent?.office_name}</p>
            </div>
            <div tw="text-info text-gray-700">
              <p>공인중개사 {agent?.name}</p>
            </div>
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
    </SectionWrraper>
  );
}
