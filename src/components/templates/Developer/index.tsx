import { Button } from '@/components/atoms';
import { Dropdown, NavigationHeader, TextField } from '@/components/molecules';
import useControlled from '@/hooks/useControlled';
import { useCallback } from 'react';
import * as gtag from '@/lib/gtag';
import Keys from '@/constants/storage_keys';
import CopyIcon from '@/assets/icons/copy.svg';

interface Props {
  userNickname?: string;
  userName?: string;
  jwtOwner?: string;
  jwtOwners?: string[];
  onChangeJwtOwner?: (newValue: string) => void;
  onClickClipboardCopy?: (text: string) => void;
}

export default function Developer({
  userNickname,
  userName,
  jwtOwner: jwtOwnerProp,
  jwtOwners,
  onChangeJwtOwner,
  onClickClipboardCopy,
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

  const token = localStorage.getItem(Keys.ACCESS_TOKEN)?.slice(1, -1) ?? '';

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
        {token && (
          <div tw="relative">
            <button
              onClick={() => {
                onClickClipboardCopy?.(token);
              }}
              type="button"
              tw="block ml-auto w-6 h-6 hover:bg-gray-50 rounded-md"
            >
              <CopyIcon tw="w-6 h-6" />
            </button>
            <TextField variant="outlined">
              <TextField.TextArea tw="break-all" disabled label="액세스 토큰" value={token ?? ''} />
            </TextField>
          </div>
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
