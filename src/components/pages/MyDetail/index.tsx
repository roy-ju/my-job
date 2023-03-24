import { Panel } from '@/components/atoms';
import { MyDetail as MyDetailTemplate } from '@/components/templates';
import { memo } from 'react';
import useMyDetail from './useMyDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
  const { nickname, email, name, phone, roadNameAddress, addressDetail, ownershipVerified } = useMyDetail();

  return (
    <Panel width={panelWidth}>
      <MyDetailTemplate
        nickname={nickname ?? ''}
        email={email ?? ''}
        name={name ?? ''}
        phone={phone ?? ''}
        address={roadNameAddress ?? ''}
        addressDetail={addressDetail ?? ''}
        verified={ownershipVerified ?? false}
      />
    </Panel>
  );
});
