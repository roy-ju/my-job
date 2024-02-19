import { useCallback, ChangeEventHandler } from 'react';

import tw, { styled } from 'twin.macro';

import { Label, Checkbox, ButtonV2 } from '@/components/atoms';

import useControlled from '@/hooks/useControlled';

import ArrowRight from '@/assets/icons/arrow_right_20.svg';

import TermsState from './types/Terms';
import FIELD_ID from './constants/fieldId';

type TermsProps = {
  state?: TermsState;
  onChangeState?: (newState: TermsState) => void;
  onOpenServiceTerms?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenLocationTerms?: () => void;
};

const Container = styled.div`
  ${tw`flex flex-col`}
`;

const StyledLabel = styled.span<{ checked: boolean }>`
  ${tw`text-gray-700`}
  ${({ checked }) => checked && tw`text-gray-900`}
`;

const ArrowLabelContainer = styled.div`
  ${tw`flex items-center justify-between`}
`;

const TopLabelWrraper = styled.div`
  ${tw`pb-4 border-b border-b-gray-200`}
`;

const SubLabelWrraper = styled.div`
  ${tw`flex flex-col gap-4 pt-4`}
`;

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
    <Container id={FIELD_ID.TERMS}>
      <TopLabelWrraper>
        <Label
          size="xlarge"
          control={<Checkbox name="all" iconType="blueSquare" />}
          label="모두 동의합니다."
          checked={all}
          onChange={handleChangeState}
        />
      </TopLabelWrraper>
      <SubLabelWrraper>
        <Label
          size="large"
          control={<Checkbox name="over19" iconType="noOutline" />}
          label={<StyledLabel checked={over19}>(필수) 만 19세 이상</StyledLabel>}
          checked={over19}
          onChange={handleChangeState}
        />
        <ArrowLabelContainer>
          <Label
            size="large"
            control={<Checkbox name="service" iconType="noOutline" />}
            label={<StyledLabel checked={service}>(필수) 서비스 이용약관 동의</StyledLabel>}
            checked={service}
            onChange={handleChangeState}
          />
          <ButtonV2 onClick={onOpenServiceTerms} variant="ghost" size="none" tw="text-gray-700">
            <ArrowRight />
          </ButtonV2>
        </ArrowLabelContainer>
        <ArrowLabelContainer>
          <Label
            size="large"
            control={<Checkbox name="privacy" iconType="noOutline" />}
            label={<StyledLabel checked={privacy}>(필수) 개인정보 수집 및 이용 동의</StyledLabel>}
            checked={privacy}
            onChange={handleChangeState}
          />
          <ButtonV2 onClick={onOpenPrivacyPolicy} variant="ghost" size="none" tw="text-gray-700">
            <ArrowRight />
          </ButtonV2>
        </ArrowLabelContainer>
        <ArrowLabelContainer>
          <Label
            size="large"
            control={<Checkbox name="location" iconType="noOutline" />}
            label={<StyledLabel checked={location}>(필수) 위치기반 서비스 이용 동의</StyledLabel>}
            checked={location}
            onChange={handleChangeState}
          />
          <ButtonV2 onClick={onOpenLocationTerms} variant="ghost" size="none" tw="text-gray-700">
            <ArrowRight />
          </ButtonV2>
        </ArrowLabelContainer>
        <Label
          size="large"
          control={<Checkbox name="notification" iconType="noOutline" />}
          label={<StyledLabel checked={notification}>(필수) 거래 알림 수신 동의</StyledLabel>}
          checked={notification}
          onChange={handleChangeState}
        />
        <Label
          size="large"
          control={<Checkbox name="marketing" iconType="noOutline" />}
          label={<StyledLabel checked={marketing}>(선택) 이벤트/마케팅 정보 수신 동의</StyledLabel>}
          checked={marketing}
          onChange={handleChangeState}
        />
      </SubLabelWrraper>
    </Container>
  );
}
