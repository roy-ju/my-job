import { Button, Checkbox, Label } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback, ChangeEventHandler } from 'react';
import tw from 'twin.macro';
import MyDetailForm from '../MyDetailForm';

const Container = tw.div``;

interface EmailProps {
  value: string;
}

function Email({ value }: EmailProps) {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold mb-1">계정 이메일</div>
      <div tw="text-info text-gray-700 mb-7">선택한 간편 로그인 서비스 계정의 이메일이 사용됩니다.</div>
      <TextField variant="outlined">
        <TextField.Input label="이메일" disabled value={value} />
      </TextField>
    </div>
  );
}

interface NicknameProps {
  errorMessage?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Nickname({ errorMessage, value, onChange }: NicknameProps) {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold mb-7">닉네임</div>
      <TextField variant="outlined" hasError={Boolean(errorMessage)}>
        <TextField.Input label="닉네임" value={value} onChange={onChange} />
      </TextField>
      {errorMessage && <TextField.ErrorMessage>{errorMessage}</TextField.ErrorMessage>}
    </div>
  );
}

interface PrivacyRetentionProps {
  value?: string;
  onChange?: (value: string) => void;
}

function PrivacyRetention({ value, onChange }: PrivacyRetentionProps) {
  return <MyDetailForm.PrivacyRetentionInfo value={value} onChange={onChange} />;
}

export interface TermsState {
  over19: boolean;
  service: boolean;
  privacy: boolean;
  location: boolean;
  notification: boolean;
  marketing: boolean;
}

interface TermsProps {
  state?: TermsState;
  onChangeState?: (newState: TermsState) => void;
  onNavigateToServiceTerms?: () => void;
  onNavigateToPrivacyTerms?: () => void;
  onNavigateToLocationTerms?: () => void;
}

function Terms({
  state: stateProp,
  onChangeState,
  onNavigateToLocationTerms,
  onNavigateToPrivacyTerms,
  onNavigateToServiceTerms,
}: TermsProps) {
  const [state, setState] = useControlled({
    controlled: stateProp,
    default: {
      over19: false,
      service: false,
      privacy: false,
      location: false,
      notification: false,
      marketing: false,
    },
  });

  const handleChangeState = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      let newState = { ...state };
      if (e.target.name === 'all') {
        newState = {
          over19: e.target.checked,
          service: e.target.checked,
          privacy: e.target.checked,
          location: e.target.checked,
          notification: e.target.checked,
          marketing: e.target.checked,
        };
      }
      newState = {
        ...newState,
        [e.target.name]: e.target.checked,
      };
      setState(newState);
      onChangeState?.(newState);
    },
    [state, setState, onChangeState],
  );

  const { over19, service, privacy, location, notification, marketing } = state;

  const all = over19 && service && privacy && location && notification && marketing;

  return (
    <div tw="px-5 flex flex-col">
      <div tw="pb-4 border-b border-b-gray-100">
        <Label control={<Checkbox name="all" />} label="전체 동의 및 확인" checked={all} onChange={handleChangeState} />
      </div>
      <div tw="pt-4 flex flex-col gap-4">
        <Label
          control={<Checkbox name="over19" />}
          label="(필수) 만 19세 이상"
          checked={over19}
          onChange={handleChangeState}
        />
        <div tw="flex items-center justify-between">
          <Label
            control={<Checkbox name="service" />}
            label="(필수) 서비스 이용약관 동의"
            checked={service}
            onChange={handleChangeState}
          />
          <Button
            onClick={onNavigateToServiceTerms}
            variant="ghost"
            size="none"
            tw="underline font-bold text-info text-gray-500"
          >
            보기
          </Button>
        </div>
        <div tw="flex items-center justify-between">
          <Label
            control={<Checkbox name="privacy" />}
            label="(필수) 개인정보 수집 및 이용 동의"
            checked={privacy}
            onChange={handleChangeState}
          />
          <Button
            onClick={onNavigateToPrivacyTerms}
            variant="ghost"
            size="none"
            tw="underline font-bold text-info text-gray-500"
          >
            보기
          </Button>
        </div>
        <div tw="flex items-center justify-between">
          <Label
            control={<Checkbox name="location" />}
            label="(필수) 위치기반 서비스 이용 동의"
            checked={location}
            onChange={handleChangeState}
          />
          <Button
            onClick={onNavigateToLocationTerms}
            variant="ghost"
            size="none"
            tw="underline font-bold text-info text-gray-500"
          >
            보기
          </Button>
        </div>
        <Label
          control={<Checkbox name="notification" />}
          label="(필수) 거래 알림 수신 동의"
          checked={notification}
          onChange={handleChangeState}
        />
        <Label
          control={<Checkbox name="marketing" />}
          label="(선택) 이벤트/마케팅 정보 수신 동의"
          checked={marketing}
          onChange={handleChangeState}
        />
      </div>
    </div>
  );
}

export default Object.assign(Container, { Email, Nickname, PrivacyRetention, Terms });
