import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader, TextField } from '@/components/molecules';
import { ChangeEventHandler, useCallback, useState } from 'react';

interface Props {
  tradeID?: string;
  isReporting?: boolean;
  onClickReport?: (value: string) => void;
  onClickBack?: () => void;
}

export default function ListingReport({ tradeID, isReporting, onClickReport, onClickBack }: Props) {
  const [value, setValue] = useState('');

  const handleChangeValue = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>신고하기</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="py-7 flex-1 px-5">
        <div tw="font-bold">매물번호 {tradeID}</div>
        <div tw="mt-4">
          <TextField variant="outlined" size="medium">
            <TextField.TextArea
              value={value}
              onChange={handleChangeValue}
              tw="min-h-[72px]"
              placeholder="내용을 입력하세요.&#13;&#10;"
              spellCheck="false"
            />
          </TextField>
          <TextField.HelperMessage>{value.length} / 200</TextField.HelperMessage>
        </div>
      </div>
      <PersistentBottomBar>
        <Button
          isLoading={isReporting}
          tw="w-full"
          disabled={!value.length}
          size="bigger"
          onClick={() => onClickReport?.(value)}
        >
          신고하기
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
