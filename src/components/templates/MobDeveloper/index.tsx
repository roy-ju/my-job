import { Button } from '@/components/atoms';
import { Dropdown, NavigationHeader, TextField } from '@/components/molecules';
import useControlled from '@/hooks/useControlled';
import Routes from '@/router/routes';
import getCurrentPosition from '@/utils/getCurrentPosition';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

interface Props {
  userNickname?: string;
  userName?: string;
  jwtOwner?: string;
  jwtOwners?: string[];
  onChangeJwtOwner?: (newValue: string) => void;
}

export default function MobDeveloper({
  userNickname,
  userName,
  jwtOwner: jwtOwnerProp,
  jwtOwners,
  onChangeJwtOwner,
}: Props) {
  const router = useRouter();

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
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={() => router.replace(`/${Routes.EntryMobile}/${Routes.My}`)} />
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
        <Button
          onClick={() => {
            getCurrentPosition(
              ({ lat, lng }) => {
                toast.success(`lat: ${lat} lng: ${lng}`);
              },
              () => {
                toast.error(`failed`);
              },
            );
          }}
        >
          현재 위치 가지고 오기
        </Button>
      </div>
    </div>
  );
}
