import { useCallback, ChangeEventHandler } from 'react';

import { Label, Checkbox, ButtonV2 } from '@/components/atoms';

import useControlled from '@/hooks/useControlled';

import ArrowRight from '@/assets/icons/arrow_right_20.svg';

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
  onOpenServiceTerms?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenLocationTerms?: () => void;
}

export default function Terms({
  state: stateProp,
  onChangeState,
  onOpenPrivacyPolicy,
  onOpenServiceTerms,
  onOpenLocationTerms,
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
      <p tw="text-heading_01 mb-1">약관 동의</p>
      <p tw="text-body_01 text-gray-700 mb-6">서비스를 이용하려면 약관에 동의가 필요해요!</p>

      <div tw="pb-4 border-b border-b-gray-200">
        <Label
          size="large"
          control={<Checkbox name="all" iconType="blueSquare" />}
          label="전체 동의 및 확인"
          checked={all}
          onChange={handleChangeState}
        />
      </div>

      <div tw="pt-4 flex flex-col gap-4">
        <Label
          size="large"
          control={<Checkbox name="over19" iconType="blueSquare" />}
          label="(필수) 만 19세 이상"
          checked={over19}
          onChange={handleChangeState}
        />
        <div tw="flex items-center justify-between">
          <Label
            size="large"
            control={<Checkbox name="service" iconType="blueSquare" />}
            label="(필수) 서비스 이용약관 동의"
            checked={service}
            onChange={handleChangeState}
          />
          <ButtonV2 onClick={onOpenServiceTerms} variant="ghost" size="none" tw="text-gray-700">
            <ArrowRight />
          </ButtonV2>
        </div>
        <div tw="flex items-center justify-between">
          <Label
            size="large"
            control={<Checkbox name="privacy" iconType="blueSquare" />}
            label="(필수) 개인정보 수집 및 이용 동의"
            checked={privacy}
            onChange={handleChangeState}
          />
          <ButtonV2 onClick={onOpenPrivacyPolicy} variant="ghost" size="none" tw="text-gray-700">
            <ArrowRight />
          </ButtonV2>
        </div>
        <div tw="flex items-center justify-between">
          <Label
            size="large"
            control={<Checkbox name="location" iconType="blueSquare" />}
            label="(필수) 위치기반 서비스 이용 동의"
            checked={location}
            onChange={handleChangeState}
          />
          <ButtonV2 onClick={onOpenLocationTerms} variant="ghost" size="none" tw="text-gray-700">
            <ArrowRight />
          </ButtonV2>
        </div>
        <Label
          size="large"
          control={<Checkbox name="notification" iconType="blueSquare" />}
          label="(필수) 거래 알림 수신 동의"
          checked={notification}
          onChange={handleChangeState}
        />
        <Label
          size="large"
          control={<Checkbox name="marketing" iconType="blueSquare" />}
          label="(선택) 이벤트/마케팅 정보 수신 동의"
          checked={marketing}
          onChange={handleChangeState}
        />
      </div>
    </div>
  );
}
