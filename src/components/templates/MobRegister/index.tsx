import { Button, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { MobRegisterForm } from '@/components/organisms';
import { TermsState } from '@/components/organisms/RegisterForm';
import { ChangeEventHandler } from 'react';

export interface RegisterProps {
  email?: string;
  nickname?: string;
  privacyRetention?: string;
  terms?: TermsState;
  formValid?: boolean;
  isLoading?: boolean;
  nicknameErrorMessage?: string;
  onChangeNickname?: ChangeEventHandler<HTMLInputElement>;
  onChangePrivacyRetention?: (value: string) => void;
  onChangeTerms?: (newState: TermsState) => void;
  onClickNext?: () => void;
  onClickBackButton?: () => void;
  onNavigateToServiceTerms?: () => void;
  onNavigateToPrivacyTerms?: () => void;
  onNavigateToLocationTerms?: () => void;
}

export default function MobRegister({
  email = '',
  nickname,
  terms,
  privacyRetention,
  formValid = false,
  isLoading = false,
  nicknameErrorMessage,
  onChangeNickname,
  onChangePrivacyRetention,
  onChangeTerms,
  onClickNext,
  onClickBackButton,
  onNavigateToLocationTerms,
  onNavigateToPrivacyTerms,
  onNavigateToServiceTerms,
}: RegisterProps) {
  return (
    <div tw="w-full max-w-mobile relative flex flex-col mx-auto bg-white h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title>회원가입</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="min-h-0 flex-1 overflow-auto">
        <div>
          <MobRegisterForm.Email value={email} />
        </div>
        <div tw="my-10">
          <MobRegisterForm.Nickname value={nickname} onChange={onChangeNickname} errorMessage={nicknameErrorMessage} />
        </div>
        <Separator />
        <div tw="my-10">
          <MobRegisterForm.PrivacyRetention value={privacyRetention} onChange={onChangePrivacyRetention} />
        </div>
        <Separator />
        <div tw="my-10">
          <MobRegisterForm.Terms
            state={terms}
            onChangeState={onChangeTerms}
            onNavigateToServiceTerms={onNavigateToServiceTerms}
            onNavigateToPrivacyTerms={onNavigateToPrivacyTerms}
            onNavigateToLocationTerms={onNavigateToLocationTerms}
          />
        </div>
        <div tw="mb-20 px-5">
          <Button isLoading={isLoading} disabled={!formValid} tw="w-full" size="bigger" onClick={onClickNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
