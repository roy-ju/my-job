import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader, TextField } from '@/components/molecules';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function LegalCounselingWriting({
  isLoading,
  preTitle,
  preContent,
  onClickBack,
  onClickConfirm,
}: {
  isLoading?: boolean;
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
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  setTitleValue(e.target.value);
                } else if (e.target.value.length > 50) {
                  toast.error('더 이상 입력할 수 없습니다.', { toastId: 'error_max_length' });
                  setTitleValue(e.target.value.slice(0, 50));
                }
              }}
              placeholder="제목을 입력해 주세요."
            />
          </TextField>

          <TextField variant="outlined">
            <TextField.TextArea
              value={contentValue}
              onChange={(e) => {
                if (e.currentTarget.value.length <= 1500) {
                  setContentValue(e.currentTarget.value as string);
                } else if (e.currentTarget.value.length > 1500) {
                  toast.error('더 이상 입력할 수 없습니다.', { toastId: 'error_max_length' });
                  setContentValue(e.currentTarget.value.slice(0, 1500) as string);
                }
              }}
              placeholder="부동산 법률의 궁금한 내용을 입력해 주세요."
              tw="min-h-[98px] max-h-[280px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
              spellCheck="false"
            />
          </TextField>
        </div>
        <div tw="text-right">
          <span tw="text-info">{contentValue.length} / 1500</span>
        </div>
      </div>
      <PersistentBottomBar>
        <Button
          variant="primary"
          tw="w-full"
          size="bigger"
          onClick={() => onClickConfirm?.(titleValue, contentValue)}
          disabled={!titleValue || !contentValue}
          isLoading={isLoading}
        >
          완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
