import { ChangeEvent } from 'react';

import { Button } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import Form from './deregister/Form';

interface MyDeregisterProps {
  deregisterReasons?: string[];
  extraReasons?: string;
  onChangeDeregisterReasons?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeExtraReasons?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickBackButton?: () => void;
  onClickNext?: () => void;
}

export default function MyDeregister({
  deregisterReasons,
  extraReasons,
  onChangeDeregisterReasons,
  onChangeExtraReasons,
  onClickBackButton,
  onClickNext,
}: MyDeregisterProps) {
  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader>
        {onClickBackButton && <NavigationHeader.BackButton onClick={onClickBackButton} />}
        <NavigationHeader.Title>회원탈퇴</NavigationHeader.Title>
        <Button size="none" variant="ghost" tw="underline text-info leading-4" onClick={onClickNext}>
          건너뛰기
        </Button>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 px-5 py-5 overflow-y-auto">
        <div tw="text-h2 font-bold mb-6">
          네고시오 탈퇴 이유를
          <br />
          알려주세요
        </div>
        <Form
          extraReasons={extraReasons}
          onChangeTextArea={onChangeExtraReasons}
          deregisterReasons={deregisterReasons}
          onChangeCheckbox={onChangeDeregisterReasons}
        />
      </div>
      <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
        <Button variant="secondary" size="bigger" tw="w-full" onClick={onClickNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
