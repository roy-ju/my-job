import { Button, Separator } from '@/components/atoms';

import { RegisterForm } from '@/components/organisms';

import { TermsState } from '@/components/organisms/RegisterForm';

import { ChangeEventHandler } from 'react';

export interface RegisterProps {
  email?: string;
  nickname?: string;
  funnelInfo?: string;
  terms?: TermsState;
  formValid?: boolean;
  isLoading?: boolean;
  nicknameErrorMessage?: string;
  onChangeNickname?: ChangeEventHandler<HTMLInputElement>;
  onChangeFunnelInfo?: ChangeEventHandler<HTMLInputElement>;
  onChangeTerms?: (newState: TermsState) => void;
  onClickNext?: () => void;
  onNavigateToServiceTerms?: () => void;
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToLocationTerms?: () => void;
}

export default function Register({
  email = '',
  nickname,
  terms,
  funnelInfo = '',
  formValid = false,
  isLoading = false,
  nicknameErrorMessage,
  onChangeNickname,
  onChangeFunnelInfo,
  onChangeTerms,
  onClickNext,
  onNavigateToServiceTerms,
  onNavigateToPrivacyPolicy,
  onNavigateToLocationTerms,
}: RegisterProps) {
  return (
    <div tw="pt-12">
      <div>
        <RegisterForm.Email value={email} />
      </div>
      <div tw="my-10">
        <RegisterForm.Nickname value={nickname} onChange={onChangeNickname} errorMessage={nicknameErrorMessage} />
      </div>
      <Separator />
      <div tw="my-10">
        <RegisterForm.FunnelInfo value={funnelInfo} onChange={onChangeFunnelInfo} />
      </div>
      <Separator />
      <div tw="my-10">
        <RegisterForm.Terms
          state={terms}
          onChangeState={onChangeTerms}
          onNavigateToServiceTerms={onNavigateToServiceTerms}
          onNavigateToLocationTerms={onNavigateToLocationTerms}
          onNavigateToPrivacyPolicy={onNavigateToPrivacyPolicy}
        />
      </div>
      <div tw="mb-8 px-5">
        <Button
          isLoading={isLoading}
          disabled={!formValid || Boolean(nicknameErrorMessage)}
          tw="w-full"
          size="bigger"
          onClick={onClickNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
