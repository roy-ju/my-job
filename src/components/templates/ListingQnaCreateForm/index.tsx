import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader, TextField } from '@/components/molecules';
import { ChangeEventHandler } from 'react';

interface Props {
  value?: string;
  isCreating?: boolean;
  onClickCreateQna?: (value: string) => void;
  onClickBack?: () => void;
  handleChangeValue?: ChangeEventHandler<HTMLTextAreaElement>;
  handleClickOpenPopup?: () => void;
}

export default function ListingReport({
  value,
  isCreating,
  onClickBack,
  handleChangeValue,
  handleClickOpenPopup,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물문의하기</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="py-7 flex-1 px-5">
        <div>
          <TextField variant="outlined" size="medium">
            <TextField.TextArea
              value={value}
              onChange={handleChangeValue}
              tw="min-h-[72px]"
              placeholder="내용을 입력하세요.&#13;&#10;"
              spellCheck="false"
            />
          </TextField>
          <TextField.HelperMessage>{value?.length} / 200</TextField.HelperMessage>
        </div>
      </div>
      <PersistentBottomBar>
        <Button
          isLoading={isCreating}
          tw="w-full"
          disabled={!value?.length}
          size="bigger"
          onClick={handleClickOpenPopup}
        >
          작성완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
