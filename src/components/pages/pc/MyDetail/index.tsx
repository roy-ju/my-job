import { Panel } from '@/components/atoms';
import { MyDetail as MyDetailTemplate } from '@/components/templates';
import { memo } from 'react';
import useMyDetail from './useMyDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const {
    nickname,
    email,
    name,
    phone,
    roadNameAddress,
    addressDetail,
    ownershipVerified,
    handleClickDeregister,
    handleLogout,
    handleUpdateAddress,
    handleUpdatePhone,
  } = useMyDetail(depth);

  return (
    <Panel width={panelWidth}>
      <MyDetailTemplate
        nickname={nickname ?? ''}
        email={email ?? ''}
        name={name ?? ''}
        phone={phone ?? ''}
        address={roadNameAddress ?? ''}
        addressDetail={addressDetail ?? ''}
        addressVerified={ownershipVerified ?? false}
        onClickDeregister={handleClickDeregister}
        onClickLogout={handleLogout}
        onClickUpdateAddress={handleUpdateAddress}
        onClickUpdatePhone={handleUpdatePhone}
      />
    </Panel>
  );
});
