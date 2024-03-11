import { ChangeEventHandler } from 'react';

import tw, { styled } from 'twin.macro';

import { Moment, Switch } from '@/components/atoms';

interface CommonProps {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Container = styled.div`
  ${tw`px-5`}
  & > div {
    ${tw`py-4`}
    &:not(:first-of-type) {
      ${tw`border-t border-gray-100`}
    }
  }
`;

function Service({ checked, onChange }: CommonProps) {
  return (
    <div tw="flex items-center justify-between">
      <div tw="flex flex-col gap-2 ">
        <div tw="text-b2 leading-none font-bold">서비스 알림</div>
        <div tw="text-info leading-none text-gray-700">거래, 회원 정보, 커뮤니티 관련 알림을 푸시로 받습니다.</div>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

function Chat({ checked, onChange }: CommonProps) {
  return (
    <div tw="flex items-center justify-between">
      <div tw="flex flex-col gap-2 ">
        <div tw="text-b2 leading-none font-bold">채팅 알림</div>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

interface MarketingProps {
  agreementDate?: string | null;
  disagreementDate?: string | null;
}

function Marketing({ checked, onChange, agreementDate, disagreementDate }: CommonProps & MarketingProps) {
  return (
    <div tw="flex items-center justify-between">
      <div tw="flex flex-col gap-2 ">
        <div tw="text-b2 leading-none font-bold">이벤트 및 마케팅 정보 수신</div>
        <div tw="text-info leading-none text-gray-700">
          {agreementDate && (
            <div>
              마케팅 정보 수신 동의 <Moment format="YYYY.MM.DD a h:mm">{agreementDate}</Moment>
            </div>
          )}
          {disagreementDate && (
            <div>
              마케팅 정보 수신 비동의 <Moment format="YYYY.MM.DD a h:mm">{disagreementDate}</Moment>
            </div>
          )}
        </div>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

export default Object.assign(Container, {
  Service,
  Chat,
  Marketing,
});
