import { Panel } from '@/components/atoms';
import { UpdatePhone } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { ChangeEventHandler, memo, useCallback, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  const handleChangePhone = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPhone(e.target.value);
  }, []);

  const handleChangeCode = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setCode(e.target.value);
  }, []);

  const handleClickSend = useCallback(() => {
    setSent(true);
  }, []);

  const handleClickVerifyCode = useCallback(() => {
    setCodeVerified(true);
  }, []);

  const handleClickNext = useCallback(() => {
    router.replace(Routes.MyDetail);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <UpdatePhone
        phone={phone}
        code={code}
        sent={sent}
        codeVerified={codeVerified}
        onChangePhone={handleChangePhone}
        onChangeCode={handleChangeCode}
        onClickSend={handleClickSend}
        onClickVerifyCode={handleClickVerifyCode}
        onClickNext={handleClickNext}
      />
    </Panel>
  );
});
