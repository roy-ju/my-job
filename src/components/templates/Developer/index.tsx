import { Button } from '@/components/atoms';
import { Dropdown, NavigationHeader, TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback } from 'react';
import * as gtag from '@/lib/gtag';
import Keys from '@/constants/storage_keys';

interface Props {
  userNickname?: string;
  userName?: string;
  jwtOwner?: string;
  jwtOwners?: string[];
  onChangeJwtOwner?: (newValue: string) => void;
}

export default function Developer({
  userNickname,
  userName,
  jwtOwner: jwtOwnerProp,
  jwtOwners,
  onChangeJwtOwner,
}: Props) {
  const [jwtOwner, setJwtOwner] = useControlled({
    controlled: jwtOwnerProp,
    default: '',
  });

  const handleChangeJwtOwner = useCallback(
    (newValue: string) => {
      setJwtOwner(newValue);
      onChangeJwtOwner?.(newValue);
    },
    [setJwtOwner, onChangeJwtOwner],
  );

  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title>개발자 설정</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex flex-col p-5 gap-4">
        <div tw="flex flex-col gap-2">
          <TextField variant="outlined">
            <TextField.Input label="유저 닉네임" value={userNickname} />
          </TextField>
          <TextField variant="outlined">
            <TextField.Input label="유저 이름" value={userName} />
          </TextField>
        </div>
        <Dropdown label="엑세스토큰" value={jwtOwner} onChange={handleChangeJwtOwner}>
          {jwtOwners?.map((item) => (
            <Dropdown.Option key={item} value={item}>
              {item}
            </Dropdown.Option>
          ))}
        </Dropdown>
        {localStorage.getItem(Keys.ACCESS_TOKEN) && (
          <TextField variant="outlined">
            <TextField.TextArea disabled label="액세스 토큰" value={localStorage.getItem(Keys.ACCESS_TOKEN) ?? ''} />
          </TextField>
        )}
        <Button
          onClick={() =>
            gtag.event({
              action: 'custom_test_event',
              category: 'test category',
              label: 'test label',
              value: 'test value',
            })
          }
        >
          Fire a ga event
        </Button>
      </div>
    </div>
  );
}
