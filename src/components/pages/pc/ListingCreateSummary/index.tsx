import { Panel } from '@/components/atoms';
import { ListingCreateSummary } from '@/components/templates';
import { memo } from 'react';

const mockArgs = {
  agentOfficeName: '네고시오',
  agentProfileImageFullPath: '',
  agentName: '김네고',
  agentCellPhone: '02-2222-2222',
  agentJibunAddress: '경기도 성남시 분당구 백현동 645-12',
  agentRegistrationNumber: '12345-8219-71734',
  agentDescription: '한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히',
};

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <ListingCreateSummary {...mockArgs} />
  </Panel>
));
