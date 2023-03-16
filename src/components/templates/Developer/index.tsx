import { Button } from '@/components/atoms';
import { NavigationHeader, TextField } from '@/components/molecules';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

interface Props {
  defaultJwt?: string;
  onApplyChangeJwt?: (newJwt: string) => void;
}

export default function Developer({ defaultJwt, onApplyChangeJwt }: Props) {
  const [jwt, setJwt] = useState(defaultJwt);

  useEffect(() => {
    setJwt(defaultJwt);
  }, [defaultJwt]);

  const handleChangeJwt = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setJwt(e.target.value);
  }, []);

  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title>개발자 설정</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="p-5">
        <div tw="mb-1 text-gray-700 text-info">엑세스토큰</div>
        <TextField tw="border border-gray-700">
          <TextField.Input value={jwt} onChange={handleChangeJwt} placeholder="엑세스토큰" />
          <TextField.Trailing>
            <Button size="small" onClick={() => onApplyChangeJwt?.(jwt ?? '')}>
              적용
            </Button>
          </TextField.Trailing>
        </TextField>
      </div>
    </div>
  );
}
