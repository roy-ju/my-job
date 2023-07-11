import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader, TextField } from '@/components/molecules';
import React, { useEffect, useState } from 'react';

export default function LegalCounselingWriting({
  preTitle,
  preContent,
  onClickBack,
  onClickConfirm,
}: {
  preTitle?: string;
  preContent?: string;
  onClickBack?: () => void;
  onClickConfirm?: (text?: string | undefined, message?: string | undefined) => Promise<void>;
}) {
  const [titleValue, setTitleValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('');

  useEffect(() => {
    if (preTitle) {
      setTitleValue(preTitle);
    }
  }, [preTitle]);

  useEffect(() => {
    if (preContent) {
      setContentValue(preContent);
    }
  }, [preContent]);

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>부동산 법률 상담</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 pt-10 px-5">
        <div tw="flex flex-col gap-4">
          <TextField variant="outlined">
            <TextField.Input
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="제목을 입력해 주세요."
            />
          </TextField>

          <TextField variant="outlined">
            <TextField.TextArea
              value={contentValue}
              onChange={(e) => setContentValue(e.currentTarget.value as string)}
              placeholder="부동산 법률의 궁금한 내용을 입력해 주세요."
              tw="min-h-[98px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
              spellCheck="false"
            />
          </TextField>
        </div>
        <div tw="text-right">
          <span tw="text-info">{contentValue.length} / 200</span>
        </div>
      </div>
      <PersistentBottomBar>
        <Button
          variant="primary"
          tw="w-full"
          size="bigger"
          onClick={() => onClickConfirm?.(titleValue, contentValue)}
          disabled={!titleValue || !contentValue}
        >
          완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
