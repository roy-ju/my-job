import { RegisterSuccessType } from './types';

type MessageProps = { type: RegisterSuccessType };

export default function Message({ type }: MessageProps) {
  if (!type) return null;

  return (
    <div tw="px-5">
      <p tw="text-display_01 mt-20 mb-2">회원가입이 완료되었어요!</p>
      {type === 'onlyLogin' ? (
        <p tw="text-body_03 text-gray-700">
          지금 바로 네고시오에서
          <br />
          다양한 부동산 서비스를 이용해보세요!
        </p>
      ) : (
        <p tw="text-body_03 text-gray-700">
          방금 전에 보신 서비스는 본인인증까지 완료되어야
          <br />
          이용하실 수 있어요. 본인 인증하시겠어요?
        </p>
      )}
    </div>
  );
}
